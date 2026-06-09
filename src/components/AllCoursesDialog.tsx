'use client';

import { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { processAllStudents } from '@/utils/grades';

interface AllCoursesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllCoursesDialog({ isOpen, onClose }: AllCoursesDialogProps) {
  const { state } = useAppContext();

  const allCourses = useMemo(() => {
    const records = processAllStudents(state.students);
    return records.flatMap((record) => record.gradedCourses)
      .sort((a, b) => b.score - a.score);
  }, [state.students]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl mx-4 w-full max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Courses</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {allCourses.length} course(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {allCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Code</th>
                  </tr>
                </thead>
                <tbody>
                  {allCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{course.courseName}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">{course.courseCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Courses Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Add students and assign courses to see them here.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
