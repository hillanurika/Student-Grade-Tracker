'use client';

import { useGrade } from '@/context/GradeContext';
import { calculateAverage } from '@/types';

export default function DashboardStats() {
  const { students } = useGrade();

  const allCourses = students.flatMap((s) => s.courses);
  const totalStudents = students.length;
  const totalCourses = allCourses.length;
  const scores = allCourses.map((c) => c.score);
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
  const overallAverage =
    scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100
      : 0;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      label: 'Total Courses',
      value: totalCourses,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-emerald-500',
    },
    {
      label: 'Highest Score',
      value: highestScore,
      suffix: '',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'bg-purple-500',
    },
    {
      label: 'Lowest Score',
      value: lowestScore,
      suffix: '',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      color: 'bg-rose-500',
    },
    {
      label: 'Overall Average',
      value: overallAverage,
      suffix: '',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value}{stat.suffix ?? ''}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
