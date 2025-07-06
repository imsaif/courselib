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
  TextFields as TextFieldsIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, active: true, path: '/' },
  { text: 'My Courses', icon: <BookIcon />, active: false, path: '/courses' },
  { text: 'Assignments', icon: <AssignmentIcon />, active: false, path: '/assignments' },
  { text: 'Typography Demo', icon: <TextFieldsIcon />, active: false, path: '/typography-demo' },
  { text: 'Profile', icon: <PersonIcon />, active: false, path: '/profile' },
  { text: 'Settings', icon: <SettingsIcon />, active: false, path: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();

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
          <Typography variant="h6" component="div" sx={{ color: 'primary.main' }}>
            Rwanda
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: 'secondary.main', ml: 0.5 }}>
            EQUIP
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Course Library
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: '#E0E0E0' }} />
      
      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => router.push(item.path)}
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