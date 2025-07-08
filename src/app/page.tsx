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
  SelectChangeEvent,
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
  Public as PublicIcon,
  LocationOn as LocationOnIcon,
  Group as GroupIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';
import { Course, CourseFilters } from '@/types/course';

const CATEGORIES = ['All', 'Mathematics', 'Language Arts', 'Science', 'Social Studies', 'Arts'];
const LEVELS = ['All', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
const GEOGRAPHIES = [
  'All',
  'Bridge Kenya',
  'Group Nigeria', 
  'Group A (EdoBest and Rwanda)',
  'Global group (target tenants will be all tenants of NewGlobe)'
];
const GUIDE_STATUS_OPTIONS = [
  'All',
  'No Guides Required',
  'Missing Guides',
  'Not Approved',
  'Approved'
];

export default function CoursesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CourseFilters>({
    search: '',
    category: 'All',
    level: 'All',
    geography: 'All',
    guideStatus: 'All',
  });
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  // Helper function to determine guide status for filtering
  const getGuideStatusForFilter = (course: Course): string => {
    if (course.teacherGuides.status === 'guideless') {
      return 'No Guides Required';
    }
    
    // Check if guides are required but none uploaded yet OR if there are expected guides missing
    const hasNoGuides = !course.teacherGuides.guides || course.teacherGuides.guides.length === 0;
    const hasMissingGuides = course.teacherGuides.expectedGuides && course.teacherGuides.expectedGuides.length > 0;
    
    if (hasNoGuides || hasMissingGuides) {
      return 'Missing Guides';
    }
    
    const hasAllApproved = course.teacherGuides.guides.every(guide => guide.status === 'approved');
    return hasAllApproved ? 'Approved' : 'Not Approved';
  };

  // Helper function to get geography styling with UX best practices
  const getGeographyStyle = (geography: Course['geography']) => {
    switch (geography) {
      case 'Bridge Kenya':
        return {
          icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
          color: 'success' as const,
          label: 'Bridge Kenya',
          backgroundColor: '#e8f5e8',
          borderColor: '#4caf50',
          textColor: '#2e7d32'
        };
      case 'Group Nigeria':
        return {
          icon: <GroupIcon sx={{ fontSize: 16 }} />,
          color: 'warning' as const,
          label: 'Group Nigeria',
          backgroundColor: '#fff3e0',
          borderColor: '#ff9800',
          textColor: '#e65100'
        };
      case 'Group A (EdoBest and Rwanda)':
        return {
          icon: <SchoolIcon sx={{ fontSize: 16 }} />,
          color: 'secondary' as const,
          label: 'Group A (EdoBest & Rwanda)',
          backgroundColor: '#f3e5f5',
          borderColor: '#9c27b0',
          textColor: '#6a1b9a'
        };
      case 'Global group (target tenants will be all tenants of NewGlobe)':
        return {
          icon: <PublicIcon sx={{ fontSize: 16 }} />,
          color: 'primary' as const,
          label: 'Global',
          backgroundColor: '#e3f2fd',
          borderColor: '#2196f3',
          textColor: '#1565c0'
        };
      default:
        return {
          icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
          color: 'default' as const,
          label: geography,
          backgroundColor: '#f5f5f5',
          borderColor: '#9e9e9e',
          textColor: '#424242'
        };
    }
  };

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
      
      const matchesGeography = !filters.geography || filters.geography === 'All' || 
        course.geography === filters.geography;
      
      const matchesGuideStatus = !filters.guideStatus || filters.guideStatus === 'All' || 
        getGuideStatusForFilter(course) === filters.guideStatus;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesGeography && matchesGuideStatus;
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

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
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

  const getMissingGuidesCount = (course: Course): number => {
    if (course.teacherGuides.status === 'guideless' || !course.teacherGuides.expectedGuides) {
      return 0;
    }
    return course.teacherGuides.expectedGuides.length;
  };

  const getGuideStatistics = (course: Course) => {
    const totalGuides = getTotalGuidesCount(course);
    const approvedCount = getApprovedGuidesCount(course);
    const pendingCount = getPendingGuidesCount(course);
    const missingCount = getMissingGuidesCount(course);
    
    return {
      total: totalGuides,
      approved: approvedCount,
      pending: pendingCount,
      missing: missingCount
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
    
    // Check if guides are required but none uploaded yet
    if (course.teacherGuides.required && (!course.teacherGuides.guides || course.teacherGuides.guides.length === 0)) {
      const missingCount = getMissingGuidesCount(course);
      return (
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip
            icon={<WarningIcon sx={{ fontSize: 18 }} />}
            label="Guides Need Upload"
            size="medium"
            variant="filled"
            sx={{
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              fontSize: '0.875rem',
              height: '32px',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'error.contrastText'
              },
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  opacity: 1,
                },
                '50%': {
                  opacity: 0.8,
                },
                '100%': {
                  opacity: 1,
                },
              }
            }}
          />
          {missingCount > 0 && (
            <Chip
              icon={<CancelIcon sx={{ fontSize: 16 }} />}
              label={`${missingCount} Missing`}
              size="medium"
              variant="outlined"
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                fontSize: '0.875rem',
                height: '32px',
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: 'error.main'
                }
              }}
            />
          )}
        </Box>
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
        {stats.missing > 0 && (
          <Chip
            icon={<CancelIcon sx={{ fontSize: 16 }} />}
            label={`${stats.missing} Missing`}
            size="medium"
            variant="outlined"
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              fontSize: '0.875rem',
              height: '32px',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'error.main'
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
    
    if (stats.pending > 0 || stats.missing > 0) {
      const pendingText = stats.pending > 0 ? `${stats.pending} pending` : '';
      const missingText = stats.missing > 0 ? `${stats.missing} missing` : '';
      const statusText = [pendingText, missingText].filter(Boolean).join(', ');
      
      return {
        icon: <WarningIcon sx={{ fontSize: 16 }} />,
        label: `${stats.total} guides (${stats.approved} approved, ${statusText})`,
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
      {/* Course Library */}
      <Box>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Course Library
            </Typography>
          </Box>
          
          {/* Search and Filter Section */}
          <Paper elevation={0} sx={{ p: 2.5, backgroundColor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={2}>
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
              <Grid item xs={12} md={2}>
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
                <FormControl fullWidth size="small">
                  <InputLabel id="geography-filter-label">Geography</InputLabel>
                  <Select
                    value={filters.geography || 'All'}
                    onChange={(e) => handleFilterChange('geography', e.target.value)}
                    label="Geography"
                    labelId="geography-filter-label"
                    aria-label="Filter courses by geography"
                  >
                    {GEOGRAPHIES.map((geography) => (
                      <MenuItem key={geography} value={geography}>
                        {geography}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="guide-status-filter-label">Guide Status</InputLabel>
                  <Select
                    value={filters.guideStatus || 'All'}
                    onChange={(e) => handleFilterChange('guideStatus', e.target.value)}
                    label="Guide Status"
                    labelId="guide-status-filter-label"
                    aria-label="Filter courses by guide status"
                  >
                    {GUIDE_STATUS_OPTIONS.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
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
        </Box>
        
        {/* Course List */}
        <List sx={{ mt: 3 }}>
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
                      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        {(() => {
                          const geoStyle = getGeographyStyle(course.geography);
                          return (
                            <Chip 
                              icon={geoStyle.icon}
                              label={geoStyle.label}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: geoStyle.backgroundColor,
                                borderColor: geoStyle.borderColor,
                                color: geoStyle.textColor,
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                  color: geoStyle.textColor
                                },
                                '&:hover': {
                                  backgroundColor: geoStyle.backgroundColor,
                                  opacity: 0.8
                                }
                              }}
                            />
                          );
                        })()}
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
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Stack spacing={2} alignItems="center">
              {/* Pagination Info */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 2 }}>
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
              
              {/* Pagination Navigation */}
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
              
              {/* Page Summary */}
              <Typography variant="body2" color="text.secondary">
                Page {page} of {totalPages}
              </Typography>
            </Stack>
          </Box>
        )}
      
        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center', mt: 4, backgroundColor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <MenuBookIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No courses found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
} 