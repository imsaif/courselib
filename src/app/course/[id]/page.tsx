'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  LocationOn as LocationOnIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Category as CategoryIcon,
  OpenInNew as OpenInNewIcon,
  CloudUpload as CloudUploadIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';
import { Course } from '@/types/course';
import FirstTimeGuideUpload from '@/components/FirstTimeGuideUpload';

// Types for form data
interface GuideFormData {
  title: string;
  description: string;
  author: string;
  version: string;
  uploadedFile: File | null;
  fileSize: string;
  pages: number;
  additionalNotes: string;
  isRevision: boolean;
  relatedGuideId?: string;
  revisionType: 'major_update' | 'minor_fix' | 'content_addition' | 'new_guide';
  changesSummary: string;
  previousGuideTitle?: string;
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  // Upload dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  // First-time upload state
  const [firstTimeUploadOpen, setFirstTimeUploadOpen] = useState(false);
  
  // Guide filtering state
  const [guideFilter, setGuideFilter] = useState<'all' | 'pending' | 'approved' | 'needs_revision'>('all');
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState<GuideFormData>({
    title: '',
    description: '',
    author: '',
    version: '1.0',
    uploadedFile: null,
    fileSize: '',
    pages: 0,
    additionalNotes: '',
    isRevision: false,
    relatedGuideId: undefined,
    revisionType: 'new_guide',
    changesSummary: '',
    previousGuideTitle: '',
  });

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
      case 'revision_requested': return 'error';
      case 'resubmitted': return 'info';
      case 'guideless': return 'info';
      default: return 'default';
    }
  };

  const getTeacherGuideStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'revision_requested': return <EditIcon />;
      case 'resubmitted': return <ScheduleIcon />;
      case 'guideless': return <CancelIcon />;
      default: return <AssignmentIcon />;
    }
  };

  // Helper function to open revision dialog
  const openRevisionDialog = (guide: { id: string; title: string; status: string }) => {
    setFormData(prev => ({
      ...prev,
      title: `${guide.title} - Revised`,
      isRevision: true,
      relatedGuideId: guide.id,
      revisionType: 'major_update',
      previousGuideTitle: guide.title,
      version: '2.0', // Auto-increment version for revisions
    }));
    setUploadDialogOpen(true);
  };

  // Helper function to open new guide dialog
  const openNewGuideDialog = () => {
    setFormData({
      title: '',
      description: '',
      author: '',
      version: '1.0',
      uploadedFile: null,
      fileSize: '',
      pages: 0,
      additionalNotes: '',
      isRevision: false,
      relatedGuideId: undefined,
      revisionType: 'new_guide',
      changesSummary: '',
      previousGuideTitle: '',
    });
    setUploadDialogOpen(true);
  };

  // Helper function to handle first-time upload completion
  const handleFirstTimeUploadComplete = () => {
    // In a real application, this would make an API call to update the course status
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      // Update course status from 'guideless' to 'pending'
      courses[courseIndex].teacherGuides.status = 'pending';
      // Initialize guides array if it doesn't exist
      if (!courses[courseIndex].teacherGuides.guides) {
        courses[courseIndex].teacherGuides.guides = [];
      }
      // Add the new guide (in real app, this would be handled by the API)
      courses[courseIndex].teacherGuides.guides!.push({
        id: `guide-${Date.now()}`,
        title: 'New Teacher Guide',
        status: 'pending'
      });
    }
    
    setFirstTimeUploadOpen(false);
    // Refresh the page to show the updated status
    window.location.reload();
  };

  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      uploadedFile: file,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      // Auto-estimate pages based on file size (rough estimate)
      pages: Math.ceil(file.size / (1024 * 20)) // Rough estimate: 20KB per page
    }));
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, this would make an API call to submit the guide
      console.log(`Submitting ${formData.isRevision ? 'revision' : 'new guide'} for course:`, courseId, 'with data:', formData);
      
      // Create new guide object
      const newGuide = {
        id: `guide-${Date.now()}`,
        title: formData.title,
        status: 'pending' as const
      };

      // Find course and add guide (in real app, this would be an API call)
      const courseIndex = courses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1 && courses[courseIndex].teacherGuides.guides) {
        if (formData.isRevision && formData.relatedGuideId) {
          // For revisions, you might want to update the original guide status or link them
          const originalGuideIndex = courses[courseIndex].teacherGuides.guides!.findIndex(g => g.id === formData.relatedGuideId);
          if (originalGuideIndex !== -1) {
            // In a real app, you'd handle revision relationships more sophisticatedly
            console.log(`Creating revision for guide: ${formData.previousGuideTitle}`);
            console.log(`Changes summary: ${formData.changesSummary}`);
            console.log(`Revision type: ${formData.revisionType}`);
          }
        }
        courses[courseIndex].teacherGuides.guides!.push(newGuide);
      }

      // Show success state
      setUploadSuccess(true);
      
      // Wait a moment to show success, then close
      setTimeout(() => {
        // Reset form and close dialog
        setFormData({
          title: '',
          description: '',
          author: '',
          version: '1.0',
          uploadedFile: null,
          fileSize: '',
          pages: 0,
          additionalNotes: '',
          isRevision: false,
          relatedGuideId: undefined,
          revisionType: 'new_guide',
          changesSummary: '',
          previousGuideTitle: '',
        });
        setUploadDialogOpen(false);
        setActiveStep(0);
        setUploadSuccess(false);
        
        // Refresh the page to show new guide
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = () => {
    const baseValid = !!(formData.title && formData.description && formData.author && formData.uploadedFile);
    
    if (formData.isRevision) {
      return baseValid && !!(formData.changesSummary && formData.version);
    }
    
    return baseValid;
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
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
          
          {/* Course Info */}
          <Box display="flex" alignItems="center" gap={3} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <ScheduleIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="body1" color="text.secondary">
                <strong>Duration:</strong> {course.duration}
              </Typography>
            </Box>
          </Box>
          
          {/* Quick Info Chips */}
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Chip 
              icon={<LocationOnIcon />} 
              label={course.location} 
              color="primary" 
              variant="outlined" 
              size="medium"
            />
            <Chip 
              icon={<CategoryIcon />} 
              label={course.category} 
              color="secondary" 
              variant="outlined" 
              size="medium"
            />
            <Chip 
              label={course.level} 
              color="info" 
              variant="outlined" 
              size="medium"
            />
            {course.textbook?.required && (
              <Chip 
                icon={<MenuBookIcon />} 
                label="Textbook Required" 
                color="warning" 
                variant="outlined" 
                size="medium"
              />
            )}
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
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Teacher Guides
                  </Typography>
                </Box>
                {course.teacherGuides.status !== 'guideless' && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={openNewGuideDialog}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Upload New Guide
                  </Button>
                )}
              </Box>
              
              <Box mb={2}>
                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                  <Chip
                    icon={getTeacherGuideStatusIcon(course.teacherGuides.status)}
                    label={course.teacherGuides.status.charAt(0).toUpperCase() + course.teacherGuides.status.slice(1)}
                    color={getTeacherGuideStatusColor(course.teacherGuides.status)}
                    size="medium"
                  />
                  
                  {course.teacherGuides.guides && course.teacherGuides.guides.length > 0 && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {course.teacherGuides.guides.length} guide{course.teacherGuides.guides.length !== 1 ? 's' : ''} total
                      </Typography>
                      
                      {(() => {
                        const needsRevision = course.teacherGuides.guides.filter(g => g.status === 'revision_requested').length;
                        const pending = course.teacherGuides.guides.filter(g => g.status === 'pending' || g.status === 'resubmitted').length;
                        
                        return (
                          <>
                            {needsRevision > 0 && (
                              <Chip
                                label={`${needsRevision} need${needsRevision !== 1 ? '' : 's'} revision`}
                                color="error"
                                size="small"
                                variant="outlined"
                              />
                            )}
                            {pending > 0 && (
                              <Chip
                                label={`${pending} pending review`}
                                color="warning"
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </>
                        );
                      })()}
                    </>
                  )}
                </Box>
              </Box>

              {course.teacherGuides.status === 'guideless' ? (
                <Box>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      No Teacher Guides Yet
                    </Typography>
                    <Typography variant="body2">
                      This course doesn't have any teacher guides. Be the first to contribute by uploading a comprehensive guide to help educators deliver this course effectively.
                    </Typography>
                  </Alert>
                  
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setFirstTimeUploadOpen(true)}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                      }}
                    >
                      Upload First Teacher Guide
                    </Button>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Help establish the teaching foundation for this course
                    </Typography>
                  </Box>
                </Box>
              ) : course.teacherGuides.guides && course.teacherGuides.guides.length > 0 ? (
                <Box>
                  {/* Quick Actions for Guides Needing Revision */}
                  {(() => {
                    const guidesNeedingRevision = course.teacherGuides.guides.filter(g => g.status === 'revision_requested');
                    return guidesNeedingRevision.length > 0 ? (
                      <Alert 
                        severity="warning" 
                        sx={{ mb: 3 }}
                        action={
                          <Button 
                            color="inherit" 
                            size="small"
                            variant="outlined"
                            onClick={() => setGuideFilter('needs_revision')}
                          >
                            View All ({guidesNeedingRevision.length})
                          </Button>
                        }
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {guidesNeedingRevision.length} guide{guidesNeedingRevision.length !== 1 ? 's' : ''} need{guidesNeedingRevision.length === 1 ? 's' : ''} revision
                        </Typography>
                        <Typography variant="body2">
                          Review the feedback and upload revised versions to move forward with approval.
                        </Typography>
                      </Alert>
                    ) : null;
                  })()}

                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Available Teacher Guides:
                    </Typography>
                    
                    {course.teacherGuides.guides.length > 3 && (
                      <Box display="flex" gap={1}>
                        {[
                          { key: 'all', label: 'All' },
                          { key: 'needs_revision', label: 'Needs Revision' },
                          { key: 'pending', label: 'Pending' },
                          { key: 'approved', label: 'Approved' },
                        ].map((filter) => (
                          <Button
                            key={filter.key}
                            variant={guideFilter === filter.key ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => setGuideFilter(filter.key as any)}
                            sx={{ borderRadius: 2 }}
                          >
                            {filter.label}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    {course.teacherGuides.guides
                      .filter((guide) => {
                        if (guideFilter === 'all') return true;
                        if (guideFilter === 'needs_revision') return guide.status === 'revision_requested';
                        if (guideFilter === 'pending') return guide.status === 'pending' || guide.status === 'resubmitted';
                        if (guideFilter === 'approved') return guide.status === 'approved';
                        return true;
                      })
                      .map((guide) => (
                      <Grid item xs={12} key={guide.id}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            p: 2,
                            '&:hover': { boxShadow: 2 },
                            transition: 'box-shadow 0.2s',
                          }}
                        >
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={2} flex={1}>
                              <Box display="flex" alignItems="center">
                                {getTeacherGuideStatusIcon(guide.status)}
                              </Box>
                              <Box flex={1}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {guide.title}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                  <Chip
                                    label={guide.status.replace('_', ' ')}
                                    color={getTeacherGuideStatusColor(guide.status)}
                                    size="small"
                                  />
                                  {guide.status === 'revision_requested' && (
                                    <Typography variant="caption" color="error.main" sx={{ fontWeight: 500 }}>
                                      Needs your attention
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                            
                            <Box display="flex" alignItems="center" gap={1}>
                              {guide.status === 'revision_requested' && (
                                <Button
                                  variant="contained"
                                  color="warning"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => openRevisionDialog(guide)}
                                  sx={{
                                    borderRadius: 1.5,
                                    fontWeight: 600,
                                  }}
                                >
                                  Upload Revision
                                </Button>
                              )}
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<OpenInNewIcon />}
                                onClick={() => {
                                  router.push(`/course/${courseId}/guide/${guide.id}`);
                                }}
                                sx={{
                                  borderRadius: 1.5,
                                }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </Box>
                          
                          {guide.status === 'revision_requested' && (
                            <Alert 
                              severity="warning" 
                              sx={{ mt: 2, mb: 0 }}
                              action={
                                <Button 
                                  color="inherit" 
                                  size="small"
                                  onClick={() => openRevisionDialog(guide)}
                                >
                                  REVISE NOW
                                </Button>
                              }
                            >
                              This guide needs revision. Please upload an updated version.
                            </Alert>
                          )}
                        </Card>
                      </Grid>
                                          ))}
                  </Grid>
                  
                  {/* Show message when no guides match filter */}
                  {course.teacherGuides.guides
                    .filter((guide) => {
                      if (guideFilter === 'all') return true;
                      if (guideFilter === 'needs_revision') return guide.status === 'revision_requested';
                      if (guideFilter === 'pending') return guide.status === 'pending' || guide.status === 'resubmitted';
                      if (guideFilter === 'approved') return guide.status === 'approved';
                      return true;
                    }).length === 0 && guideFilter !== 'all' && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No guides found for the "{guideFilter.replace('_', ' ')}" filter.
                    </Alert>
                  )}
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

      {/* Upload Guide Dialog */}
      <Dialog 
        open={uploadDialogOpen} 
        onClose={() => setUploadDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center">
            {formData.isRevision ? (
              <EditIcon sx={{ mr: 1, color: 'warning.main' }} />
            ) : (
              <CloudUploadIcon sx={{ mr: 1, color: 'primary.main' }} />
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {formData.isRevision ? 'Upload Guide Revision' : 'Upload Teacher Guide'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                for {course?.title}
                {formData.isRevision && formData.previousGuideTitle && (
                  <> • Revising: {formData.previousGuideTitle}</>
                )}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Guide Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guide Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Addition Concepts Teacher Guide"
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Your full name"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this teacher guide covers and its objectives..."
                required
              />
            </Grid>

            {/* Revision-specific fields */}
            {formData.isRevision && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Revision Information
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Revision Type</InputLabel>
                    <Select
                      value={formData.revisionType}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        revisionType: e.target.value as 'major_update' | 'minor_fix' | 'content_addition' | 'new_guide'
                      }))}
                      label="Revision Type"
                    >
                      <MenuItem value="major_update">Major Update</MenuItem>
                      <MenuItem value="minor_fix">Minor Fix</MenuItem>
                      <MenuItem value="content_addition">Content Addition</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Version"
                    value={formData.version}
                    onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="e.g., 2.0, 1.1"
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Summary of Changes"
                    value={formData.changesSummary}
                    onChange={(e) => setFormData(prev => ({ ...prev, changesSummary: e.target.value }))}
                    placeholder="Describe what has been changed, added, or fixed in this revision..."
                    required
                    helperText="This helps reviewers understand what's different from the previous version"
                  />
                </Grid>
              </>
            )}

            {/* File Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                File Upload
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{
                  border: '2px dashed',
                  borderColor: formData.uploadedFile ? 'success.main' : 'grey.300',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: formData.uploadedFile ? 'success.50' : 'grey.50',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                    transform: 'translateY(-1px)',
                  },
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  }
                }}
              >
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  aria-describedby="file-upload-description"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <CloudUploadIcon 
                    sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }}
                    aria-hidden="true"
                  />
                  <Typography variant="h6" gutterBottom>
                    {formData.uploadedFile ? 'File Uploaded Successfully!' : 'Upload Teacher Guide Document'}
                  </Typography>
                  {formData.uploadedFile ? (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>File:</strong> {formData.uploadedFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Size:</strong> {formData.fileSize}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Drag and drop your file here, or click to browse
                    </Typography>
                  )}
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    id="file-upload-description"
                  >
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </Typography>
                  <br />
                  <Button 
                    variant="contained" 
                    component="span" 
                    sx={{ mt: 2 }}
                    aria-label={formData.uploadedFile ? 'Change uploaded file' : 'Choose file to upload'}
                  >
                    {formData.uploadedFile ? 'Change File' : 'Choose File'}
                  </Button>
                </label>
              </Box>
            </Grid>

            {/* Additional Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Additional Notes (Optional)"
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="Any additional information or special instructions..."
              />
            </Grid>

            {/* Upload Summary */}
            {formData.uploadedFile && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Upload Summary
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Guide Title</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formData.title || 'Not specified'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Author</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formData.author || 'Not specified'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">File</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formData.uploadedFile.name} ({formData.fileSize})
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Type</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formData.isRevision ? `Revision (${formData.revisionType.replace('_', ' ')})` : 'New Guide'}
                          </Typography>
                        </Grid>
                        {formData.isRevision && formData.changesSummary && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">Changes Summary</Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                              {formData.changesSummary}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          {uploadSuccess ? (
            <Box display="flex" alignItems="center" width="100%" justifyContent="center" gap={2}>
              <CheckCircleIcon color="success" />
              <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                {formData.isRevision ? 'Revision uploaded successfully!' : 'Guide uploaded successfully!'}
              </Typography>
            </Box>
          ) : (
            <>
              <Button 
                onClick={() => setUploadDialogOpen(false)}
                variant="outlined"
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                variant="contained"
                disabled={!isFormValid() || isUploading}
                startIcon={isUploading ? <></> : (formData.isRevision ? <EditIcon /> : <CloudUploadIcon />)}
                color={formData.isRevision ? "warning" : "primary"}
                sx={{ 
                  minWidth: 140,
                  position: 'relative',
                }}
              >
                {isUploading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: '2px solid',
                        borderColor: 'currentColor',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      }}
                    />
                    Uploading...
                  </Box>
                ) : (
                  formData.isRevision ? 'Submit Revision' : 'Submit Guide'
                )}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* First-Time Guide Upload Dialog */}
      <Dialog 
        open={firstTimeUploadOpen} 
        onClose={() => setFirstTimeUploadOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <FirstTimeGuideUpload
            courseId={courseId}
            courseTitle={course.title}
            onUploadComplete={handleFirstTimeUploadComplete}
            onCancel={() => setFirstTimeUploadOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
} 