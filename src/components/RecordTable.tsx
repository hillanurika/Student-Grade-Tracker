'use client';

import { useState } from 'react';
import { StudentRecord, Student, Course } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { getGradeBadgeClass, getScoreColor } from '@/utils/grades';
import ConfirmDialog from './ConfirmDialog';
import CourseForm from './CourseForm';
import StudentForm from './StudentForm';

interface RecordTableProps {
  records: StudentRecord[];
}

export default function RecordTable({ records }: RecordTableProps) {
  const { dispatch } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'student' | 'course'; studentId: string; courseId?: string } | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editCourse, setEditCourse] = useState<{ studentId: string; course: Course } | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);

  function handleDeleteStudent(id: string) {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
    setDeleteTarget(null);
  }

  function handleDeleteCourse(studentId: string, courseId: string) {
    dispatch({ type: 'DELETE_COURSE', payload: { studentId, courseId } });
    setDeleteTarget(null);
  }

  function toggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  if (records.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Records Found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Add students and their course scores to see records here.
        </p>
      </div>
    );
  }

  return (
    <>
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden"
        >
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            onClick={() => toggleExpand(record.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{record.fullName}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({record.studentId})</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeBadgeClass(record.overallGrade)}`}>
                    {record.overallGrade}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span>{record.department}</span>
                  <span>{record.level}</span>
                  <span>{record.courseCount} courses</span>
                  <span>Avg: <strong>{record.averageScore}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setEditStudent(record); setShowStudentForm(true); }}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit student"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setEditCourse(null); setShowCourseForm(true); }}
                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title="Add course"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'student', studentId: record.id }); }}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete student"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === record.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {expandedId === record.id && (
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="p-4">
                {record.gradedCourses.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Course Code</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Course Name</th>
                          <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Score</th>
                          <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Grade</th>
                          <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Remarks</th>
                          <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.gradedCourses.map((course) => (
                          <tr key={course.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-750">
                            <td className="py-2 px-3 text-gray-900 dark:text-white font-mono">{course.courseCode}</td>
                            <td className="py-2 px-3 text-gray-700 dark:text-gray-300">{course.courseName}</td>
                            <td className={`py-2 px-3 text-center font-semibold ${getScoreColor(course.score)}`}>{course.score}</td>
                            <td className="py-2 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getGradeBadgeClass(course.grade)}`}>
                                {course.grade}
                              </span>
                            </td>
                            <td className={`py-2 px-3 text-center ${course.remarks === 'Fail' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                              {course.remarks}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => { setEditCourse({ studentId: record.id, course }); setShowCourseForm(true); }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                  title="Edit score"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => setDeleteTarget({ type: 'course', studentId: record.id, courseId: course.id })}
                                  className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  title="Delete course"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-400 dark:text-gray-500 py-4">No courses added yet.</p>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Score: <strong className="text-gray-900 dark:text-white">{record.totalScore}</strong>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Courses: <strong className="text-gray-900 dark:text-white">{record.courseCount}</strong>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Average: <strong className="text-gray-900 dark:text-white">{record.averageScore}</strong>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Overall Grade: <strong className={`${record.overallGrade === 'F' ? 'text-red-600' : 'text-green-600'} dark:${record.overallGrade === 'F' ? 'text-red-400' : 'text-green-400'}`}>{record.overallGrade}</strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        isOpen={deleteTarget?.type === 'student' && !!deleteTarget}
        title="Delete Student"
        message="Are you sure you want to delete this student and all their course records? This action cannot be undone."
        onConfirm={() => deleteTarget && handleDeleteStudent(deleteTarget.studentId)}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        isOpen={deleteTarget?.type === 'course' && !!deleteTarget}
        title="Delete Course"
        message="Are you sure you want to delete this course record? This action cannot be undone."
        onConfirm={() => deleteTarget && handleDeleteCourse(deleteTarget.studentId, deleteTarget.courseId!)}
        onCancel={() => setDeleteTarget(null)}
      />

      {showStudentForm && editStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <div className="w-full max-w-2xl mx-4 my-8">
            <StudentForm
              editStudent={editStudent}
              onComplete={() => { setShowStudentForm(false); setEditStudent(null); }}
            />
          </div>
        </div>
      )}

      {showCourseForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <div className="w-full max-w-2xl mx-4 my-8">
            <CourseForm
              editCourse={editCourse}
              onComplete={() => { setShowCourseForm(false); setEditCourse(null); }}
            />
          </div>
        </div>
      )}
    </>
  );
}
