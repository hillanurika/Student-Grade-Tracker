'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { processAllStudents } from '@/utils/grades';
import { sampleStudents } from '@/data/sample';
import { clearAllData } from '@/utils/storage';
import { exportToPDF, exportToExcel, printRecords } from '@/utils/export';
import DashboardStats from '@/components/DashboardStats';
import StudentForm from '@/components/StudentForm';
import CourseForm from '@/components/CourseForm';
import SearchFilter from '@/components/SearchFilter';
import RecordTable from '@/components/RecordTable';
import ThemeToggle from '@/components/ThemeToggle';
import ConfirmDialog from '@/components/ConfirmDialog';
import AllCoursesDialog from '@/components/AllCoursesDialog';

export default function Home() {
  const { state, dispatch } = useAppContext();
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showAllCoursesDialog, setShowAllCoursesDialog] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLoadConfirm, setShowLoadConfirm] = useState(false);

  const records = useMemo(() => {
    let filtered = processAllStudents(state.students);

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      );
    }

    if (state.filterDepartment) {
      filtered = filtered.filter((s) => s.department === state.filterDepartment);
    }

    if (state.filterLevel) {
      filtered = filtered.filter((s) => s.level === state.filterLevel);
    }

    return filtered;
  }, [state.students, state.searchQuery, state.filterDepartment, state.filterLevel]);

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'students' as const, label: 'Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
    { id: 'courses' as const, label: 'Courses', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { id: 'records' as const, label: 'Records', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  const currentTab = state.activeTab;

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">GradeTracker</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Academic Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentTab === 'records' && state.students.length > 0 && (
                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={() => exportToPDF(records)}
                    className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => exportToExcel(records)}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => printRecords(records)}
                    className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Print
                  </button>
                </div>
              )}

              <div className="hidden sm:flex items-center gap-1">
                {state.students.length === 0 && (
                  <button
                    onClick={() => setShowLoadConfirm(true)}
                    className="px-3 py-1.5 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Load Sample
                  </button>
                )}
                {state.students.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <ThemeToggle />
            </div>
          </div>

          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {state.students.length > 0
                    ? `${state.students.length} student(s) enrolled`
                    : 'No students enrolled yet'}
                </p>
              </div>
              {state.students.length === 0 && (
                <button
                  onClick={() => setShowLoadConfirm(true)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium sm:hidden"
                >
                  Load Sample Data
                </button>
              )}
            </div>
            <DashboardStats />

            {state.students.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to GradeTracker</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Get started by adding a new student or loading sample data to explore the system.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => { dispatch({ type: 'SET_ACTIVE_TAB', payload: 'students' }); setShowStudentForm(true); }}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add First Student
                  </button>
                  <button
                    onClick={() => { dispatch({ type: 'LOAD_SAMPLE_DATA' }); }}
                    className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Load Sample Data
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => { dispatch({ type: 'SET_ACTIVE_TAB', payload: 'students' }); setShowStudentForm(true); }}
                      className="w-full text-left px-4 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
                    >
                      + Add New Student
                    </button>
                    <button
                      onClick={() => { dispatch({ type: 'SET_ACTIVE_TAB', payload: 'courses' }); setShowCourseForm(true); }}
                      className="w-full text-left px-4 py-2.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium"
                    >
                      + Add Course Score
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'records' })}
                      className="w-full text-left px-4 py-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm font-medium"
                    >
                      View All Records
                    </button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Stats</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {state.students.length} student(s) • {state.students.reduce((a, s) => a + s.courses.length, 0)} course(s)
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from(new Set(state.students.map((s) => s.department))).map((d) => (
                      <span key={d} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {currentTab === 'students' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage student records</p>
              </div>
              <button
                onClick={() => setShowStudentForm(!showStudentForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showStudentForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'} />
                </svg>
                {showStudentForm ? 'Close Form' : 'Add Student'}
              </button>
            </div>

            {showStudentForm && (
              <div className="mb-6">
                <StudentForm onComplete={() => setShowStudentForm(false)} />
              </div>
            )}

            <SearchFilter />

            {records.length > 0 ? (
              <div className="space-y-3">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                            {record.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{record.fullName}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{record.studentId} • {record.department} • {record.level}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{record.courseCount} courses</span>
                      <button
                        onClick={() => { setShowStudentForm(true); }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Students Found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {state.searchQuery || state.filterDepartment || state.filterLevel
                    ? 'Try adjusting your search or filters'
                    : 'Click "Add Student" to get started'}
                </p>
              </div>
            )}
          </>
        )}

        {currentTab === 'courses' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Scores</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage course scores for students</p>
              </div>
              <div className="flex items-center gap-2">
                {state.students.length > 0 && (
                  <button
                    onClick={() => setShowAllCoursesDialog(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    View All Courses
                  </button>
                )}
                <button
                  onClick={() => setShowCourseForm(!showCourseForm)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCourseForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'} />
                  </svg>
                  {showCourseForm ? 'Close Form' : 'Add Course'}
                </button>
              </div>
            </div>

            {showCourseForm && (
              <div className="mb-6">
                <CourseForm onComplete={() => setShowCourseForm(false)} />
              </div>
            )}

            {records.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Student</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Department</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Courses</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Average</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Grade</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record) => (
                        <tr key={record.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{record.fullName}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">{record.studentId}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{record.department}</td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white">{record.courseCount}</td>
                          <td className="py-3 px-4 text-center font-semibold text-gray-900 dark:text-white">{record.averageScore}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${record.overallGrade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : record.overallGrade === 'B' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : record.overallGrade === 'C' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : record.overallGrade === 'D' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                              {record.overallGrade}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'records' })}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-xs font-medium"
                            >
                              View Scores
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Course Data</h3>
                <p className="text-gray-500 dark:text-gray-400">Add students and assign courses to see data here.</p>
              </div>
            )}
          </>
        )}

        {currentTab === 'records' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Records</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">View and manage all student results</p>
              </div>
              {state.students.length > 0 && (
                <div className="flex items-center gap-2 sm:hidden">
                  <button
                    onClick={() => exportToPDF(records)}
                    className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => exportToExcel(records)}
                    className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => printRecords(records)}
                    className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Print
                  </button>
                </div>
              )}
            </div>

            <SearchFilter />
            <RecordTable records={records} />
          </>
        )}
      </main>

      <AllCoursesDialog
        isOpen={showAllCoursesDialog}
        onClose={() => setShowAllCoursesDialog(false)}
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear All Data"
        message="This will permanently delete all student records, courses, and scores. This action cannot be undone."
        onConfirm={() => { clearAllData(); dispatch({ type: 'CLEAR_ALL' }); setShowClearConfirm(false); }}
        onCancel={() => setShowClearConfirm(false)}
        confirmText="Clear All"
      />

      <ConfirmDialog
        isOpen={showLoadConfirm}
        title="Load Sample Data"
        message="This will add sample student data with courses and scores for testing. Your existing data will remain if any."
        onConfirm={() => { dispatch({ type: 'LOAD_SAMPLE_DATA' }); setShowLoadConfirm(false); }}
        onCancel={() => setShowLoadConfirm(false)}
        confirmText="Load Sample"
      />
    </div>
  );
}
