'use client';

import { useGrade } from '@/context/GradeContext';
import { useMemo } from 'react';

export default function SearchFilter() {
  const { students, searchQuery, setSearchQuery, filterDepartment, setFilterDepartment, filterLevel, setFilterLevel } = useGrade();

  const departments = useMemo(
    () => [...new Set(students.map((s) => s.department))].sort(),
    [students]
  );
  const levels = useMemo(
    () => [...new Set(students.map((s) => s.level))].sort(),
    [students]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or student ID..."
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <select
        value={filterDepartment}
        onChange={(e) => setFilterDepartment(e.target.value)}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      >
        <option value="">All Departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      >
        <option value="">All Levels</option>
        {levels.map((l) => (
          <option key={l} value={l}>{l} Level</option>
        ))}
      </select>
    </div>
  );
}
