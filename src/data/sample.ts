import { Student } from '@/types';

export const sampleStudents: Student[] = [
  {
    id: '1',
    studentId: 'CSC/2022/001',
    fullName: 'Oluwaseun Adebayo',
    department: 'Computer Science',
    level: '300 Level',
    courses: [
      { id: 'c1', courseName: 'Data Structures', courseCode: 'CSC 301', score: 78 },
      { id: 'c2', courseName: 'Database Systems', courseCode: 'CSC 302', score: 65 },
      { id: 'c3', courseName: 'Operating Systems', courseCode: 'CSC 303', score: 72 },
      { id: 'c4', courseName: 'Software Engineering', courseCode: 'CSC 304', score: 58 },
      { id: 'c5', courseName: 'Numerical Methods', courseCode: 'CSC 305', score: 81 },
    ],
  },
  {
    id: '2',
    studentId: 'CSC/2022/002',
    fullName: 'Aisha Mohammed',
    department: 'Computer Science',
    level: '300 Level',
    courses: [
      { id: 'c6', courseName: 'Data Structures', courseCode: 'CSC 301', score: 85 },
      { id: 'c7', courseName: 'Database Systems', courseCode: 'CSC 302', score: 90 },
      { id: 'c8', courseName: 'Operating Systems', courseCode: 'CSC 303', score: 42 },
      { id: 'c9', courseName: 'Software Engineering', courseCode: 'CSC 304', score: 67 },
    ],
  },
  {
    id: '3',
    studentId: 'MTH/2022/005',
    fullName: 'Chidi Okonkwo',
    department: 'Mathematics',
    level: '200 Level',
    courses: [
      { id: 'c10', courseName: 'Real Analysis', courseCode: 'MTH 201', score: 91 },
      { id: 'c11', courseName: 'Linear Algebra', courseCode: 'MTH 202', score: 74 },
      { id: 'c12', courseName: 'Calculus III', courseCode: 'MTH 203', score: 68 },
    ],
  },
  {
    id: '4',
    studentId: 'PHY/2022/003',
    fullName: 'Emeka Nwosu',
    department: 'Physics',
    level: '300 Level',
    courses: [
      { id: 'c13', courseName: 'Quantum Mechanics', courseCode: 'PHY 301', score: 55 },
      { id: 'c14', courseName: 'Thermodynamics', courseCode: 'PHY 302', score: 48 },
      { id: 'c15', courseName: 'Electromagnetism', courseCode: 'PHY 303', score: 39 },
      { id: 'c16', courseName: 'Optics', courseCode: 'PHY 304', score: 62 },
    ],
  },
  {
    id: '5',
    studentId: 'CHM/2022/004',
    fullName: 'Funmilayo Ogunlesi',
    department: 'Chemistry',
    level: '100 Level',
    courses: [
      { id: 'c17', courseName: 'General Chemistry', courseCode: 'CHM 101', score: 73 },
      { id: 'c18', courseName: 'Organic Chemistry', courseCode: 'CHM 102', score: 69 },
    ],
  },
];
