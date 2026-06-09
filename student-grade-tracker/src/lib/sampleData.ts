import type { Student } from '@/types';

export const sampleStudents: Student[] = [
  {
    id: 'sample-1',
    fullName: 'Okafor Chidiebere Emmanuel',
    studentId: 'UG/2021/001',
    department: 'Computer Science',
    level: '400',
    courses: [
      { id: 'c1', courseName: 'Software Engineering', courseCode: 'CSC 401', score: 72 },
      { id: 'c2', courseName: 'Data Structures', courseCode: 'CSC 302', score: 65 },
      { id: 'c3', courseName: 'Database Systems', courseCode: 'CSC 303', score: 58 },
      { id: 'c4', courseName: 'Operating Systems', courseCode: 'CSC 304', score: 48 },
    ],
  },
  {
    id: 'sample-2',
    fullName: 'Adebayo Aminat Oluwaseun',
    studentId: 'UG/2021/002',
    department: 'Computer Science',
    level: '400',
    courses: [
      { id: 'c5', courseName: 'Software Engineering', courseCode: 'CSC 401', score: 81 },
      { id: 'c6', courseName: 'Data Structures', courseCode: 'CSC 302', score: 74 },
      { id: 'c7', courseName: 'Database Systems', courseCode: 'CSC 303', score: 69 },
      { id: 'c8', courseName: 'Operating Systems', courseCode: 'CSC 304', score: 55 },
    ],
  },
  {
    id: 'sample-3',
    fullName: 'Musa Ibrahim Tanko',
    studentId: 'UG/2022/010',
    department: 'Mathematics',
    level: '300',
    courses: [
      { id: 'c9', courseName: 'Real Analysis', courseCode: 'MAT 301', score: 63 },
      { id: 'c10', courseName: 'Linear Algebra', courseCode: 'MAT 202', score: 71 },
      { id: 'c11', courseName: 'Numerical Methods', courseCode: 'MAT 303', score: 42 },
    ],
  },
  {
    id: 'sample-4',
    fullName: 'Nwachukwu Gift Chioma',
    studentId: 'UG/2022/015',
    department: 'Physics',
    level: '300',
    courses: [
      { id: 'c12', courseName: 'Quantum Mechanics', courseCode: 'PHY 301', score: 59 },
      { id: 'c13', courseName: 'Electromagnetism', courseCode: 'PHY 302', score: 66 },
      { id: 'c14', courseName: 'Thermodynamics', courseCode: 'PHY 203', score: 73 },
    ],
  },
  {
    id: 'sample-5',
    fullName: 'Eze Chinedu Prosper',
    studentId: 'UG/2023/008',
    department: 'Computer Science',
    level: '200',
    courses: [
      { id: 'c15', courseName: 'Introduction to Programming', courseCode: 'CSC 101', score: 88 },
      { id: 'c16', courseName: 'Discrete Mathematics', courseCode: 'CSC 102', score: 76 },
    ],
  },
];
