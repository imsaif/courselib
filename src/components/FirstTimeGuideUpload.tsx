'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  MenuBook as MenuBookIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Info as InfoIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

interface FirstTimeGuideUploadProps {
  courseId: string;
  courseTitle: string;
  onUploadComplete: () => void;
  onCancel: () => void;
}

interface FirstTimeGuideFormData {
  title: string;
  description: string;
  author: string;
  uploadedFile: File | null;
  fileSize: string;
  pages: number;
  additionalNotes: string;
}

const steps = [
  'Welcome & Guidelines',
  'Guide Information',
  'File Upload',
  'Review & Submit'
];

export default function FirstTimeGuideUpload({ 
  courseId, 
  courseTitle, 
  onUploadComplete, 
  onCancel 
}: FirstTimeGuideUploadProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState<FirstTimeGuideFormData>({
    title: '',
    description: '',
    author: '',
    uploadedFile: null,
    fileSize: '',
    pages: 0,
    additionalNotes: '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
      pages: Math.ceil(file.size / (1024 * 20))
    }));
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Submitting first teacher guide for course:', courseId, 'with data:', formData);
      setUploadSuccess(true);
      setTimeout(() => {
        onUploadComplete();
      }, 1500);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: return true;
      case 1: return !!(formData.title && formData.description && formData.author);
      case 2: return !!formData.uploadedFile;
      case 3: return !!(formData.title && formData.description && formData.author && formData.uploadedFile);
      default: return false;
    }
  };

  if (uploadSuccess) {
    return (
      <Box textAlign="center" py={4}>
        <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          First Teacher Guide Uploaded Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your guide is now under review and will be available once approved.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={3} textAlign="center">
        <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h4" gutterBottom>
          Upload First Teacher Guide
        </Typography>
        <Typography variant="h6" color="text.secondary">
          for {courseTitle}
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Welcome & Guidelines</StepLabel>
          <StepContent>
            <Card elevation={1} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="h6">
                    Setting Up Teacher Guides
                  </Typography>
                </Box>
                
                <Typography variant="body1" gutterBottom>
                  This course currently has no teacher guides. You're about to create the first one!
                </Typography>

                <Alert severity="info" sx={{ my: 2 }}>
                  <Typography variant="body2">
                    <strong>What are Teacher Guides?</strong><br />
                    Teacher guides provide detailed lesson plans, activities, and instructional strategies 
                    to help educators deliver course content effectively.
                  </Typography>
                </Alert>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Guidelines for your first upload:</strong>
                </Typography>
                <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                  <Typography component="li" variant="body2">Files must be PDF, DOC, or DOCX format</Typography>
                  <Typography component="li" variant="body2">Maximum file size: 10MB</Typography>
                  <Typography component="li" variant="body2">Include clear lesson objectives and activities</Typography>
                  <Typography component="li" variant="body2">Provide implementation timeline and instructions</Typography>
                </Box>
              </CardContent>
            </Card>

            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" onClick={onCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Get Started
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Guide Information</StepLabel>
          <StepContent>
            <Card elevation={1} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tell us about your teacher guide
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Guide Title"
                    fullWidth
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Complete Lesson Plans for Introduction to Science"
                    required
                  />

                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this guide covers and how it helps teachers..."
                    required
                  />

                  <TextField
                    label="Author Name"
                    fullWidth
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Your name or organization"
                    required
                  />

                  <TextField
                    label="Additional Notes (Optional)"
                    fullWidth
                    multiline
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Any special instructions or requirements..."
                  />
                </Box>
              </CardContent>
            </Card>

            <Box display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" onClick={handleNext} disabled={!isStepValid(1)}>
                Next
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>File Upload</StepLabel>
          <StepContent>
            <Card elevation={1} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload your teacher guide file
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    border: '2px dashed',
                    borderColor: formData.uploadedFile ? 'success.main' : 'grey.300',
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: formData.uploadedFile ? 'success.50' : 'grey.50',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.50',
                    },
                  }}
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                >
                  <input
                    id="file-upload-input"
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />

                  {formData.uploadedFile ? (
                    <Box>
                      <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        File Uploaded Successfully
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formData.uploadedFile.name}
                      </Typography>
                      <Box display="flex" justifyContent="center" gap={1} mt={1}>
                        <Chip label={`${formData.fileSize}`} size="small" />
                        <Chip label={`~${formData.pages} pages`} size="small" />
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Drag and drop your file here
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        or click to browse files
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Supported formats: PDF, DOC, DOCX (max 10MB)
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </CardContent>
            </Card>

            <Box display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" onClick={handleNext} disabled={!isStepValid(2)}>
                Next
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Review & Submit</StepLabel>
          <StepContent>
            <Card elevation={1} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Review your submission
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Guide Title</Typography>
                    <Typography variant="body1">{formData.title}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{formData.description}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Author</Typography>
                    <Typography variant="body1">{formData.author}</Typography>
                  </Box>

                  {formData.uploadedFile && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Uploaded File</Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MenuBookIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="body1">{formData.uploadedFile.name}</Typography>
                        <Chip label={formData.fileSize} size="small" />
                      </Box>
                    </Box>
                  )}

                  {formData.additionalNotes && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Additional Notes</Typography>
                      <Typography variant="body1">{formData.additionalNotes}</Typography>
                    </Box>
                  )}
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>What happens next?</strong><br />
                    Your guide will be reviewed by our education team. You'll receive an email notification 
                    when the review is complete, typically within 2-3 business days.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            <Box display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                onClick={() => setConfirmDialogOpen(true)}
                disabled={!isStepValid(3)}
                startIcon={<UploadIcon />}
              >
                Submit Guide
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>

      {isUploading && (
        <Box mt={3}>
          <Typography variant="body2" gutterBottom>
            Uploading your teacher guide...
          </Typography>
          <LinearProgress />
        </Box>
      )}

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you ready to submit this teacher guide for review? 
            This will be the first teacher guide for "{courseTitle}".
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setConfirmDialogOpen(false);
              handleSubmit();
            }}
            disabled={isUploading}
          >
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 