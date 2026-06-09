import { Course, CourseGrade, GradeResult, StudentRecord, Student, DashboardStats } from '@/types';

export function calculateGrade(score: number): GradeResult {
  if (score >= 70) return { grade: 'A', remarks: 'Excellent' };
  if (score >= 60) return { grade: 'B', remarks: 'Very Good' };
  if (score >= 50) return { grade: 'C', remarks: 'Good' };
  if (score >= 45) return { grade: 'D', remarks: 'Fair' };
  return { grade: 'F', remarks: 'Fail' };
}

export function getGradePoint(grade: string): number {
  switch (grade) {
    case 'A': return 5;
    case 'B': return 4;
    case 'C': return 3;
    case 'D': return 2;
    case 'F': return 0;
    default: return 0;
  }
}

export function getAverageGrade(average: number): string {
  return calculateGrade(average).grade;
}

export function processStudentCourses(student: Student): StudentRecord {
  const gradedCourses: CourseGrade[] = student.courses.map((course) => {
    const { grade, remarks } = calculateGrade(course.score);
    return { ...course, grade, remarks };
  });

  const totalScore = student.courses.reduce((sum, c) => sum + c.score, 0);
  const courseCount = student.courses.length;
  const averageScore = courseCount > 0 ? Math.round((totalScore / courseCount) * 100) / 100 : 0;
  const overallGrade = getAverageGrade(averageScore);

  return {
    ...student,
    totalScore,
    courseCount,
    averageScore,
    overallGrade,
    gradedCourses,
  };
}

export function processAllStudents(students: Student[]): StudentRecord[] {
  return students.map(processStudentCourses);
}

export function computeDashboardStats(students: Student[]): DashboardStats {
  const processed = processAllStudents(students);
  const allCourses = processed.flatMap((s) => s.gradedCourses);
  const allScores = allCourses.map((c) => c.score);
  const courseCounts = processed.map((s) => s.courseCount);

  const totalStudents = processed.length;
  const totalCourses = courseCounts.reduce((a, b) => a + b, 0);
  const highestScore = allScores.length > 0 ? Math.max(...allScores) : 0;
  const lowestScore = allScores.length > 0 ? Math.min(...allScores) : 0;
  const totalAverage = processed.length > 0
    ? Math.round((processed.reduce((sum, s) => sum + s.averageScore, 0) / processed.length) * 100) / 100
    : 0;

  return { totalStudents, totalCourses, highestScore, lowestScore, overallAverage: totalAverage };
}

export function formatScore(score: number): string {
  return score.toFixed(2);
}

export function getScoreColor(score: number): string {
  if (score >= 70) return 'text-green-600 dark:text-green-400';
  if (score >= 60) return 'text-blue-600 dark:text-blue-400';
  if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
  if (score >= 45) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

export function getGradeBadgeClass(grade: string): string {
  switch (grade) {
    case 'A': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'B': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'C': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'D': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'F': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}
