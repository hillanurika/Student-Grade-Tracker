'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Student, Course } from '@/types';
import { sampleStudents } from '@/lib/sampleData';

interface GradeContextType {
  students: Student[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterDepartment: string;
  setFilterDepartment: (d: string) => void;
  filterLevel: string;
  setFilterLevel: (l: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  addStudent: (student: Omit<Student, 'id' | 'courses'>) => void;
  updateStudent: (id: string, data: Omit<Student, 'id' | 'courses'>) => void;
  deleteStudent: (id: string) => void;
  addCourse: (studentId: string, course: Omit<Course, 'id'>) => void;
  updateCourse: (studentId: string, courseId: string, data: Omit<Course, 'id'>) => void;
  deleteCourse: (studentId: string, courseId: string) => void;
  getFilteredStudents: () => Student[];
}

const GradeContext = createContext<GradeContextType | undefined>(undefined);

const STORAGE_KEY = 'student-grade-tracker-data';
const THEME_KEY = 'student-grade-tracker-theme';

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function GradeProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage<Student[]>(STORAGE_KEY, []);
    if (saved.length > 0) {
      setStudents(saved);
    } else {
      setStudents(sampleStudents);
    }
    setDarkMode(loadFromStorage<boolean>(THEME_KEY, false));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students, loaded]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const addStudent = useCallback((data: Omit<Student, 'id' | 'courses'>) => {
    const newStudent: Student = {
      ...data,
      id: crypto.randomUUID(),
      courses: [],
    };
    setStudents((prev) => [newStudent, ...prev]);
  }, []);

  const updateStudent = useCallback((id: string, data: Omit<Student, 'id' | 'courses'>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addCourse = useCallback((studentId: string, course: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...course, id: crypto.randomUUID() };
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, courses: [...s.courses, newCourse] } : s))
    );
  }, []);

  const updateCourse = useCallback((studentId: string, courseId: string, data: Omit<Course, 'id'>) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, courses: s.courses.map((c) => (c.id === courseId ? { ...c, ...data } : c)) }
          : s
      )
    );
  }, []);

  const deleteCourse = useCallback((studentId: string, courseId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  }, []);

  const getFilteredStudents = useCallback(() => {
    return students.filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = !filterDepartment || s.department === filterDepartment;
      const matchesLevel = !filterLevel || s.level === filterLevel;
      return matchesSearch && matchesDept && matchesLevel;
    });
  }, [students, searchQuery, filterDepartment, filterLevel]);

  return (
    <GradeContext.Provider
      value={{
        students,
        searchQuery,
        setSearchQuery,
        filterDepartment,
        setFilterDepartment,
        filterLevel,
        setFilterLevel,
        darkMode,
        toggleDarkMode,
        addStudent,
        updateStudent,
        deleteStudent,
        addCourse,
        updateCourse,
        deleteCourse,
        getFilteredStudents,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
}

export function useGrade() {
  const ctx = useContext(GradeContext);
  if (!ctx) throw new Error('useGrade must be used within GradeProvider');
  return ctx;
}
