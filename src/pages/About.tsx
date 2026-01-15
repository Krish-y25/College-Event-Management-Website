import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { Code as CodeIcon, People as PeopleIcon } from '@mui/icons-material';

const About: React.FC = () => {
  const technologies = [
    'React',
    'TypeScript',
    'Material-UI',
    'React Router DOM',
    'Firebase',
    'FullCalendar',
    'Axios',
    'Date-fns',
    'Emotion',
  ];

  const creators = [
    { name: 'Kavan Patel', avatar: 'KP' },
    { name: 'Krish Yadav', avatar: 'KY' },
    { name: 'Inchara R Kambar', avatar: 'IRK' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          About CampusConnect
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          A modern event management platform for college communities
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Technologies Used
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This website was built using cutting-edge web technologies to provide a seamless and responsive user experience.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Meet the Creators
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This project was developed by a talented team of developers passionate about creating innovative solutions for education.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {creators.map((creator) => (
                  <Box key={creator.name} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {creator.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {creator.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Thank You for Using CampusConnect!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We hope this platform helps streamline event management and fosters better communication within your college community.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;