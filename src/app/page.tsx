'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  MenuBook as MenuBookIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';
import { Course, CourseFilters } from '@/types/course';

const CATEGORIES = ['All', 'Mathematics', 'Language Arts', 'Science', 'Social Studies', 'Arts'];
const LEVELS = ['All', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

export default function CoursesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CourseFilters>({
    search: '',
    category: 'All',
    level: 'All',
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = !filters.search || 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || filters.category === 'All' || 
        course.category === filters.category;
      
      const matchesLevel = !filters.level || filters.level === 'All' || 
        course.level === filters.level;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getPendingGuidesCount = (course: Course): number => {
    if (course.teacherGuides.status === 'guideless' || !course.teacherGuides.guides) {
      return 0;
    }
    return course.teacherGuides.guides.filter(guide => guide.status === 'pending').length;
  };

  const getTeacherGuideStatusInfo = (course: Course) => {
    const pendingCount = getPendingGuidesCount(course);
    const totalGuides = course.teacherGuides.guides?.length || 0;
    
    if (course.teacherGuides.status === 'guideless') {
      return {
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
        label: 'No Guides Required',
        color: 'default' as const,
        severity: 'info' as const,
        customStyles: {
          backgroundColor: '#f5f5f5',
          color: '#757575',
          border: '1px solid #e0e0e0',
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: '#757575'
          }
        }
      };
    }
    
    if (pendingCount > 0) {
      return {
        icon: <WarningIcon sx={{ fontSize: 16 }} />,
        label: `${pendingCount} Pending`,
        color: 'warning' as const,
        severity: 'warning' as const,
        customStyles: {
          backgroundColor: '#fff3e0',
          color: '#e65100',
          border: '1px solid #ffb74d',
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: '#ff9800'
          }
        }
      };
    }
    
    return {
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      label: `All ${totalGuides} Approved`,
      color: 'success' as const,
      severity: 'success' as const,
      customStyles: {
        backgroundColor: '#e8f5e8',
        color: '#2e7d32',
        border: '1px solid #81c784',
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: '#4caf50'
        }
      }
    };
  };

  return (
    <Box>
      {/* Dashboard Header */}
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here are your available courses.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Courses
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                {courses.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Available Now
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {filteredCourses.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Subjects
              </Typography>
              <Typography variant="h4" component="div" color="info.main">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Course Library
          </Typography>
        </Box>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select
                value={filters.category || 'All'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                label="Subject"
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Level</InputLabel>
              <Select
                value={filters.level || 'All'}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                label="Level"
              >
                {LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <FilterIcon sx={{ mr: 1, color: 'action.active' }} />
              <Typography variant="body2" color="text.secondary">
                {filteredCourses.length} found
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Course List */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>
          {filteredCourses.map((course, index) => (
            <React.Fragment key={course.id}>
              <ListItem
                sx={{
                  py: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                        {course.title}
                      </Typography>
                      {(() => {
                        const statusInfo = getTeacherGuideStatusInfo(course);
                        return (
                          <Chip
                            icon={statusInfo.icon}
                            label={statusInfo.label}
                            size="small"
                            variant="filled"
                            sx={{
                              ...statusInfo.customStyles,
                              borderRadius: '16px',
                              fontSize: '0.75rem',
                              height: '28px',
                              '& .MuiChip-label': {
                                paddingX: 1.5,
                                fontWeight: statusInfo.customStyles.fontWeight
                              }
                            }}
                          />
                        );
                      })()}
                    </Box>
                  }
                  secondary={
                    <Box component="div">
                      <Box component="div" sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 1 }}>
                        {course.description.length > 120 
                          ? `${course.description.substring(0, 120)}...` 
                          : course.description}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={course.location} size="small" color="primary" variant="outlined" />
                        <Chip label={course.category} size="small" color="secondary" variant="outlined" />
                        <Chip label={course.level} size="small" color="info" variant="outlined" />
                      </Box>
                    </Box>
                  }
                />
                
                <ListItemSecondaryAction>
                  <Button 
                    variant="contained" 
                    startIcon={<VisibilityIcon />}
                    size="small"
                    onClick={() => router.push(`/course/${course.id}`)}
                  >
                    Course Details
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredCourses.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      
      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <MenuBookIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}
    </Box>
  );
} 