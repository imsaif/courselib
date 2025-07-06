'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  Container,
} from '@mui/material';
import {
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export default function UploadGuideRedirectPage() {
  const router = useRouter();

  // Auto-redirect after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container maxWidth="md">
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="70vh"
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 3,
            maxWidth: 600,
            width: '100%'
          }}
        >
          <SchoolIcon 
            sx={{ 
              fontSize: 64, 
              color: 'primary.main', 
              mb: 2 
            }} 
          />
          
          <Typography variant="h4" gutterBottom>
            Upload Process Updated!
          </Typography>
          
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            We've streamlined the guide upload process
          </Typography>

          <Alert 
            severity="info" 
            icon={<InfoIcon />}
            sx={{ 
              mb: 4, 
              textAlign: 'left',
              '& .MuiAlert-message': {
                fontSize: '1rem'
              }
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              New Workflow:
            </Typography>
            <Typography variant="body2" component="div">
              1. Browse and select the course you want to upload a guide for<br/>
              2. Click the "Upload New Guide" button on the course detail page<br/>
              3. Fill out the streamlined upload form<br/>
              4. Submit your guide for review
            </Typography>
          </Alert>

          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
            This new approach makes it easier to upload guides in the context of specific courses, 
            ensuring better organization and faster review processes.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} alignItems="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/')}
              sx={{
                minWidth: 200,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Browse Courses
            </Button>
            
            <Typography variant="caption" color="text.secondary">
              You'll be redirected automatically in a few seconds...
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 