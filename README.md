# Course Library MVP - Rwanda EQUIP

A modern web-based course library management system designed for educational institutions in Rwanda, specifically for the Rwanda EQUIP program. This application provides course browsing, teacher guide management, and approval workflows for educational content.

## 🚀 Project Status

**Current Phase**: MVP Prototype Development  
**Completion**: ~70% functional prototype ready for demonstration  
**Next Phase**: Approver dashboard and review workflow  

### ✅ Completed Features
- **Course Library Interface**: Complete browsing with filtering and search
- **Course Detail Views**: Individual course pages with guide status tracking  
- **Guide Upload Workflow**: Multi-step form for submitting teacher guides
- **Responsive Design**: Mobile and desktop optimized interface
- **Mock Data System**: Comprehensive course and guide data for demonstration

### 🔄 In Progress
- **Approver Dashboard**: Interface for reviewing and managing guide approvals
- **Guide Review Interface**: Individual guide approval/rejection workflow

### ⏳ Planned
- **Status Management**: Update and track guide approval statuses
- **Workflow Integration**: Complete end-to-end upload → review → approval process

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion (CSS-in-JS)
- **Development**: TypeScript for type safety
- **Architecture**: Client-side prototype with mock data

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation & Setup

```bash
# Clone the repository
git clone [repository-url]
cd course-library

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Application Features

### Course Discovery & Browsing
- **Advanced Filtering**: Filter by category, grade level, search terms
- **Pagination**: Navigate through large course catalogs
- **Course Cards**: Visual course information with status indicators
- **Search**: Real-time search across course titles, descriptions, and instructors

### Course Management
- **Course Details**: Comprehensive course information pages
- **Teacher Guide Status**: Visual indicators for guide approval status
- **Duration & Requirements**: Textbook requirements and lesson duration info
- **Navigation**: Breadcrumb navigation and responsive sidebar

### Guide Upload System
- **Multi-Step Form**: Structured guide submission process
  1. Basic Information
  2. Course Selection  
  3. Content Structure
  4. Lessons & Activities
  5. File Upload
  6. Review & Submit
- **Validation**: Form validation at each step
- **File Handling**: Upload interface with progress tracking

### Dashboard & Analytics
- **Statistics Cards**: Total courses, available courses, pending guides
- **Status Overview**: Quick view of system-wide metrics
- **Course Distribution**: Visual breakdown by categories and levels

## 🗂️ Project Structure

```
course-library/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── course/[id]/       # Dynamic course detail pages
│   │   ├── upload-guide/      # Guide upload workflow
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Dashboard/home page
│   ├── components/            # Reusable UI components
│   │   ├── Breadcrumbs.tsx   # Navigation breadcrumbs
│   │   └── Sidebar.tsx       # Application sidebar
│   ├── data/                  # Mock data and static content
│   │   └── courses.ts         # Course and guide mock data
│   └── types/                 # TypeScript type definitions
│       ├── course.ts          # Course and guide interfaces
│       └── mui.d.ts           # Material-UI theme extensions
├── tasks/                     # Task management (Taskmaster)
├── scripts/                   # Project documentation
│   ├── mvp_prd.txt           # MVP Product Requirements Document
│   └── prd.txt               # Original PRD (archived)
└── package.json              # Dependencies and scripts
```

## 🎯 Key Demo Scenarios

### 1. Course Discovery Workflow
1. **Browse Courses**: Start at dashboard to see course overview
2. **Filter & Search**: Use category filters and search functionality
3. **View Details**: Click on courses to see detailed information
4. **Guide Status**: Observe teacher guide approval indicators

### 2. Guide Upload Workflow  
1. **Upload Guide**: Click "Upload Guide" in sidebar
2. **Complete Form**: Follow multi-step submission process
3. **File Upload**: Attach teacher guide files
4. **Submit**: Complete submission for approval

### 3. Approval Management (In Development)
1. **Approver Dashboard**: Review pending guide submissions
2. **Individual Review**: Examine specific guide content
3. **Approve/Reject**: Make approval decisions with feedback
4. **Status Updates**: Track changes across the system

## 📊 Mock Data

The application includes comprehensive mock data to demonstrate functionality:

- **15+ Courses**: Covering Mathematics, Language Arts, Science, Social Studies, Arts
- **Grade Levels**: Grade 1-6 course content
- **Guide Status**: Examples of pending, approved, and rejected guides
- **Course Types**: Global, Regional, and Programme-specific courses
- **Rich Metadata**: Textbook requirements, duration ranges, instructor details

## 🎨 Design System

- **Material Design**: Following Material-UI design principles
- **Rwanda EQUIP Branding**: Custom theme with brand colors and typography
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG compliant interface elements

## 🔧 Development Notes

### Current Architecture
- **Client-Side Only**: No backend required for prototype demonstration
- **Mock Data Integration**: Using static TypeScript data files
- **State Management**: Local component state with React hooks
- **Routing**: Next.js App Router for page navigation

### Future Integration Points
- **Authentication**: Ready for JWT-based role management
- **API Integration**: Prepared for backend service integration
- **File Storage**: Upload handling ready for cloud storage integration
- **External Systems**: Structured for Scheduler and Xyleme integration

## 📋 MVP Requirements Completion

| Feature | Status | Notes |
|---------|--------|-------|
| Course Browsing | ✅ Complete | Full filtering, search, pagination |
| Course Details | ✅ Complete | Individual course pages with metadata |
| Guide Upload | ✅ UI Complete | Multi-step form ready |
| Approval Dashboard | 🔄 In Progress | Approver interface being built |
| Guide Review | ⏳ Planned | Individual guide approval workflow |
| Status Management | ⏳ Planned | Guide status updates and tracking |
| Role-Based Access | 🚫 Deferred | Simplified for prototype demo |
| External Integration | 🚫 Deferred | Post-MVP production feature |

## 🚀 Next Development Steps

### Immediate Priorities
1. **Complete Approver Dashboard** - Interface for managing guide approvals
2. **Build Guide Review Interface** - Individual guide approval workflow
3. **Implement Status Updates** - Track guide status changes
4. **Connect Workflows** - End-to-end upload → approval demonstration

### Post-MVP Evolution
- Authentication and role-based access control
- Backend API integration for data persistence
- Real-time notifications and email alerts
- External system integration (Scheduler, Xyleme)
- Advanced analytics and reporting capabilities

## 📞 Contact & Support

For questions about the Course Library MVP or development support, please refer to the project documentation in the `scripts/` directory or contact the development team.

## 📄 License

[License information to be added]

---

**Rwanda EQUIP Course Library** - Empowering education through technology 