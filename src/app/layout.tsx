'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';

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
    
    // Primary page titles and major headings
    h1: {
      fontSize: '2.5rem',        // 40px
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#424242',
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2rem',        // 32px on mobile
      },
    },
    
    // Section titles and secondary headings
    h2: {
      fontSize: '2rem',          // 32px
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#424242',
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',     // 28px on mobile
      },
    },
    
    // Sub-section headings
    h3: {
      fontSize: '1.75rem',       // 28px
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#424242',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',      // 24px on mobile
      },
    },
    
    // Card titles, component headings
    h4: {
      fontSize: '1.5rem',        // 24px
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#424242',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',     // 20px on mobile
      },
    },
    
    // Course titles, content headings
    h5: {
      fontSize: '1.25rem',       // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#424242',
    },
    
    // Small headings, form section titles
    h6: {
      fontSize: '1.125rem',      // 18px
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#424242',
    },
    
    // Large subtitle text (course descriptions, section introductions)
    subtitle1: {
      fontSize: '1rem',          // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#424242',
      letterSpacing: '0.01em',
    },
    
    // Medium subtitle text (metadata labels, form labels)
    subtitle2: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#757575',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    
    // Primary body text
    body1: {
      fontSize: '1rem',          // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#424242',
      letterSpacing: '0.01em',
    },
    
    // Secondary body text, descriptions
    body2: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#757575',
      letterSpacing: '0.01em',
    },
    
    // Navigation text, button text
    button: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    
    // Small metadata, timestamps, helper text
    caption: {
      fontSize: '0.75rem',       // 12px
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#757575',
      letterSpacing: '0.03em',
    },
    
    // Labels, tags, status indicators
    overline: {
      fontSize: '0.75rem',       // 12px
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#757575',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.02em',
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
    MuiTypography: {
      styleOverrides: {
        root: {
          // Ensure consistent spacing
          '&.MuiTypography-gutterBottom': {
            marginBottom: '0.75em',
          },
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
              <Breadcrumbs />
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
} 