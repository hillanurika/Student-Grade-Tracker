'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Student } from '@/types';
import { loadStudents, saveStudents } from '@/utils/storage';
import { sampleStudents } from '@/data/sample';

interface AppState {
  students: Student[];
  theme: 'light' | 'dark';
  searchQuery: string;
  filterDepartment: string;
  filterLevel: string;
  activeTab: 'dashboard' | 'students' | 'courses' | 'records';
  dataLoaded: boolean;
}

type Action =
  | { type: 'SET_STUDENTS'; payload: Student[] }
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'ADD_COURSE'; payload: { studentId: string; course: import('@/types').Course } }
  | { type: 'UPDATE_COURSE'; payload: { studentId: string; course: import('@/types').Course } }
  | { type: 'DELETE_COURSE'; payload: { studentId: string; courseId: string } }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER_DEPT'; payload: string }
  | { type: 'SET_FILTER_LEVEL'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: AppState['activeTab'] }
  | { type: 'LOAD_SAMPLE_DATA' }
  | { type: 'CLEAR_ALL' };

const initialState: AppState = {
  students: [],
  theme: 'light',
  searchQuery: '',
  filterDepartment: '',
  filterLevel: '',
  activeTab: 'dashboard',
  dataLoaded: false,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_STUDENTS':
      return { ...state, students: action.payload, dataLoaded: true };

    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };

    case 'ADD_COURSE':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.studentId
            ? { ...s, courses: [...s.courses, action.payload.course] }
            : s
        ),
      };

    case 'UPDATE_COURSE':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.studentId
            ? {
                ...s,
                courses: s.courses.map((c) =>
                  c.id === action.payload.course.id ? action.payload.course : c
                ),
              }
            : s
        ),
      };

    case 'DELETE_COURSE':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.studentId
            ? { ...s, courses: s.courses.filter((c) => c.id !== action.payload.courseId) }
            : s
        ),
      };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_FILTER_DEPT':
      return { ...state, filterDepartment: action.payload };

    case 'SET_FILTER_LEVEL':
      return { ...state, filterLevel: action.payload };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'LOAD_SAMPLE_DATA':
      return { ...state, students: sampleStudents };

    case 'CLEAR_ALL':
      return { ...state, students: [] };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const stored = loadStudents();
    if (stored.length > 0) {
      dispatch({ type: 'SET_STUDENTS', payload: stored });
    } else {
      dispatch({ type: 'SET_STUDENTS', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.dataLoaded) {
      saveStudents(state.students);
    }
  }, [state.students, state.dataLoaded]);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
