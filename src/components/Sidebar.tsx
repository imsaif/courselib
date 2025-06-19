'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Button } from '@mui/material';
import { 
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, active: true },
  { text: 'My Courses', icon: <BookIcon />, active: false },
  { text: 'Assignments', icon: <AssignmentIcon />, active: false },
  { text: 'Profile', icon: <PersonIcon />, active: false },
  { text: 'Settings', icon: <SettingsIcon />, active: false },
];

export default function Sidebar() {
  const router = useRouter();

  const handleUploadGuide = () => {
    router.push('/upload-guide');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#EEEEEE', // Light gray sidebar
          color: '#424242',
          borderRight: '1px solid #E0E0E0',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Rwanda
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'secondary.main', ml: 0.5 }}>
            EQUIP
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Course Library
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: '#E0E0E0' }} />
      
      {/* Upload Guide Button */}
      <Box sx={{ px: 2, py: 2 }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          fullWidth
          onClick={handleUploadGuide}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 600,
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            boxShadow: '0 2px 8px 0 rgba(25,118,210,0.3)',
          }}
        >
          Upload Guide
        </Button>
      </Box>
      
      <Divider sx={{ borderColor: '#E0E0E0' }} />
      
      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              mb: 1,
              borderRadius: 2,
              bgcolor: item.active ? 'rgba(25,118,210,0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(25,118,210,0.05)',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: item.active ? 600 : 400,
                color: item.active ? 'primary.main' : 'text.primary',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 