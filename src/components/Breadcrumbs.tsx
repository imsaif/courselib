'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { NavigateNext as NavigateNextIcon, Home as HomeIcon } from '@mui/icons-material';
import { courses } from '@/data/courses';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        href: '/',
      }
    ];

    if (pathSegments.length === 0) {
      // We're on the dashboard
      items[0].isCurrentPage = true;
      return items;
    }

    // Handle different routes
    if (pathSegments[0] === 'upload-guide') {
      items.push({
        label: 'Upload Guide',
        isCurrentPage: true,
      });
    } else if (pathSegments[0] === 'course' && pathSegments[1]) {
      const courseId = pathSegments[1];
      const course = courses.find(c => c.id === courseId);
      const courseName = course ? course.title : `Course ${courseId}`;

      items.push({
        label: courseName,
        href: `/course/${courseId}`,
      });

      if (pathSegments[2] === 'guide' && pathSegments[3]) {
        const guideId = pathSegments[3];
        const guide = course?.teacherGuides?.guides?.find(g => g.id === guideId);
        const guideName = guide ? guide.title : `Guide ${guideId}`;

        items.push({
          label: guideName,
          isCurrentPage: true,
        });
      } else if (pathSegments.length === 2) {
        // We're on the course details page
        items[items.length - 1].isCurrentPage = true;
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1 && breadcrumbItems[0]?.isCurrentPage) {
    // Don't show breadcrumbs on the dashboard
    return null;
  }

  const handleBreadcrumbClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary',
          },
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isHome = index === 0;

          if (item.isCurrentPage || isLast) {
            return (
              <Typography
                key={index}
                variant="button"
                color="text.primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isHome && <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />}
                {item.label}
              </Typography>
            );
          }

          return (
                          <Link
                key={index}
                underline="hover"
                color="inherit"
                onClick={() => item.href && handleBreadcrumbClick(item.href)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {isHome && <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />}
                {item.label}
              </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
} 