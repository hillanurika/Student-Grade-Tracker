'use client';

import { useAppContext } from '@/context/AppContext';
import { processAllStudents } from '@/utils/grades';

export default function SearchFilter() {
  const { state, dispatch } = useAppContext();
  const processed = processAllStudents(state.students);

  const departments = Array.from(new Set(processed.map((s) => s.department))).sort();
  const levels = Array.from(new Set(processed.map((s) => s.level))).sort();

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
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
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          placeholder="Search by name or student ID..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
        />
      </div>
      <select
        value={state.filterDepartment}
        onChange={(e) => dispatch({ type: 'SET_FILTER_DEPT', payload: e.target.value })}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
      >
        <option value="">All Departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <select
        value={state.filterLevel}
        onChange={(e) => dispatch({ type: 'SET_FILTER_LEVEL', payload: e.target.value })}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
      >
        <option value="">All Levels</option>
        {levels.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  );
}
