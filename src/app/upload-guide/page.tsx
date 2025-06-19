'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Divider,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Grid,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  FileUpload as FileUploadIcon,
  Preview as PreviewIcon,
  Send as SendIcon,
  Description as DescriptionIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';

// Types for form data
interface LessonActivity {
  name: string;
  instructions: string[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  materials: string[];
  content: string[];
  activities: LessonActivity[];
}

interface GuideFormData {
  // Basic Information
  title: string;
  description: string;
  courseId: string;
  author: string;
  version: string;
  
  // Content Structure
  sections: string[];
  lessons: Lesson[];
  
  // File Upload
  uploadedFile: File | null;
  fileSize: string;
  pages: number;
  
  // Metadata
  tags: string[];
  learningObjectives: string[];
  prerequisites: string[];
  additionalNotes: string;
}

const steps = [
  'Basic Information',
  'Course Selection',
  'Content Structure', 
  'Lessons & Activities',
  'File Upload',
  'Review & Submit'
];

export default function UploadGuidePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<GuideFormData>({
    title: '',
    description: '',
    courseId: '',
    author: '',
    version: '1.0',
    sections: [],
    lessons: [],
    uploadedFile: null,
    fileSize: '',
    pages: 0,
    tags: [],
    learningObjectives: [],
    prerequisites: [],
    additionalNotes: '',
  });

  // Dialog states
  const [sectionDialog, setSectionDialog] = useState(false);
  const [lessonDialog, setLessonDialog] = useState(false);
  const [submitDialog, setSubmitDialog] = useState(false);
  
  // Form input states
  const [newSection, setNewSection] = useState('');
  const [newLesson, setNewLesson] = useState<Lesson>({
    id: '',
    title: '',
    duration: '',
    materials: [],
    content: [],
    activities: []
  });
  const [newMaterial, setNewMaterial] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newActivity, setNewActivity] = useState<LessonActivity>({
    name: '',
    instructions: []
  });
  const [newInstruction, setNewInstruction] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newTag, setNewTag] = useState('');

  // Navigation functions
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      title: '',
      description: '',
      courseId: '',
      author: '',
      version: '1.0',
      sections: [],
      lessons: [],
      uploadedFile: null,
      fileSize: '',
      pages: 0,
      tags: [],
      learningObjectives: [],
      prerequisites: [],
      additionalNotes: '',
    });
  };

  // Form validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Information
        return !!(formData.title && formData.description && formData.author);
      case 1: // Course Selection
        return !!formData.courseId;
      case 2: // Content Structure
        return formData.sections.length > 0;
      case 3: // Lessons & Activities
        return formData.lessons.length > 0;
      case 4: // File Upload
        return !!formData.uploadedFile;
      case 5: // Review & Submit
        return true;
      default:
        return false;
    }
  };

  // Helper functions for adding items
  const addSection = () => {
    if (newSection.trim()) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection.trim()]
      }));
      setNewSection('');
      setSectionDialog(false);
    }
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const addLesson = () => {
    if (newLesson.title && newLesson.duration) {
      const lessonWithId = {
        ...newLesson,
        id: `lesson-${Date.now()}`
      };
      setFormData(prev => ({
        ...prev,
        lessons: [...prev.lessons, lessonWithId]
      }));
      setNewLesson({
        id: '',
        title: '',
        duration: '',
        materials: [],
        content: [],
        activities: []
      });
      setLessonDialog(false);
    }
  };

  const removeLesson = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index)
    }));
  };

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
    }
  };

  // Submit handler
  const handleSubmit = () => {
    // In a real application, this would make an API call to submit the guide
    console.log('Submitting guide:', formData);
    
    // Create new guide object
    const newGuide = {
      id: `guide-${Date.now()}`,
      title: formData.title,
      status: 'pending' as const
    };

    // Find course and add guide (in real app, this would be an API call)
    const courseIndex = courses.findIndex(c => c.id === formData.courseId);
    if (courseIndex !== -1 && courses[courseIndex].teacherGuides.guides) {
      courses[courseIndex].teacherGuides.guides!.push(newGuide);
    }

    setSubmitDialog(false);
    
    // Redirect to course page
    router.push(`/course/${formData.courseId}`);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <DescriptionIcon sx={{ mr: 1 }} />
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Guide Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Addition Concepts Teacher Guide"
                  required
                  helperText="Provide a clear, descriptive title for your teacher guide"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this teacher guide covers, its objectives, and how it helps teachers..."
                  required
                  helperText="Provide a comprehensive description of the guide's content and purpose"
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Version"
                  value={formData.version}
                  onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                  placeholder="1.0"
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon sx={{ mr: 1 }} />
              Course Selection
            </Typography>
            <FormControl fullWidth required>
              <InputLabel>Select Course</InputLabel>
              <Select
                value={formData.courseId}
                onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
                label="Select Course"
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    <Box>
                      <Box component="div" sx={{ fontWeight: 500 }}>{course.title}</Box>
                      <Box component="div" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                        {course.level} • {course.category} • {course.instructor}
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Choose the course this teacher guide is designed for
              </FormHelperText>
            </FormControl>

            {formData.courseId && (
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  {(() => {
                    const selectedCourse = courses.find(c => c.id === formData.courseId);
                    return selectedCourse ? (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Selected Course: {selectedCourse.title}
                        </Typography>
                        <Box component="div" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1 }}>
                          {selectedCourse.description}
                        </Box>
                        <Box display="flex" gap={1} mt={2}>
                          <Chip label={selectedCourse.level} size="small" />
                          <Chip label={selectedCourse.category} size="small" />
                          <Chip label={selectedCourse.location} size="small" />
                        </Box>
                      </Box>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon sx={{ mr: 1 }} />
              Content Structure
            </Typography>
            
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Guide Sections</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setSectionDialog(true)}
                >
                  Add Section
                </Button>
              </Box>
              
              {formData.sections.length > 0 ? (
                <List>
                  {formData.sections.map((section, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={section} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removeSection(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info">
                  Add sections to organize your teacher guide content (e.g., "Introduction", "Learning Objectives", "Activities", "Assessment")
                </Alert>
              )}
            </Box>

            {/* Learning Objectives */}
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Learning Objectives</Typography>
                <Box display="flex" gap={1}>
                  <TextField
                    size="small"
                    placeholder="Add learning objective"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newObjective.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          learningObjectives: [...prev.learningObjectives, newObjective.trim()]
                        }));
                        setNewObjective('');
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (newObjective.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          learningObjectives: [...prev.learningObjectives, newObjective.trim()]
                        }));
                        setNewObjective('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              
              <Box display="flex" flexWrap="wrap" gap={1}>
                {formData.learningObjectives.map((objective, index) => (
                  <Chip
                    key={index}
                    label={objective}
                    onDelete={() => {
                      setFormData(prev => ({
                        ...prev,
                        learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
                      }));
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ScheduleIcon sx={{ mr: 1 }} />
              Lessons & Activities
            </Typography>
            
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1">Lesson Plans</Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setLessonDialog(true)}
              >
                Add Lesson
              </Button>
            </Box>

            {formData.lessons.length > 0 ? (
              <Box>
                {formData.lessons.map((lesson, index) => (
                  <Accordion key={lesson.id} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Box>
                          <Typography variant="subtitle2">{lesson.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Duration: {lesson.duration} • {lesson.materials.length} materials • {lesson.activities.length} activities
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeLesson(index);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle3" gutterBottom>Materials:</Typography>
                          <List dense>
                            {lesson.materials.map((material, i) => (
                              <ListItem key={i}>
                                <ListItemText primary={material} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle3" gutterBottom>Activities:</Typography>
                          <List dense>
                            {lesson.activities.map((activity, i) => (
                              <ListItem key={i}>
                                <ListItemText
                                  primary={activity.name}
                                  secondary={`${activity.instructions.length} steps`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            ) : (
              <Alert severity="info">
                Add lesson plans with activities, materials, and step-by-step instructions
              </Alert>
            )}
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FileUploadIcon sx={{ mr: 1 }} />
              File Upload
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload">
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Upload Teacher Guide Document
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Drag and drop your file here, or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </Typography>
                    <br />
                    <Button variant="contained" component="span" sx={{ mt: 2 }}>
                      Choose File
                    </Button>
                  </label>
                </Box>

                {formData.uploadedFile && (
                  <Box mt={3}>
                    <Alert severity="success">
                      <Box component="div" sx={{ fontSize: '0.975rem', fontWeight: 600, mb: 1 }}>
                        File uploaded successfully!
                      </Box>
                      <Box component="div" sx={{ fontSize: '0.875rem' }}>
                        <strong>File:</strong> {formData.uploadedFile.name}<br />
                        <strong>Size:</strong> {formData.fileSize}
                      </Box>
                    </Alert>
                    
                    <Box mt={2}>
                      <TextField
                        type="number"
                        label="Number of Pages"
                        value={formData.pages}
                        onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) || 0 }))}
                        helperText="Enter the total number of pages in your guide"
                        sx={{ mr: 2, width: '200px' }}
                      />
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Tags and Additional Notes */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1">Tags</Typography>
                    <Box display="flex" gap={1}>
                      <TextField
                        size="small"
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newTag.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              tags: [...prev.tags, newTag.trim()]
                            }));
                            setNewTag('');
                          }
                        }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          if (newTag.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              tags: [...prev.tags, newTag.trim()]
                            }));
                            setNewTag('');
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                  
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => {
                          setFormData(prev => ({
                            ...prev,
                            tags: prev.tags.filter((_, i) => i !== index)
                          }));
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Additional Notes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Any additional information, special instructions, or notes about this guide..."
                />
              </CardContent>
            </Card>
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PreviewIcon sx={{ mr: 1 }} />
              Review & Submit
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review all information before submitting. Once submitted, your guide will be reviewed by curriculum supervisors.
            </Alert>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Guide Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>Title:</strong> {formData.title}</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>Author:</strong> {formData.author}</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>Version:</strong> {formData.version}</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}>
                      <strong>Course:</strong> {courses.find(c => c.id === formData.courseId)?.title}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box component="div" sx={{ fontSize: '0.875rem', fontWeight: 'bold', mb: 0.5 }}>Description:</Box>
                    <Box component="div" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{formData.description}</Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Structure</Typography>
                <Box component="div" sx={{ fontSize: '0.875rem', fontWeight: 'bold', mb: 1 }}>Sections ({formData.sections.length}):</Box>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {formData.sections.map((section, index) => (
                    <Chip key={index} label={section} size="small" />
                  ))}
                </Box>
                
                <Box component="div" sx={{ fontSize: '0.875rem', fontWeight: 'bold', mb: 1 }}>Lessons ({formData.lessons.length}):</Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.lessons.map((lesson, index) => (
                    <Chip key={index} label={lesson.title} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>File Information</Typography>
                {formData.uploadedFile ? (
                  <Box>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>File:</strong> {formData.uploadedFile.name}</Box>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>Size:</strong> {formData.fileSize}</Box>
                    <Box component="div" sx={{ fontSize: '0.875rem' }}><strong>Pages:</strong> {formData.pages}</Box>
                  </Box>
                ) : (
                  <Box component="div" sx={{ fontSize: '0.875rem', color: 'error.main' }}>No file uploaded</Box>
                )}
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={3} display="flex" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{ mr: 2 }}
        >
          Back to Courses
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Upload Teacher Guide
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        <Box sx={{ minHeight: '400px', mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => setSubmitDialog(true)}
                startIcon={<SendIcon />}
                disabled={!isStepValid(activeStep)}
                color="success"
              >
                Submit Guide for Review
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Section Dialog */}
      <Dialog open={sectionDialog} onClose={() => setSectionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Content Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Section Name"
            fullWidth
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="e.g., Introduction, Learning Objectives, Activities"
            helperText="Add a section to organize your guide content"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSectionDialog(false)}>Cancel</Button>
          <Button onClick={addSection} variant="contained" disabled={!newSection.trim()}>
            Add Section
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog open={lessonDialog} onClose={() => setLessonDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Lesson Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Lesson Title"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Number Recognition Activities"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Duration"
                value={newLesson.duration}
                onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 15 minutes"
              />
            </Grid>
            
            {/* Materials */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Materials Needed</Typography>
              <Box display="flex" gap={1} mb={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMaterial.trim()) {
                      setNewLesson(prev => ({
                        ...prev,
                        materials: [...prev.materials, newMaterial.trim()]
                      }));
                      setNewMaterial('');
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (newMaterial.trim()) {
                      setNewLesson(prev => ({
                        ...prev,
                        materials: [...prev.materials, newMaterial.trim()]
                      }));
                      setNewMaterial('');
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {newLesson.materials.map((material, index) => (
                  <Chip
                    key={index}
                    label={material}
                    size="small"
                    onDelete={() => {
                      setNewLesson(prev => ({
                        ...prev,
                        materials: prev.materials.filter((_, i) => i !== index)
                      }));
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Content */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Lesson Content</Typography>
              <Box display="flex" gap={1} mb={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add content point"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newContent.trim()) {
                      setNewLesson(prev => ({
                        ...prev,
                        content: [...prev.content, newContent.trim()]
                      }));
                      setNewContent('');
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (newContent.trim()) {
                      setNewLesson(prev => ({
                        ...prev,
                        content: [...prev.content, newContent.trim()]
                      }));
                      setNewContent('');
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <List dense>
                {newLesson.content.map((content, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={content} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => {
                          setNewLesson(prev => ({
                            ...prev,
                            content: prev.content.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLessonDialog(false)}>Cancel</Button>
          <Button 
            onClick={addLesson} 
            variant="contained" 
            disabled={!newLesson.title || !newLesson.duration}
          >
            Add Lesson
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submit Confirmation Dialog */}
      <Dialog open={submitDialog} onClose={() => setSubmitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Teacher Guide</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Your teacher guide will be submitted for review. The review process typically takes 3-5 business days.
          </Alert>
          <Typography variant="body2">
            Are you sure you want to submit "{formData.title}" for review? 
            You will be notified via email about the review status.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit for Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 