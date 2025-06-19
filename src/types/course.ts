export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  durationRange: {
    minimum: number;
    maximum: number;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced';
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
      status: 'approved' | 'pending';
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