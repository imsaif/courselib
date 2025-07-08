# Course Library Project - Context & Memory Bank

## Project Overview

**Project Name:** Course Library  
**Version:** 1.0.0  
**Description:** Rwanda EQUIP Course Library MVP - A modern course management and teacher guide approval system prototype

---

## Application Architecture

### Technology Stack
- **Frontend:** Next.js 14 with TypeScript
- **Styling:** Material-UI (MUI) v5
- **Language:** TypeScript with React 18
- **Development:** Cursor editor with AI assistance

### Project Structure
```
course-library/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── course/[id]/       # Dynamic course pages
│   │   │   ├── guide/[guideId]/  # Guide-specific pages
│   │   │   ├── lesson/[lessonId]/ # Lesson-specific pages
│   │   │   └── page.tsx       # Course detail page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── typography-demo/   # Typography demonstration
│   │   └── upload-lesson/     # Lesson upload functionality
│   ├── components/            # Reusable components
│   │   ├── Breadcrumbs.tsx
│   │   ├── FirstTimeGuideUpload.tsx
│   │   ├── Sidebar.tsx
│   │   └── TypographyDemo.tsx
│   ├── data/                  # Data layer
│   │   └── courses.ts
│   └── types/                 # TypeScript definitions
│       ├── course.ts
│       └── mui.d.ts
├── scripts/                   # Project documentation
│   ├── example_prd.txt
│   ├── mvp_prd.txt
│   └── prd.txt
└── tasks/                     # Task management
```

---

## Current Features Implemented

### Core Functionality
1. **Course Management System**
   - Course listing and detail views
   - Dynamic routing for courses (`/course/[id]`)
   - Course data structure with TypeScript typing

2. **Guide Management**
   - Guide-specific pages (`/course/[id]/guide/[guideId]`)
   - Guide upload functionality
   - First-time guide upload component

3. **Lesson Management**
   - Lesson-specific routing (`/course/[id]/lesson/[lessonId]`)
   - Lesson upload functionality
   - Lesson data integration

4. **User Interface Components**
   - **Sidebar Navigation:** Course and guide navigation
   - **Breadcrumbs:** Hierarchical navigation
   - **Typography Demo:** MUI typography showcase
   - **Upload Components:** File upload interfaces

### Technical Features
- **TypeScript Integration:** Full type safety
- **Material-UI Theming:** Custom styling system
- **Responsive Design:** Mobile-friendly layouts
- **Dynamic Routing:** Next.js app router
- **Component Architecture:** Modular, reusable components

---

## Data Structure

### Course Type Definition
```typescript
// From src/types/course.ts
interface Course {
  id: string;
  title: string;
  description: string;
  guides: Guide[];
  lessons: Lesson[];
  // Additional course properties
}
```

### Current Data
- Sample course data in `src/data/courses.ts`
- Static data structure (ready for API integration)
- Type-safe data handling

---

## Development Status

### Completed Components
- ✅ Basic project structure
- ✅ Next.js 14 setup with TypeScript
- ✅ Material-UI integration
- ✅ Dynamic routing system
- ✅ Core navigation components
- ✅ Upload functionality framework
- ✅ Typography system implementation

### Current State
- **Development Server:** Running on port 3001
- **Build Status:** Functional with hot reloading
- **Components:** Modular and reusable
- **Routing:** Dynamic course/guide/lesson navigation
- **Styling:** Material-UI based design system

---

## AI Integration & Project Management

### Taskmaster AI Configuration
- **Primary Model:** Claude 3.5 Sonnet (Anthropic)
- **Research Model:** Sonar Pro (Perplexity) 
- **Task Management:** Integrated with development workflow
- **Configuration:** `.taskmasterconfig` with custom settings

### Development Workflow
- AI-assisted development with Cursor editor
- Taskmaster for project planning and task management
- Git version control with regular commits
- Component-based development approach

---

## Key Implementation Details

### Typography System
- Custom typography implementation
- Material-UI theme integration
- Responsive font sizing
- Comprehensive type hierarchy

### Navigation System
- Hierarchical breadcrumb navigation
- Sidebar with course/guide structure
- Dynamic route handling
- User-friendly navigation patterns

### Upload System
- First-time guide upload flow
- Lesson upload functionality
- File handling capabilities
- User guidance and feedback

---

## Known Issues & Considerations

### Development Issues
- **Webpack Cache:** Occasional caching failures
- **Port Conflicts:** Default port 3000 occupied
- **File Permissions:** Some EPERM errors in .next directory

### Performance Notes
- Initial compilation: ~16.5s for 1428 modules
- Hot reload: 3-6s typical recompilation
- Build optimization needed for production

---

## Next Steps & Future Development

### Immediate Priorities
1. **Database Integration:** Replace static data with API
2. **User Authentication:** Implement user management
3. **File Upload:** Complete upload functionality
4. **State Management:** Add proper state handling

### Long-term Goals
1. **API Development:** Backend service integration
2. **User Roles:** Teacher, admin, student permissions
3. **Content Management:** Full CRUD operations
4. **Deployment:** Production environment setup

---

## Project Dependencies

### Core Dependencies
```json
{
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0", 
  "@mui/icons-material": "^5.15.1",
  "@mui/lab": "^5.0.0-alpha.170",
  "@mui/material": "^5.15.1",
  "@mui/system": "^5.15.1",
  "next": "^14.0.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.10.5",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18",
  "eslint": "^8.56.0",
  "eslint-config-next": "^14.0.4",
  "typescript": "^5.3.3"
}
```

---

## Migration Memory Points

### Critical Files to Preserve
- `.taskmasterconfig` - AI configuration
- `src/` directory - Complete application code
- `package.json` - Dependencies and scripts
- `scripts/` directory - Project documentation
- `tasks/` directory - Task management files
- Configuration files (tsconfig, next.config, etc.)

### Environment Setup
- Node.js v22.11.0 requirement
- Global npm packages for development tools
- AI API keys for Taskmaster integration
- Development server configuration

**Last Updated:** December 2024  
**Status:** Active Development - MVP Phase 