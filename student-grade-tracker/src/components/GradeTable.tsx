'use client';

import { useState } from 'react';
import type { Course } from '@/types';
import { getGrade } from '@/types';
import CourseForm from './CourseForm';
import ConfirmationDialog from './ConfirmationDialog';

interface Props {
  studentId: string;
  courses: Course[];
  onDeleteCourse: (courseId: string) => void;
}

export default function GradeTable({ studentId, courses, onDeleteCourse }: Props) {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm text-gray-500 dark:text-gray-400">No courses added yet</p>
        <button
          onClick={() => setShowAdd(true)}
          className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          + Add Course
        </button>
        {showAdd && <CourseForm studentId={studentId} onClose={() => setShowAdd(false)} />}
      </div>
    );
  }

  const totalScore = courses.reduce((sum, c) => sum + c.score, 0);
  const average = Math.round((totalScore / courses.length) * 100) / 100;
  const overallGrade = getGrade(average);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Course</th>
              <th className="text-left py-2 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Code</th>
              <th className="text-center py-2 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Score</th>
              <th className="text-center py-2 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Grade</th>
              <th className="text-center py-2 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Remark</th>
              <th className="text-right py-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const { grade, remarks, color } = getGrade(course.score);
              return (
                <tr key={course.id} className="border-b border-gray-100 dark:border-gray-700/50">
                  <td className="py-2.5 pr-4 text-gray-900 dark:text-white">{course.courseName}</td>
                  <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{course.courseCode}</td>
                  <td className="py-2.5 pr-4 text-center font-medium text-gray-900 dark:text-white">{course.score}</td>
                  <td className={`py-2.5 pr-4 text-center font-bold ${color}`}>{grade}</td>
                  <td className={`py-2.5 pr-4 text-center text-xs font-medium ${color}`}>{remarks}</td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                      title="Edit"
                    >
                      <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(course.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-4 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Total: <strong className="text-gray-900 dark:text-white">{totalScore}</strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Courses: <strong className="text-gray-900 dark:text-white">{courses.length}</strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Average: <strong className="text-gray-900 dark:text-white">{average}</strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Grade: <strong className={overallGrade.color}>{overallGrade.grade}</strong>
          </span>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          + Add Course
        </button>
      </div>

      {showAdd && <CourseForm studentId={studentId} onClose={() => setShowAdd(false)} />}
      {editingCourse && (
        <CourseForm studentId={studentId} course={editingCourse} onClose={() => setEditingCourse(null)} />
      )}
      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        onConfirm={() => {
          if (deleteTarget) onDeleteCourse(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
