'use client';

import { useState } from 'react';
import type { Student } from '@/types';
import { calculateAverage, getOverallGrade } from '@/types';
import { useGrade } from '@/context/GradeContext';
import GradeTable from './GradeTable';
import StudentForm from './StudentForm';
import ConfirmationDialog from './ConfirmationDialog';

interface Props {
  student: Student;
  onDelete: (id: string) => void;
}

export default function StudentCard({ student, onDelete }: Props) {
  const { deleteCourse: contextDeleteCourse } = useGrade();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const average = calculateAverage(student.courses);
  const overallGrade = getOverallGrade(average);

  return (
    <>
      <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold shrink-0">
                  {student.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{student.fullName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{student.studentId}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
                <span>{student.department}</span>
                <span>{student.level} Level</span>
                <span className="font-medium">{student.courses.length} Course{student.courses.length !== 1 ? 's' : ''}</span>
                {student.courses.length > 0 && (
                  <span className={`font-semibold ${overallGrade.color}`}>
                    Avg: {average} ({overallGrade.grade})
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Edit student"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Delete student"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className={`p-1.5 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${expanded ? 'text-gray-600 dark:text-gray-300' : ''}`}
                title={expanded ? 'Collapse' : 'Expand'}
              >
                <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 sm:px-5 pb-4">
            <div className="pt-4">
              <GradeTable
                studentId={student.id}
                courses={student.courses}
                onDeleteCourse={(courseId) => contextDeleteCourse(student.id, courseId)}
              />
            </div>
          </div>
        )}
      </div>

      {editing && <StudentForm student={student} onClose={() => setEditing(false)} />}
      <ConfirmationDialog
        open={showDeleteConfirm}
        title="Delete Student"
        message={`Are you sure you want to delete ${student.fullName}? All their course records will also be removed.`}
        onConfirm={() => { onDelete(student.id); setShowDeleteConfirm(false); }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}
