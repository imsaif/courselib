'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Button, 
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  MenuBook as MenuBookIcon, 
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon 
} from '@mui/icons-material';

export default function TypographyDemo() {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          Course Library Typography System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          A comprehensive typography hierarchy for consistent content presentation
        </Typography>
      </Box>

      {/* Typography Hierarchy */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Typography Hierarchy
        </Typography>
        
        <Grid container spacing={4}>
          {/* Headings */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Headings
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h1">H1 - Page Titles</Typography>
              <Typography variant="caption" color="text.secondary">
                40px, Bold (700) • Dashboard, Main Course Pages
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h2">H2 - Section Titles</Typography>
              <Typography variant="caption" color="text.secondary">
                32px, Semi-Bold (600) • Course Library, Upload Guide
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3">H3 - Sub-sections</Typography>
              <Typography variant="caption" color="text.secondary">
                28px, Semi-Bold (600) • Guide Information, Requirements
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4">H4 - Card Titles</Typography>
              <Typography variant="caption" color="text.secondary">
                24px, Semi-Bold (600) • Course Cards, Dialog Titles
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5">H5 - Course Titles</Typography>
              <Typography variant="caption" color="text.secondary">
                20px, Semi-Bold (600) • Individual Course Names
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">H6 - Form Sections</Typography>
              <Typography variant="caption" color="text.secondary">
                18px, Semi-Bold (600) • Form Section Headers
              </Typography>
            </Box>
          </Grid>

          {/* Body Text & Subtitles */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Body Text & Labels
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Subtitle 1 - Course Descriptions</Typography>
              <Typography variant="caption" color="text.secondary">
                16px, Medium (500) • Course introductions, section descriptions
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Subtitle 2 - Metadata Labels</Typography>
              <Typography variant="caption" color="text.secondary">
                14px, Semi-Bold (600), Uppercase • Form labels, data labels
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1">Body 1 - Primary Content</Typography>
              <Typography variant="caption" color="text.secondary">
                16px, Regular (400) • Main content text, descriptions
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2">Body 2 - Secondary Content</Typography>
              <Typography variant="caption" color="text.secondary">
                14px, Regular (400) • Helper text, secondary descriptions
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="button">Button Text - Navigation</Typography>
              <Typography variant="caption" color="text.secondary">
                14px, Semi-Bold (600) • Buttons, navigation links
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption">Caption - Metadata</Typography>
              <Typography variant="caption" color="text.secondary">
                12px, Regular (400) • Timestamps, file sizes, helper text
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline">Overline - Status Tags</Typography>
              <Typography variant="caption" color="text.secondary">
                12px, Bold (700), Uppercase • Status indicators, tags
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Practical Examples */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Practical Examples
        </Typography>

        {/* Course Card Example */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Course Card Layout
          </Typography>
          
          <Card sx={{ maxWidth: 600, p: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="overline" color="primary.main">
                  Grade 3 • Mathematics
                </Typography>
              </Box>
              
              <Typography variant="h5" gutterBottom>
                Addition and Subtraction Fundamentals
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Master basic arithmetic operations with hands-on activities and real-world examples
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body2">
                    6 weeks
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Author
                  </Typography>
                  <Typography variant="body2">
                    Sarah Johnson
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="Approved" 
                  color="success" 
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  Last updated: March 15, 2024
                </Typography>
              </Box>
              
              <Button variant="contained" size="small">
                View Course Details
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Dashboard Statistics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Dashboard Statistics
          </Typography>
          
          <Grid container spacing={3} sx={{ maxWidth: 800 }}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" color="primary.main">
                  156
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Total Courses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available in library
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <MenuBookIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" color="success.main">
                  89
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Approved Guides
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready for use
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" color="warning.main">
                  12
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Pending Review
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Awaiting approval
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Form Example */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Form Typography
          </Typography>
          
          <Paper elevation={1} sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h4" gutterBottom>
              Upload New Guide
            </Typography>
            
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Complete the form below to submit your teacher guide for review
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Guide Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter a descriptive title for your guide
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Course Subject
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select the subject area this guide covers
                </Typography>
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                * Required fields must be completed before submission
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Usage Guidelines */}
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h2" gutterBottom>
          Usage Guidelines
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Do's
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Use H1 for main page titles only"
                  secondary="Each page should have one clear H1 heading"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Follow the hierarchy consistently"
                  secondary="Don't skip heading levels (H2 to H4)"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Use subtitle2 for all form labels"
                  secondary="Maintains consistent form styling"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Apply overline for status indicators"
                  secondary="Creates clear visual hierarchy for tags"
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Don'ts
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Don't use hardcoded font sizes"
                  secondary="Always use typography variants"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Don't mix font weights inconsistently"
                  secondary="Stick to the defined weights in each variant"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Don't use H1 multiple times per page"
                  secondary="Can confuse screen readers and SEO"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Don't override colors unless necessary"
                  secondary="Use the theme colors for consistency"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 