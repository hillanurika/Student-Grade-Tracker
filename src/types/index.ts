export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  score: number;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  department: string;
  level: string;
  courses: Course[];
}

export interface GradeResult {
  grade: string;
  remarks: string;
}

export interface CourseGrade extends Course {
  grade: string;
  remarks: string;
}

export interface StudentRecord extends Student {
  totalScore: number;
  courseCount: number;
  averageScore: number;
  overallGrade: string;
  gradedCourses: CourseGrade[];
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  highestScore: number;
  lowestScore: number;
  overallAverage: number;
}

export interface AppState {
  students: Student[];
  searchQuery: string;
  filterDepartment: string;
  filterLevel: string;
  theme: 'light' | 'dark';
  activeTab: 'dashboard' | 'students' | 'courses' | 'records';
}
