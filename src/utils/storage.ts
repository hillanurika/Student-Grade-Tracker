import { Student } from '@/types';

const STORAGE_KEY = 'student-grade-tracker-data';

export function loadStudents(): Student[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
  return [];
}

export function saveStudents(students: Student[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear data from localStorage:', error);
  }
}
