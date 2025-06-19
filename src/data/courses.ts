import { Course } from '@/types/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Basic Addition and Subtraction',
    description: 'Learn fundamental math skills with addition and subtraction using fun activities and visual aids.',
    instructor: 'Ms. Sarah Johnson',
    duration: '4 weeks',
    durationRange: {
      minimum: 30, // 30 minutes
      maximum: 45, // 45 minutes
    },
    level: 'Beginner',
    category: 'Mathematics',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
    price: 25.00,
    rating: 4.8,
    studentsEnrolled: 150,
    tags: ['Math', 'Addition', 'Subtraction', 'Numbers'],
    textbook: {
      required: true,
      itemCode: 'MATH-101-TB',
      title: 'Elementary Mathematics Workbook Grade 1'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-1-1',
          title: 'Addition Concepts Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-1-2',
          title: 'Subtraction Concepts Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-1-3',
          title: 'Number Line Activities Guide',
          status: 'pending'
        },
        {
          id: 'guide-1-4',
          title: 'Math Games and Exercises Guide',
          status: 'pending'
        },
        {
          id: 'guide-1-5',
          title: 'Assessment and Evaluation Guide',
          status: 'approved'
        },
        {
          id: 'guide-1-6',
          title: 'Parent Homework Support Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Reading Comprehension - Grade 3',
    description: 'Improve reading skills and understanding through engaging stories and comprehension exercises.',
    instructor: 'Mrs. Emily Rodriguez',
    duration: '6 weeks',
    durationRange: {
      minimum: 40, // 40 minutes
      maximum: 60, // 60 minutes
    },
    level: 'Intermediate',
    category: 'Language Arts',
    location: 'Regional',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    price: 30.00,
    rating: 4.9,
    studentsEnrolled: 120,
    tags: ['Reading', 'Comprehension', 'Stories', 'Vocabulary'],
    textbook: {
      required: true,
      itemCode: 'LANG-301-TB',
      title: 'Reading Adventures Grade 3'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-2-1',
          title: 'Reading Strategies Teacher Guide',
          status: 'pending'
        },
        {
          id: 'guide-2-2',
          title: 'Vocabulary Building Activities Guide',
          status: 'approved'
        },
        {
          id: 'guide-2-3',
          title: 'Comprehension Questions Guide',
          status: 'pending'
        },
        {
          id: 'guide-2-4',
          title: 'Story Discussion Prompts Guide',
          status: 'pending'
        },
        {
          id: 'guide-2-5',
          title: 'Reading Assessment Rubrics Guide',
          status: 'approved'
        },
        {
          id: 'guide-2-6',
          title: 'Phonics Integration Guide',
          status: 'pending'
        },
        {
          id: 'guide-2-7',
          title: 'Creative Writing Extensions Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Introduction to Science Experiments',
    description: 'Discover the wonders of science through safe, fun experiments and observations about the natural world.',
    instructor: 'Mr. Michael Chen',
    duration: '5 weeks',
    durationRange: {
      minimum: 45, // 45 minutes
      maximum: 75, // 75 minutes
    },
    level: 'Beginner',
    category: 'Science',
    location: 'Programme',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop',
    price: 35.00,
    rating: 4.7,
    studentsEnrolled: 90,
    tags: ['Science', 'Experiments', 'Nature', 'Discovery'],
    textbook: {
      required: false
    },
    teacherGuides: {
      required: false,
      status: 'guideless'
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '4',
    title: 'Multiplication Tables - Grade 4',
    description: 'Master multiplication tables through interactive games, songs, and practice exercises.',
    instructor: 'Ms. Lisa Thompson',
    duration: '4 weeks',
    durationRange: {
      minimum: 35, // 35 minutes
      maximum: 50, // 50 minutes
    },
    level: 'Intermediate',
    category: 'Mathematics',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
    price: 28.00,
    rating: 4.8,
    studentsEnrolled: 135,
    tags: ['Math', 'Multiplication', 'Tables', 'Practice'],
    textbook: {
      required: true,
      itemCode: 'MATH-401-TB',
      title: 'Multiplication Mastery Grade 4'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-4-1',
          title: 'Multiplication Strategies Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-4-2',
          title: 'Practice Activities Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-4-3',
          title: 'Times Table Songs and Rhymes Guide',
          status: 'pending'
        },
        {
          id: 'guide-4-4',
          title: 'Visual Learning Aids Guide',
          status: 'pending'
        },
        {
          id: 'guide-4-5',
          title: 'Multiplication Games Collection Guide',
          status: 'approved'
        },
        {
          id: 'guide-4-6',
          title: 'Progress Tracking and Assessment Guide',
          status: 'pending'
        },
        {
          id: 'guide-4-7',
          title: 'Differentiated Learning Strategies Guide',
          status: 'pending'
        },
        {
          id: 'guide-4-8',
          title: 'Technology Integration Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '5',
    title: 'Creative Writing for Young Authors',
    description: 'Develop writing skills and creativity through storytelling, poetry, and journal writing activities.',
    instructor: 'Mrs. Jennifer Adams',
    duration: '6 weeks',
    durationRange: {
      minimum: 50, // 50 minutes
      maximum: 70, // 70 minutes
    },
    level: 'Intermediate',
    category: 'Language Arts',
    location: 'Regional',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    price: 32.00,
    rating: 4.6,
    studentsEnrolled: 85,
    tags: ['Writing', 'Creativity', 'Stories', 'Poetry'],
    textbook: {
      required: false
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-5-1',
          title: 'Creative Writing Techniques Teacher Guide',
          status: 'pending'
        },
        {
          id: 'guide-5-2',
          title: 'Poetry Writing Activities Guide',
          status: 'approved'
        },
        {
          id: 'guide-5-3',
          title: 'Storytelling Prompts and Ideas Guide',
          status: 'pending'
        },
        {
          id: 'guide-5-4',
          title: 'Grammar and Mechanics Guide',
          status: 'pending'
        },
        {
          id: 'guide-5-5',
          title: 'Peer Review and Editing Guide',
          status: 'pending'
        },
        {
          id: 'guide-5-6',
          title: 'Journal Writing Techniques Guide',
          status: 'approved'
        }
      ]
    },
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '6',
    title: 'World Geography - Countries and Capitals',
    description: 'Explore different countries, their capitals, cultures, and landmarks through interactive maps and activities.',
    instructor: 'Mr. David Wilson',
    duration: '5 weeks',
    durationRange: {
      minimum: 35,
      maximum: 55,
    },
    level: 'Intermediate',
    category: 'Social Studies',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    price: 30.00,
    rating: 4.9,
    studentsEnrolled: 110,
    tags: ['Geography', 'Countries', 'Capitals', 'Culture'],
    textbook: {
      required: true,
      itemCode: 'GEO-501-TB',
      title: 'World Geography Atlas Grade 5'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-6-1',
          title: 'Geography Activities Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-6-2',
          title: 'Map Reading Skills Guide',
          status: 'pending'
        },
        {
          id: 'guide-6-3',
          title: 'Cultural Studies Activities Guide',
          status: 'pending'
        },
        {
          id: 'guide-6-4',
          title: 'Country Research Projects Guide',
          status: 'approved'
        },
        {
          id: 'guide-6-5',
          title: 'Interactive Geography Games Guide',
          status: 'pending'
        },
        {
          id: 'guide-6-6',
          title: 'Virtual Field Trips Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11'
  },
  {
    id: '7',
    title: 'Art and Crafts - Painting Basics',
    description: 'Learn basic painting techniques using watercolors and create beautiful artwork through guided projects.',
    instructor: 'Ms. Rachel Green',
    duration: '4 weeks',
    durationRange: {
      minimum: 60,
      maximum: 90,
    },
    level: 'Beginner',
    category: 'Arts',
    location: 'Programme',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
    price: 25.00,
    rating: 4.7,
    studentsEnrolled: 75,
    tags: ['Art', 'Painting', 'Watercolor', 'Creativity'],
    textbook: {
      required: false
    },
    teacherGuides: {
      required: false,
      status: 'guideless'
    },
    createdAt: '2024-01-09',
    updatedAt: '2024-01-09'
  },
  {
    id: '8',
    title: 'Phonics and Letter Recognition',
    description: 'Build foundational reading skills through phonics instruction and letter recognition activities.',
    instructor: 'Mrs. Amanda Brown',
    duration: '8 weeks',
    durationRange: {
      minimum: 25,
      maximum: 40,
    },
    level: 'Beginner',
    category: 'Language Arts',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    price: 22.00,
    rating: 4.8,
    studentsEnrolled: 140,
    tags: ['Phonics', 'Letters', 'Reading', 'Sounds'],
    textbook: {
      required: true,
      itemCode: 'PHON-101-TB',
      title: 'Phonics Foundations Workbook'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-8-1',
          title: 'Phonics Instruction Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-8-2',
          title: 'Letter Recognition Activities Guide',
          status: 'approved'
        },
        {
          id: 'guide-8-3',
          title: 'Sound Blending Techniques Guide',
          status: 'pending'
        },
        {
          id: 'guide-8-4',
          title: 'Sight Words Practice Guide',
          status: 'pending'
        },
        {
          id: 'guide-8-5',
          title: 'Reading Readiness Assessment Guide',
          status: 'approved'
        },
        {
          id: 'guide-8-6',
          title: 'Alphabet Songs and Activities Guide',
          status: 'pending'
        },
        {
          id: 'guide-8-7',
          title: 'Pre-Reading Skills Development Guide',
          status: 'pending'
        },
        {
          id: 'guide-8-8',
          title: 'Parent Support Materials Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13'
  },
  {
    id: '9',
    title: 'Basic Fractions - Grade 5',
    description: 'Understand fractions through hands-on activities, visual models, and real-world applications.',
    instructor: 'Mr. Robert Kim',
    duration: '5 weeks',
    durationRange: {
      minimum: 45,
      maximum: 65,
    },
    level: 'Advanced',
    category: 'Mathematics',
    location: 'Regional',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    price: 33.00,
    rating: 4.6,
    studentsEnrolled: 95,
    tags: ['Math', 'Fractions', 'Division', 'Problem Solving'],
    textbook: {
      required: true,
      itemCode: 'MATH-501-TB',
      title: 'Fractions and Decimals Grade 5'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-9-1',
          title: 'Fraction Concepts Teacher Guide',
          status: 'pending'
        },
        {
          id: 'guide-9-2',
          title: 'Visual Fraction Models Guide',
          status: 'approved'
        },
        {
          id: 'guide-9-3',
          title: 'Fraction Addition and Subtraction Guide',
          status: 'pending'
        },
        {
          id: 'guide-9-4',
          title: 'Real-World Fraction Applications Guide',
          status: 'pending'
        },
        {
          id: 'guide-9-5',
          title: 'Comparing and Ordering Fractions Guide',
          status: 'pending'
        },
        {
          id: 'guide-9-6',
          title: 'Fraction Assessment Tools Guide',
          status: 'approved'
        },
        {
          id: 'guide-9-7',
          title: 'Remediation Strategies Guide',
          status: 'pending'
        }
      ]
    },
    createdAt: '2024-01-07',
    updatedAt: '2024-01-07'
  },
  {
    id: '10',
    title: 'Plants and Animals - Life Science',
    description: 'Explore the fascinating world of plants and animals, their habitats, and life cycles.',
    instructor: 'Dr. Maria Garcia',
    duration: '6 weeks',
    durationRange: {
      minimum: 50,
      maximum: 75,
    },
    level: 'Intermediate',
    category: 'Science',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    price: 29.00,
    rating: 4.9,
    studentsEnrolled: 105,
    tags: ['Science', 'Plants', 'Animals', 'Life Cycles'],
    textbook: {
      required: true,
      itemCode: 'SCI-401-TB',
      title: 'Life Science Explorer Grade 4'
    },
    teacherGuides: {
      required: true,
      status: 'pending',
      guides: [
        {
          id: 'guide-10-1',
          title: 'Life Science Activities Teacher Guide',
          status: 'approved'
        },
        {
          id: 'guide-10-2',
          title: 'Plant and Animal Studies Guide',
          status: 'approved'
        },
        {
          id: 'guide-10-3',
          title: 'Habitat Exploration Guide',
          status: 'pending'
        },
        {
          id: 'guide-10-4',
          title: 'Life Cycles Investigation Guide',
          status: 'pending'
        },
        {
          id: 'guide-10-5',
          title: 'Scientific Method for Young Learners Guide',
          status: 'approved'
        },
        {
          id: 'guide-10-6',
          title: 'Nature Observation Techniques Guide',
          status: 'pending'
        },
        {
          id: 'guide-10-7',
          title: 'Classification Activities Guide',
          status: 'pending'
        },
        {
          id: 'guide-10-8',
          title: 'Lab Safety for Elementary Students Guide',
          status: 'pending'
        },
        {
          id: 'guide-10-9',
          title: 'Science Journal Templates Guide',
          status: 'approved'
        }
      ]
    },
    createdAt: '2024-01-06',
    updatedAt: '2024-01-06'
  }
]; 