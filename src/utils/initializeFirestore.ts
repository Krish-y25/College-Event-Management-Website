import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const initializeFirestore = async () => {
  try {
    const studySpotsRef = collection(db, 'studySpots');
    const snapshot = await getDocs(studySpotsRef);
    
    if (snapshot.empty) {
      console.log('No study spots found.');
      // Logic to add sample data has been removed since the data source is gone.
    } else {
      console.log('Study spots already initialized.');
    }

  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
};