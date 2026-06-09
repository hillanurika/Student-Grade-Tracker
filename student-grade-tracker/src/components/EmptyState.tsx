'use client';

export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-16">
      <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No Students Yet</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first student record.</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Student
      </button>
    </div>
  );
}
