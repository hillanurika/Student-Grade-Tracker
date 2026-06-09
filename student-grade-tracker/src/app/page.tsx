'use client';

import { useState } from 'react';
import { useGrade } from '@/context/GradeContext';
import DashboardStats from '@/components/DashboardStats';
import StudentCard from '@/components/StudentCard';
import StudentForm from '@/components/StudentForm';
import SearchFilter from '@/components/SearchFilter';
import ExportButtons from '@/components/ExportButtons';
import ThemeToggle from '@/components/ThemeToggle';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const { students, getFilteredStudents, deleteStudent } = useGrade();
  const [showStudentForm, setShowStudentForm] = useState(false);

  const filteredStudents = getFilteredStudents();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Grade Tracker</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Student Result Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ExportButtons />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 no-print">
          <div className="flex-1">
            <SearchFilter />
          </div>
          <button
            onClick={() => setShowStudentForm(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        </div>

        {/* Students List */}
        {students.length === 0 ? (
          <EmptyState onAdd={() => setShowStudentForm(true)} />
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">No Matches Found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Showing {filteredStudents.length} of {students.length} student{students.length !== 1 ? 's' : ''}
            </p>
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 dark:text-gray-600 no-print">
        Student Grade Tracker &copy; {new Date().getFullYear()}
      </footer>

      {/* Add Student Modal */}
      {showStudentForm && <StudentForm onClose={() => setShowStudentForm(false)} />}
    </div>
  );
}
