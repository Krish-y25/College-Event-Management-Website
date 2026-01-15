import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Event, Room, StudySpot, Booking } from '../data/types';

// REMOVED: import { sampleRooms, sampleBookings, sampleStudySpots } from '../data/sampleData';

// Rooms
export const getRooms = async (): Promise<Room[]> => {
  try {
    const roomsSnapshot = await getDocs(collection(db, 'rooms'));
    const rooms = roomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];

    // Return empty array if no rooms found
    return rooms; 
  } catch (error) {
    console.error('Error getting rooms:', error);
    return []; 
  }
};

export const addRoom = async (room: Room) => {
  return await addDoc(collection(db, 'rooms'), room);
};

export const updateRoom = async (roomId: string, data: Partial<Room>) => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, data);
};

// Events
export const getEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Safely convert Timestamp to Date
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
      };
    });
    console.log('Fetched events:', events); // Debug log
    return events as Event[];
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

export const addEvent = async (eventData: Omit<Event, 'id'>) => {
  try {
    // Convert JavaScript Date to Firestore Timestamp
    const eventWithTimestamp = {
      ...eventData,
      date: Timestamp.fromDate(eventData.date)
    };

    const docRef = await addDoc(collection(db, 'events'), eventWithTimestamp);
    return docRef;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId: string, data: Partial<Event>) => {
  const eventRef = doc(db, 'events', eventId);
  
  // Ensure dates are converted to Timestamps before updating
  const updatePayload: any = { ...data };
  if (data.date instanceof Date) {
    updatePayload.date = Timestamp.fromDate(data.date);
  }

  await updateDoc(eventRef, updatePayload);
};

export const deleteEvent = async (eventId: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Study Spots
export const getStudySpots = async (): Promise<StudySpot[]> => {
  try {
    const spotsSnapshot = await getDocs(collection(db, 'studySpots'));
    const spots = spotsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isAvailable: true,
      isOccupied: false,
      currentOccupancy: 0
    })) as StudySpot[];

    // Return empty array if no spots found
    return spots;
  } catch (error) {
    console.error('Error getting study spots:', error);
    return [];
  }
};

export const updateStudySpot = async (spotId: string, data: Partial<StudySpot>) => {
  const spotRef = doc(db, 'studySpots', spotId);
  await updateDoc(spotRef, data);
};

// Bookings
export const getBookings = async (): Promise<Booking[]> => {
  try {
    const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
    const bookings = bookingsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Safely convert Timestamps to Dates
        startTime: data.startTime instanceof Timestamp ? data.startTime.toDate() : new Date(data.startTime),
        endTime: data.endTime instanceof Timestamp ? data.endTime.toDate() : new Date(data.endTime)
      };
    }) as Booking[];

    // Return empty array if no bookings found
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const addBooking = async (bookingData: Omit<Booking, 'id'>) => {
  try {
    const bookingWithTimestamps = {
      ...bookingData,
      startTime: Timestamp.fromDate(bookingData.startTime),
      endTime: Timestamp.fromDate(bookingData.endTime)
    };
    const docRef = await addDoc(collection(db, 'bookings'), bookingWithTimestamps);
    return docRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId: string, status: 'approved' | 'rejected') => {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, { status });
};

export const cleanupPastEvents = async (): Promise<number> => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today

    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('date', '<', Timestamp.fromDate(now)));
    const querySnapshot = await getDocs(q);

    let deletedCount = 0;
    const deletePromises: Promise<void>[] = [];

    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
      deletedCount++;
    });

    await Promise.all(deletePromises);
    console.log(`Cleaned up ${deletedCount} past events`);
    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up past events:', error);
    throw error;
  }
};