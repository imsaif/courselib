'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Royal Blue
      light: '#42A5F5',
      dark: '#1565C0',
    },
    secondary: {
      main: '#4CAF50', // AIP Green
      light: '#66BB6A',
      dark: '#388E3C',
    },
    background: {
      default: '#FAFAFA', // Light background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#424242',
      secondary: '#757575',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB74D',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
    },
    success: {
      main: '#4CAF50',
      light: '#66BB6A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#424242',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#424242',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#424242',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const DRAWER_WIDTH = 280;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                minHeight: '100vh',
                bgcolor: 'background.default',
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
} 