'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Paper,
  Chip,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
  SwapVert as ReorderIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface Guide {
  id: string;
  title: string;
  status: 'approved' | 'pending' | 'revision_requested' | 'resubmitted';
  order?: number;
}

interface LessonReorderDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (reorderedGuides: Guide[]) => void;
  guides: Guide[];
  courseTitle: string;
  newlyAddedGuideId?: string;
  removedGuideTitle?: string;
  mode?: 'add' | 'remove';
}

export default function LessonReorderDialog({
  open,
  onClose,
  onSave,
  guides,
  courseTitle,
  newlyAddedGuideId,
  removedGuideTitle,
  mode = 'add'
}: LessonReorderDialogProps) {
  const [orderedGuides, setOrderedGuides] = useState<Guide[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (guides.length > 0) {
      // Sort guides by existing order, or by the order they appear in the array
      const sortedGuides = [...guides].map((guide, index) => ({
        ...guide,
        order: guide.order ?? index + 1
      })).sort((a, b) => (a.order || 0) - (b.order || 0));
      
      setOrderedGuides(sortedGuides);
    }
  }, [guides]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const newGuides = [...orderedGuides];
    const draggedGuide = newGuides[draggedIndex];
    
    // Remove the dragged item
    newGuides.splice(draggedIndex, 1);
    
    // Insert at new position
    newGuides.splice(targetIndex, 0, draggedGuide);
    
    // Update order numbers
    const reorderedGuides = newGuides.map((guide, index) => ({
      ...guide,
      order: index + 1
    }));
    
    setOrderedGuides(reorderedGuides);
    setDraggedIndex(null);
  };

  const moveGuide = (fromIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && fromIndex === 0) ||
      (direction === 'down' && fromIndex === orderedGuides.length - 1)
    ) {
      return;
    }

    const newGuides = [...orderedGuides];
    const targetIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    // Swap the guides
    [newGuides[fromIndex], newGuides[targetIndex]] = [newGuides[targetIndex], newGuides[fromIndex]];
    
    // Update order numbers
    const reorderedGuides = newGuides.map((guide, index) => ({
      ...guide,
      order: index + 1
    }));
    
    setOrderedGuides(reorderedGuides);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon color="success" />;
      case 'pending': return <PendingIcon color="warning" />;
      case 'revision_requested': return <EditIcon color="error" />;
      case 'resubmitted': return <CancelIcon color="info" />;
      default: return <AssignmentIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'revision_requested': return 'error';
      case 'resubmitted': return 'info';
      default: return 'default';
    }
  };

  const handleSave = () => {
    onSave(orderedGuides);
    onClose();
  };

  const hasChanges = () => {
    return orderedGuides.some((guide, index) => {
      const originalGuide = guides.find(g => g.id === guide.id);
      return originalGuide && (originalGuide.order ?? index + 1) !== guide.order;
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, minHeight: '60vh' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center">
          <ReorderIcon sx={{ mr: 1, color: mode === 'remove' ? 'error.main' : 'primary.main' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {mode === 'remove' ? 'Review Updated Lesson Order' : 'Review Lesson Order'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              for {courseTitle}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Alert severity={mode === 'remove' ? 'warning' : 'info'} sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {mode === 'remove' ? 'Guide Removed - Review Order' : 'New Guide Added - Review Order'}
          </Typography>
          <Typography variant="body2">
            {mode === 'remove' 
              ? `"${removedGuideTitle}" has been removed from this course. Please review and adjust the lesson order of the remaining guides to ensure proper teaching sequence. Drag guides up or down, or use the arrow buttons to reorder.`
              : 'A new guide has been added to this course. Please review and adjust the lesson order to ensure proper teaching sequence. Drag guides up or down, or use the arrow buttons to reorder.'
            }
          </Typography>
        </Alert>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Current Lesson Order ({orderedGuides.length} guides)
        </Typography>

        <Paper elevation={1} sx={{ p: 2 }}>
          <List sx={{ p: 0 }}>
            {orderedGuides.map((guide, index) => (
              <React.Fragment key={guide.id}>
                <ListItem
                  sx={{
                    border: '1px solid',
                    borderColor: newlyAddedGuideId === guide.id ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: newlyAddedGuideId === guide.id ? 'primary.50' : 'background.paper',
                    cursor: 'move',
                    '&:hover': {
                      backgroundColor: newlyAddedGuideId === guide.id ? 'primary.100' : 'action.hover',
                    },
                    transition: 'all 0.2s ease',
                    ...(draggedIndex === index && {
                      opacity: 0.5,
                      transform: 'scale(0.95)',
                    })
                  }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                    <DragIcon color="action" />
                  </ListItemIcon>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          mr: 2,
                          minWidth: '40px',
                          textAlign: 'center',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}
                      >
                        {index + 1}
                      </Typography>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {guide.title}
                          {newlyAddedGuideId === guide.id && (
                            <Chip 
                              label="NEW" 
                              size="small" 
                              color="primary" 
                              sx={{ ml: 1, fontSize: '0.7rem' }}
                            />
                          )}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          {getStatusIcon(guide.status)}
                          <Chip 
                            label={guide.status.replace('_', ' ')}
                            size="small"
                            color={getStatusColor(guide.status) as any}
                            variant="outlined"
                            sx={{ ml: 1, textTransform: 'capitalize' }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <IconButton
                        size="small"
                        onClick={() => moveGuide(index, 'up')}
                        disabled={index === 0}
                        sx={{ 
                          mb: 0.5,
                          transform: 'rotate(180deg)',
                          opacity: index === 0 ? 0.3 : 1
                        }}
                      >
                        <DragIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => moveGuide(index, 'down')}
                        disabled={index === orderedGuides.length - 1}
                        sx={{ 
                          opacity: index === orderedGuides.length - 1 ? 0.3 : 1
                        }}
                      >
                        <DragIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
                {index < orderedGuides.length - 1 && <Divider sx={{ my: 0.5 }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            💡 <strong>Tip:</strong> Drag guides to reorder them, or use the arrow buttons. 
            The order determines how lessons appear to teachers and students.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          startIcon={<CloseIcon />}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!hasChanges()}
          sx={{
            fontWeight: 600,
          }}
        >
          Save New Order
        </Button>
      </DialogActions>
    </Dialog>
  );
} 