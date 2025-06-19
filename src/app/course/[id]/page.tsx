'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';
import { Course } from '@/types/course';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  // Find the course by ID
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Course Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            The course you're looking for doesn't exist or has been removed.
          </Typography>
          <Button variant="contained" onClick={() => router.push('/')}>
            Back to Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
    }
    return `${mins}m`;
  };

  const getTeacherGuideStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'guideless': return 'info';
      default: return 'default';
    }
  };

  const getTeacherGuideStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'guideless': return <CancelIcon />;
      default: return <AssignmentIcon />;
    }
  };

  return (
    <Box>
      {/* Header with Back Button */}
      <Box mb={3} display="flex" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Course Details
        </Typography>
      </Box>

      {/* Course Header Card */}
      <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>
          
          {/* Quick Info Chips */}
          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
            <Chip 
              icon={<LocationOnIcon />} 
              label={course.location} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              icon={<CategoryIcon />} 
              label={course.category} 
              color="secondary" 
              variant="outlined" 
            />
            <Chip 
              icon={<SchoolIcon />} 
              label={course.level} 
              color="info" 
              variant="outlined" 
            />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Duration Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Duration
                </Typography>
              </Box>
              
              <Typography variant="body1" gutterBottom>
                <strong>Course Duration:</strong> {course.duration}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Lesson Duration Range:</strong>
              </Typography>
              <Box ml={2}>
                <Typography variant="body2" color="text.secondary">
                  Minimum: {formatDuration(course.durationRange?.minimum || 30)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maximum: {formatDuration(course.durationRange?.maximum || 60)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Textbook Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Textbook Requirements
                </Typography>
              </Box>
              
              {course.textbook?.required ? (
                <Box>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    This course requires a textbook
                  </Alert>
                  {course.textbook.title && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Title:</strong> {course.textbook.title}
                    </Typography>
                  )}
                  {course.textbook.itemCode && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Item Code:</strong> {course.textbook.itemCode}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Alert severity="success">
                  No textbook required for this course
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher Guides Status */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Teacher Guides
                </Typography>
              </Box>
              
              <Box mb={2}>
                <Chip
                  icon={getTeacherGuideStatusIcon(course.teacherGuides.status)}
                  label={course.teacherGuides.status.charAt(0).toUpperCase() + course.teacherGuides.status.slice(1)}
                  color={getTeacherGuideStatusColor(course.teacherGuides.status)}
                  size="large"
                />
              </Box>

              {course.teacherGuides.status === 'guideless' ? (
                <Alert severity="info">
                  This course is marked as guideless - no teacher guides are required.
                </Alert>
              ) : course.teacherGuides.guides && course.teacherGuides.guides.length > 0 ? (
                <Box>
                  <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                    Available Teacher Guides:
                  </Typography>
                  <List>
                    {course.teacherGuides.guides.map((guide) => (
                      <ListItem key={guide.id} divider>
                        <ListItemIcon>
                          {getTeacherGuideStatusIcon(guide.status)}
                        </ListItemIcon>
                        <ListItemText
                          primary={guide.title}
                          secondary={`Status: ${guide.status}`}
                        />
                        <Chip
                          label={guide.status}
                          color={getTeacherGuideStatusColor(guide.status)}
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Alert severity="warning">
                  No teacher guides have been uploaded for this course yet.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </Box>
  );
} 