export interface Course {
  id: string;
  title: string;
  description?: string; // Optional for MVP - not displayed in UI
  instructor: string;
  duration: string;
  durationRange: {
    minimum: number;
    maximum: number;
  };
  level: 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6';
  category: string;
  location: 'Global' | 'Regional' | 'Programme';
  imageUrl: string;
  price: number;
  rating: number;
  studentsEnrolled: number;
  tags: string[];
  textbook?: {
    required: boolean;
    itemCode?: string;
    title?: string;
  };
  teacherGuides: {
    required: boolean;
    status: 'approved' | 'pending' | 'guideless';
    guides?: {
      id: string;
      title: string;
      status: 'approved' | 'pending' | 'revision_requested' | 'resubmitted';
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  search?: string;
}

// New simplified teacher guide types
export interface TeacherGuideActivity {
  title: string;
  duration: string; // e.g., "2 Minutes"
  content: string[]; // Array of instructional text with signals
}

export interface TeacherGuideLesson {
  identifier: string; // e.g., "Mathematics_P1L1"
  goal: string; // Main learning objective
  activities: TeacherGuideActivity[];
}

export interface TeacherGuideDetails {
  id: string;
  title: string;
  status: 'approved' | 'pending' | 'revision_requested' | 'resubmitted';
  courseName: string;
  description: string;
  author: string;
  version: string;
  lastModified: string;
  fileSize: string;
  pages: number;
  lesson: TeacherGuideLesson; // Single lesson per guide
  detailedHistory: HistoryEntry[];
  // Simple revision linking (MVP approach)
  relatedGuideId?: string;
  relatedGuideTitle?: string;
  relatedGuideStatus?: 'approved' | 'pending' | 'revision_requested' | 'resubmitted';
  revisionReason?: string;
  isRevision?: boolean; // This is the revised version
  isOriginal?: boolean; // This is the original that was rejected
}



export interface HistoryEntry {
  id: string;
  action: 'created' | 'edited' | 'shared' | 'commented' | 'submitted' | 'reviewed' | 'approved' | 'resubmitted' | 'revised';
  type: 'document' | 'content' | 'collaboration' | 'review' | 'workflow' | 'revision';
  date: string;
  time: string;
  user: string;
  role: string;
  avatar: string;
  comment: string;
  changes: string[];
  version: string;
  status: 'draft' | 'pending' | 'revision_requested' | 'approved' | 'resubmitted';
  // New fields for revision workflow
  isRevisionCycle?: boolean;
  previousVersion?: string;
  rejectionReason?: string;
  changesSummary?: ChangesSummary;
} 