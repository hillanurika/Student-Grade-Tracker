export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  score: number;
}

export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  department: string;
  level: string;
  courses: Course[];
}

export interface GradeResult {
  grade: Grade;
  remarks: string;
  color: string;
}

export function getGrade(score: number): GradeResult {
  if (score >= 70) return { grade: 'A', remarks: 'Excellent', color: 'text-emerald-600 dark:text-emerald-400' };
  if (score >= 60) return { grade: 'B', remarks: 'Very Good', color: 'text-blue-600 dark:text-blue-400' };
  if (score >= 50) return { grade: 'C', remarks: 'Good', color: 'text-yellow-600 dark:text-yellow-400' };
  if (score >= 45) return { grade: 'D', remarks: 'Fair', color: 'text-orange-600 dark:text-orange-400' };
  return { grade: 'F', remarks: 'Fail', color: 'text-red-600 dark:text-red-400' };
}

export function calculateAverage(courses: Course[]): number {
  if (courses.length === 0) return 0;
  const total = courses.reduce((sum, c) => sum + c.score, 0);
  return Math.round((total / courses.length) * 100) / 100;
}

export function getOverallGrade(average: number): GradeResult {
  return getGrade(average);
}
