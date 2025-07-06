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
  Pagination,
  Stack,
  TablePagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  MenuBook as MenuBookIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,

  Schedule as ScheduleIcon,
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
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = !filters.search || 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.level.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || filters.category === 'All' || 
        course.category === filters.category;
      
      const matchesLevel = !filters.level || filters.level === 'All' || 
        course.level === filters.level;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [filters]);

  // Pagination logic
  const paginatedCourses = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when rows per page changes
  };

  const getPendingGuidesCount = (course: Course): number => {
    if (course.teacherGuides.status === 'guideless' || !course.teacherGuides.guides) {
      return 0;
    }
    return course.teacherGuides.guides.filter(guide => guide.status === 'pending' || guide.status === 'resubmitted').length;
  };

  const getApprovedGuidesCount = (course: Course): number => {
    if (course.teacherGuides.status === 'guideless' || !course.teacherGuides.guides) {
      return 0;
    }
    return course.teacherGuides.guides.filter(guide => guide.status === 'approved').length;
  };

  const getTotalGuidesCount = (course: Course): number => {
    if (course.teacherGuides.status === 'guideless' || !course.teacherGuides.guides) {
      return 0;
    }
    return course.teacherGuides.guides.length;
  };

  const getGuideStatistics = (course: Course) => {
    const totalGuides = getTotalGuidesCount(course);
    const approvedCount = getApprovedGuidesCount(course);
    const pendingCount = getPendingGuidesCount(course);
    
    return {
      total: totalGuides,
      approved: approvedCount,
      pending: pendingCount
    };
  };

  const renderGuideStatistics = (course: Course) => {
    const stats = getGuideStatistics(course);
    
    if (course.teacherGuides.status === 'guideless') {
      return (
        <Chip
          icon={<CancelIcon sx={{ fontSize: 18 }} />}
          label="No Guides Required"
          size="medium"
          variant="outlined"
          sx={{
            backgroundColor: 'grey.50',
            color: 'text.secondary',
            borderColor: 'grey.300',
            fontSize: '0.875rem',
            height: '32px',
            fontWeight: 500,
            '& .MuiChip-icon': {
              color: 'text.secondary'
            }
          }}
        />
      );
    }
    
    return (
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip
          icon={<MenuBookIcon sx={{ fontSize: 16 }} />}
          label={`${stats.total} Total`}
          size="medium"
          variant="filled"
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '0.875rem',
            height: '32px',
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: 'primary.contrastText'
            }
          }}
        />
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
          label={`${stats.approved} Approved`}
          size="medium"
          variant="filled"
          sx={{
            backgroundColor: 'success.main',
            color: 'success.contrastText',
            fontSize: '0.875rem',
            height: '32px',
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: 'success.contrastText'
            }
          }}
        />
        {stats.pending > 0 && (
          <Chip
            icon={<WarningIcon sx={{ fontSize: 16 }} />}
            label={`${stats.pending} Pending`}
            size="medium"
            variant="filled"
            sx={{
              backgroundColor: 'warning.main',
              color: 'warning.contrastText',
              fontSize: '0.875rem',
              height: '32px',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'warning.contrastText'
              }
            }}
          />
        )}
      </Box>
    );
  };

  const getTeacherGuideStatusInfo = (course: Course) => {
    const stats = getGuideStatistics(course);
    
    if (course.teacherGuides.status === 'guideless') {
      return {
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
        label: 'No Guides Required',
        color: 'default' as const,
        severity: 'info' as const,
        customStyles: {
          backgroundColor: 'grey.100',
          color: 'text.secondary',
          border: (theme: any) => `1px solid ${theme.palette.grey[300]}`,
          fontWeight: 'fontWeightMedium',
          '& .MuiChip-icon': {
            color: 'text.secondary'
          }
        }
      };
    }
    
    if (stats.pending > 0) {
      return {
        icon: <WarningIcon sx={{ fontSize: 16 }} />,
        label: `${stats.total} guides (${stats.approved} approved, ${stats.pending} pending)`,
        color: 'warning' as const,
        severity: 'warning' as const,
        customStyles: {
          backgroundColor: 'warning.light',
          color: 'warning.dark',
          border: (theme: any) => `1px solid ${theme.palette.warning.main}`,
          fontWeight: 'fontWeightSemiBold',
          '& .MuiChip-icon': {
            color: 'warning.main'
          }
        }
      };
    }
    
    return {
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      label: `${stats.total} guides (all approved)`,
      color: 'success' as const,
      severity: 'success' as const,
      customStyles: {
        backgroundColor: 'success.light',
        color: 'success.dark',
        border: (theme: any) => `1px solid ${theme.palette.success.main}`,
        fontWeight: 'fontWeightSemiBold',
        '& .MuiChip-icon': {
          color: 'success.main'
        }
      }
    };
  };

  return (
    <Box>
      {/* Dashboard Header */}
      <Box mb={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Teacher Guide Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Monitor guide status, approve submissions, and track course completion across your library.
        </Typography>
      </Box>



      {/* Search and Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
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
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} aria-hidden="true" />,
              }}
              variant="outlined"
              size="small"
              aria-label="Search courses by title, subject, or level"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="subject-filter-label">Subject</InputLabel>
              <Select
                value={filters.category || 'All'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                label="Subject"
                labelId="subject-filter-label"
                aria-label="Filter courses by subject"
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
              <InputLabel id="level-filter-label">Level</InputLabel>
              <Select
                value={filters.level || 'All'}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                label="Level"
                labelId="level-filter-label"
                aria-label="Filter courses by grade level"
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
              <FilterIcon sx={{ mr: 1, color: 'action.active' }} aria-hidden="true" />
              <Typography variant="body2" color="text.secondary" aria-live="polite">
                {filteredCourses.length} found
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Course List */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        {/* Pagination Info */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {paginatedCourses.length > 0 ? ((page - 1) * rowsPerPage + 1) : 0} to {Math.min(page * rowsPerPage, filteredCourses.length)} of {filteredCourses.length} courses
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Per page</InputLabel>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Per page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <List sx={{ p: 2 }}>
          {paginatedCourses.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No courses match your current filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or filters.
              </Typography>
            </Box>
          ) : (
            paginatedCourses.map((course, index) => (
            <React.Fragment key={course.id}>
              <ListItem
                sx={{
                  p: 0,
                  mb: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Box sx={{ width: '100%', p: 3 }}>
                  {/* Course Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-between',
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2
                  }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<VisibilityIcon />}
                      size="medium"
                      onClick={() => router.push(`/course/${course.id}`)}
                      aria-label={`View details for ${course.title} course`}
                      sx={{ 
                        minWidth: 140,
                        flexShrink: 0,
                        alignSelf: { xs: 'stretch', sm: 'flex-start' }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>

                  {/* Guide Statistics */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="overline" 
                      color="text.secondary" 
                      sx={{ mb: 1.5, display: 'block' }}
                    >
                      Guide Status
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                      {renderGuideStatistics(course)}
                    </Box>
                  </Box>

                  {/* Course Meta Information */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Duration */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          fontWeight: 500
                        }}
                      >
                        <ScheduleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        Duration: <strong>{course.duration}</strong>
                      </Typography>
                    </Box>
                    
                    {/* Course Tags */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          fontWeight: 600,
                          minWidth: 'fit-content',
                          flexShrink: 0
                        }}
                      >
                        Course Tags:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={course.location} size="small" color="primary" variant="outlined" />
                        <Chip label={course.category} size="small" color="secondary" variant="outlined" />
                        <Chip label={course.level} size="small" color="info" variant="outlined" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
            ))
          )}
        </List>

        {/* Pagination Controls */}
        {filteredCourses.length > 0 && (
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack spacing={2} alignItems="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '0.875rem',
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Page {page} of {totalPages} • {filteredCourses.length} total courses
              </Typography>
            </Stack>
          </Box>
        )}
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