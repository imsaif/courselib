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
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Drawer,
  IconButton,
  Avatar,
  Tooltip,
  Collapse,
  Badge,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  ArrowBack as ArrowBackIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Pending as PendingIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccessTime as AccessTimeIcon,
  Description as DescriptionIcon,
  Comment as CommentIcon,
  CloudUpload as CloudUploadIcon,
  FileDownload as FileDownloadIcon,
  Share as ShareIcon,
  Schedule as ScheduleIcon,
  Assignment as MaterialsIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@mui/icons-material';
import { courses } from '@/data/courses';
import { TeacherGuideDetails } from '@/types/course';

// Mock data for teacher guide details with simplified structure
const getTeacherGuideDetails = (courseId: string, guideId: string): TeacherGuideDetails | null => {
  const course = courses.find(c => c.id === courseId);
  const guide = course?.teacherGuides.guides?.find(g => g.id === guideId);
  
  if (!guide || !course) return null;

  // Different sample guides based on guide ID
  const sampleGuides: Record<string, Partial<TeacherGuideDetails>> = {
    'guide-1-1': {
      lesson: {
        identifier: 'Mathematics_P1L1',
        goal: 'Count from 1 to 5',
        activities: [
          {
            title: 'Counting',
            duration: '2 Minutes',
            content: [
              'Today our goal is to count from 1 to 5.',
              'What is our goal? [Signal] Count from 1 to 5.',
              'First, we will practise counting.',
              'Stand up tall and still. Scan.',
              'We will count from 1 to 5. What will we count? [Signal] 1 to 5.',
              'We will count by 1s. What will we count by? [Signal] 1s.',
              'Count. [Signal] 1, 2, 3, 4, 5.',
              'Let\'s do that once again, faster this time. Count. [Signal] 1, 2, 3, 4, 5.',
              'Count once again. [Signal] 1, 2, 3, 4, 5.',
              'Sit down.'
            ]
          },
          {
            title: 'Drills',
            duration: '3 Minutes',
            content: [
              'Now we will count from 1 to 10 using fingers.',
              'When we count, we hold up our fingers.',
              'I will count first.',
              'Watch closely as I count from 1 to 10.',
              'Hold up your fingers as you count.',
              '1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
              'Now we will count together.',
              'Hold up your fingers as you count.',
              'Hold up your fingers as you count.'
            ]
          }
        ]
      }
    },
    'guide-1-2': {
      lesson: {
        identifier: 'Mathematics_P1L2',
        goal: 'Simple subtraction using objects',
        activities: [
          {
            title: 'Introduction',
            duration: '1 Minute',
            content: [
              'Today we will learn subtraction.',
              'What will we learn? [Signal] Subtraction.',
              'Subtraction means taking away.',
              'What does subtraction mean? [Signal] Taking away.'
            ]
          },
          {
            title: 'Practice with Objects',
            duration: '4 Minutes',
            content: [
              'I have 5 blocks. Count them with me.',
              'Count. [Signal] 1, 2, 3, 4, 5.',
              'I take away 2 blocks.',
              'How many blocks are left? [Signal] 3.',
              'Let\'s try another one.',
              'I have 4 pencils. I take away 1.',
              'How many pencils are left? [Signal] 3.'
            ]
          }
        ]
      }
    }
  };

  const sampleData = sampleGuides[guide.id] || sampleGuides['guide-1-1'];

  return {
    id: guide.id,
    title: guide.title,
    status: guide.status,
    courseName: course.title,
    description: 'This teacher guide provides simple, step-by-step instructions for teaching fundamental math concepts to elementary students.',
    author: 'Ms. Sarah Johnson',
    version: '2.1',
    lastModified: '2024-01-15',
    fileSize: '350 KB',
    pages: 8,
    lesson: sampleData.lesson!,
    detailedHistory: [
      {
        id: 'h1',
        action: 'created',
        type: 'document',
        date: '2024-01-05',
        time: '09:00 AM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Created initial document structure',
        changes: ['Document created', 'Basic template applied'],
        version: '1.0',
        status: 'draft'
      },
      {
        id: 'h2',
        action: 'edited',
        type: 'content',
        date: '2024-01-06',
        time: '02:30 PM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Added introduction and visual teaching methods sections',
        changes: [
          'Added "Introduction to Addition" section (3 pages)',
          'Added visual teaching aids illustrations',
          'Included learning objectives'
        ],
        version: '1.1',
        status: 'draft'
      },
      {
        id: 'h3',
        action: 'shared',
        type: 'collaboration',
        date: '2024-01-07',
        time: '11:15 AM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Shared with peer reviewers for feedback',
        changes: ['Document shared with Ms. Emma Wilson', 'Comment permissions enabled'],
        version: '1.1',
        status: 'draft'
      },
      {
        id: 'h4',
        action: 'commented',
        type: 'review',
        date: '2024-01-08',
        time: '03:45 PM',
        user: 'Ms. Emma Wilson',
        role: 'Peer Reviewer',
        avatar: '/avatars/emma.jpg',
        comment: 'Excellent start! Suggest adding more hands-on activities',
        changes: ['3 comments added to activities section'],
        version: '1.1',
        status: 'draft'
      },
      {
        id: 'h5',
        action: 'edited',
        type: 'content',
        date: '2024-01-09',
        time: '10:20 AM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Incorporated peer feedback and expanded activities section',
        changes: [
          'Added 5 new hands-on activities',
          'Expanded assessment strategies',
          'Resolved all peer review comments'
        ],
        version: '2.0',
        status: 'draft'
      },
      {
        id: 'h6',
        action: 'submitted',
        type: 'workflow',
        date: '2024-01-10',
        time: '09:30 AM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Initial submission of Addition Concepts Teacher Guide v2.1',
        changes: ['Document submitted for official review'],
        version: '2.1',
        status: 'pending'
      },
      {
        id: 'h7',
        action: 'reviewed',
        type: 'workflow',
        date: '2024-01-12',
        time: '02:15 PM',
        user: 'Dr. Michael Chen',
        role: 'Curriculum Supervisor',
        avatar: '/avatars/michael.jpg',
        comment: 'Reviewed guide - requesting minor revisions to assessment section',
        changes: ['Official review completed', 'Revision notes added'],
        version: '2.1',
        status: 'revision_requested'
      },
      {
        id: 'h8',
        action: 'edited',
        type: 'content',
        date: '2024-01-14',
        time: '11:45 AM',
        user: 'Ms. Sarah Johnson',
        role: 'Teacher',
        avatar: '/avatars/sarah.jpg',
        comment: 'Updated assessment strategies based on feedback. Added rubrics and sample questions.',
        changes: [
          'Added detailed assessment rubrics',
          'Included sample quiz questions',
          'Updated answer keys'
        ],
        version: '2.1',
        status: 'pending'
      },
      {
        id: 'h9',
        action: 'approved',
        type: 'workflow',
        date: '2024-01-15',
        time: '04:20 PM',
        user: 'Dr. Michael Chen',
        role: 'Curriculum Supervisor',
        avatar: '/avatars/michael.jpg',
        comment: 'Guide approved. Excellent work on the assessment section improvements.',
        changes: ['Document officially approved', 'Published to course library'],
        version: '2.1',
        status: 'approved'
      }
    ]
  };
};

export default function TeacherGuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const guideId = params.guideId as string;
  
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');
  const [rejectionComment, setRejectionComment] = useState('');
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [expandedHistoryItem, setExpandedHistoryItem] = useState<string | null>(null);
  const guideDetails = getTeacherGuideDetails(courseId, guideId);

  if (!guideDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Teacher Guide Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            The teacher guide you're looking for doesn't exist or has been removed.
          </Typography>
          <Button variant="contained" onClick={() => router.push(`/course/${courseId}`)}>
            Back to Course Details
          </Button>
        </Paper>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'revision_requested': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'revision_requested': return <EditIcon />;
      default: return <AssignmentIcon />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approved': return <ThumbUpIcon color="success" />;
      case 'submitted': return <AssignmentIcon color="primary" />;
      case 'reviewed': return <VisibilityIcon color="warning" />;
      case 'revised': return <EditIcon color="info" />;
      default: return <HistoryIcon />;
    }
  };

  const getDetailedActionIcon = (action: string, type: string) => {
    switch (action) {
      case 'created': return <DescriptionIcon color="primary" />;
      case 'edited': return <EditIcon color="info" />;
      case 'shared': return <ShareIcon color="secondary" />;
      case 'commented': return <CommentIcon color="warning" />;
      case 'submitted': return <CloudUploadIcon color="primary" />;
      case 'reviewed': return <VisibilityIcon color="warning" />;
      case 'approved': return <ThumbUpIcon color="success" />;
      case 'downloaded': return <FileDownloadIcon color="action" />;
      default: return <HistoryIcon color="action" />;
    }
  };

  const getActionTypeColor = (type: string) => {
    switch (type) {
      case 'document': return '#1976d2';
      case 'content': return '#2e7d32';
      case 'collaboration': return '#7b1fa2';
      case 'review': return '#ed6c02';
      case 'workflow': return '#d32f2f';
      default: return '#757575';
    }
  };

  const handleApprove = () => {
    // In a real application, this would make an API call
    console.log('Approving guide:', guideId, 'with comment:', approvalComment);
    setShowApprovalDialog(false);
    setApprovalComment('');
    // You could update the local state or refetch data here
  };

  const handleReject = () => {
    // In a real application, this would make an API call
    console.log('Rejecting guide:', guideId, 'with comment:', rejectionComment);
    setShowRejectionDialog(false);
    setRejectionComment('');
    // You could update the local state or refetch data here
  };

  const toggleHistoryItem = (itemId: string) => {
    setExpandedHistoryItem(expandedHistoryItem === itemId ? null : itemId);
  };

  return (
    <Box>
      {/* Header with Back Button and History Icon */}
      <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => router.push(`/course/${courseId}`)}
            sx={{ mr: 2 }}
          >
            Back to Course
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Teacher Guide Details
          </Typography>
        </Box>
        
        {/* History Button - Google Docs Style */}
        <Tooltip title="View document history">
          <IconButton
            onClick={() => setHistoryDrawerOpen(true)}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Badge badgeContent={guideDetails.detailedHistory.length} color="primary" max={99}>
              <HistoryIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Guide Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  {guideDetails.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Course: {guideDetails.courseName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {guideDetails.description}
                </Typography>
              </Box>
              <Chip
                icon={getStatusIcon(guideDetails.status)}
                label={guideDetails.status.replace('_', ' ').toUpperCase()}
                color={getStatusColor(guideDetails.status)}
                size="large"
                sx={{ ml: 2 }}
              />
            </Box>

            {/* Guide Metadata */}
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Author:</strong> {guideDetails.author}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Version:</strong> {guideDetails.version}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Last Modified:</strong> {guideDetails.lastModified}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>File Size:</strong> {guideDetails.fileSize}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Pages:</strong> {guideDetails.pages}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Lesson Content - Simplified Format */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', textAlign: 'center' }}>
                {guideDetails.lesson.identifier}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, textAlign: 'center', mb: 3 }}>
                Goal: {guideDetails.lesson.goal}
              </Typography>
            </Box>

            {/* Activities */}
            {guideDetails.lesson.activities.map((activity, idx) => (
              <Card 
                key={idx} 
                elevation={2} 
                sx={{ 
                  mb: 3, 
                  borderLeft: '4px solid',
                  borderLeftColor: 'primary.main',
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {activity.title} – {activity.duration}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {activity.content.map((line, lineIdx) => (
                      <Typography 
                        key={lineIdx}
                        variant="body1" 
                        sx={{ 
                          mb: 1,
                          lineHeight: 1.7,
                          fontSize: '1rem',
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Actions and History */}
        <Grid item xs={12} md={4}>
          {/* Action Buttons */}
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<ThumbUpIcon />}
                  onClick={() => setShowApprovalDialog(true)}
                  disabled={guideDetails.status === 'approved'}
                >
                  Approve Guide
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<ThumbDownIcon />}
                  onClick={() => setShowRejectionDialog(true)}
                  disabled={guideDetails.status === 'approved'}
                >
                  Request Revision
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Quick History Timeline */}
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <HistoryIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={() => setHistoryDrawerOpen(true)}
                  endIcon={<HistoryIcon />}
                  sx={{ fontSize: '0.75rem' }}
                >
                  View All
                </Button>
              </Box>

              {/* Condensed timeline showing only recent items */}
              <Timeline position="right">
                {guideDetails.detailedHistory.slice(-3).map((entry, index) => (
                  <TimelineItem key={entry.id}>
                    <TimelineOppositeContent
                      sx={{ m: 'auto 0', fontSize: '0.7rem' }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      {entry.date}
                      <br />
                      {entry.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot size="small">
                        {getActionIcon(entry.action)}
                      </TimelineDot>
                      {index < guideDetails.detailedHistory.slice(-3).length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '8px', px: 1 }}>
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        by {entry.user}
                      </Typography>
                      <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                        {entry.comment.length > 60 ? `${entry.comment.substring(0, 60)}...` : entry.comment}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>

              {guideDetails.detailedHistory.length > 3 && (
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  align="center" 
                  display="block"
                  sx={{ mt: 1 }}
                >
                  {guideDetails.detailedHistory.length - 3} more entries available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onClose={() => setShowApprovalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Approve Teacher Guide</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Are you sure you want to approve this teacher guide? This action will make it available for use.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Approval Comment (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={approvalComment}
            onChange={(e) => setApprovalComment(e.target.value)}
            placeholder="Add any comments about the approval..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
          <Button onClick={handleApprove} variant="contained" color="success">
            Approve Guide
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onClose={() => setShowRejectionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Revision</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide specific feedback about what needs to be revised in this teacher guide.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Revision Comments *"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={rejectionComment}
            onChange={(e) => setRejectionComment(e.target.value)}
            placeholder="Describe what changes are needed..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleReject} 
            variant="contained" 
            color="error"
            disabled={!rejectionComment.trim()}
          >
            Request Revision
          </Button>
        </DialogActions>
      </Dialog>

             {/* Enhanced History Drawer - Google Docs Style */}
       <Drawer
         anchor="right"
         open={historyDrawerOpen}
         onClose={() => setHistoryDrawerOpen(false)}
         PaperProps={{
           sx: {
             width: '400px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
           },
         }}
       >
         <Box display="flex" flexDirection="column" height="100%">
           {/* Header */}
           <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
             <Box display="flex" alignItems="center" justifyContent="space-between">
               <Box>
                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                   Version history
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   {guideDetails.title}
                 </Typography>
               </Box>
               <IconButton 
                 onClick={() => setHistoryDrawerOpen(false)}
                 sx={{ 
                   color: 'text.secondary',
                   '&:hover': { backgroundColor: 'action.hover' }
                 }}
               >
                 <CloseIcon />
               </IconButton>
             </Box>
           </Box>

           {/* History List */}
           <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
             {guideDetails.detailedHistory.map((entry, index) => (
               <Box
                 key={entry.id}
                 sx={{
                   p: 2,
                   borderBottom: '1px solid',
                   borderColor: 'divider',
                   cursor: 'pointer',
                   '&:hover': {
                     backgroundColor: 'action.hover',
                   },
                   '&:last-child': {
                     borderBottom: 'none',
                   },
                 }}
                 onClick={() => toggleHistoryItem(entry.id)}
               >
                 <Box display="flex" alignItems="flex-start" gap={2}>
                   {/* User Avatar */}
                   <Avatar
                     sx={{ 
                       width: 32, 
                       height: 32,
                       bgcolor: getActionTypeColor(entry.type),
                       fontSize: '0.875rem'
                     }}
                   >
                     {entry.user.split(' ').map(n => n[0]).join('')}
                   </Avatar>

                   <Box flexGrow={1} minWidth={0}>
                     {/* Action and Time */}
                     <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                       <Typography variant="body2" sx={{ fontWeight: 500 }}>
                         {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
                       </Typography>
                       <Chip
                         label={entry.type}
                         size="small"
                         sx={{
                           height: 20,
                           fontSize: '0.65rem',
                           bgcolor: getActionTypeColor(entry.type),
                           color: 'white',
                         }}
                       />
                     </Box>

                     {/* User and Time */}
                     <Typography variant="caption" color="text.secondary" display="block">
                       {entry.user} • {entry.date} at {entry.time}
                     </Typography>

                     {/* Version Badge */}
                     {entry.version && (
                       <Chip
                         label={`v${entry.version}`}
                         size="small"
                         variant="outlined"
                         sx={{ mt: 1, height: 20, fontSize: '0.65rem' }}
                       />
                     )}

                     {/* Comment */}
                     <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                       {entry.comment}
                     </Typography>

                     {/* Expandable Changes List */}
                     {entry.changes && entry.changes.length > 0 && (
                       <Box sx={{ mt: 1 }}>
                         <Box
                           display="flex"
                           alignItems="center"
                           gap={0.5}
                           sx={{
                             cursor: 'pointer',
                             color: 'primary.main',
                             '&:hover': { color: 'primary.dark' },
                           }}
                         >
                           {expandedHistoryItem === entry.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                           <Typography variant="caption">
                             {entry.changes.length} change{entry.changes.length !== 1 ? 's' : ''}
                           </Typography>
                         </Box>

                         <Collapse in={expandedHistoryItem === entry.id}>
                           <Box sx={{ mt: 1, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
                             {entry.changes.map((change, changeIndex) => (
                               <Typography
                                 key={changeIndex}
                                 variant="caption"
                                 display="block"
                                 sx={{ 
                                   py: 0.25,
                                   color: 'text.secondary',
                                   fontSize: '0.7rem'
                                 }}
                               >
                                 • {change}
                               </Typography>
                             ))}
                           </Box>
                         </Collapse>
                       </Box>
                     )}

                     {/* Action Buttons for Versions */}
                     {(entry.action === 'approved' || entry.action === 'submitted') && (
                       <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                         <Button
                           size="small"
                           variant="outlined"
                           startIcon={<VisibilityIcon />}
                           sx={{ fontSize: '0.65rem', py: 0.25, px: 1 }}
                         >
                           View
                         </Button>
                         {entry.action === 'approved' && (
                           <Button
                             size="small"
                             variant="outlined"
                             startIcon={<FileDownloadIcon />}
                             sx={{ fontSize: '0.65rem', py: 0.25, px: 1 }}
                           >
                             Download
                           </Button>
                         )}
                       </Box>
                     )}
                   </Box>
                 </Box>
               </Box>
             ))}
           </Box>

           {/* Footer */}
           <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
             <Typography variant="caption" color="text.secondary" align="center" display="block">
               Last updated: {guideDetails.lastModified}
             </Typography>
           </Box>
         </Box>
       </Drawer>
    </Box>
  );
}