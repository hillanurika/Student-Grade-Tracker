'use client';

import { useState } from 'react';
import { useGrade } from '@/context/GradeContext';
import type { Student } from '@/types';

interface Props {
  student?: Student;
  onClose: () => void;
}

const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Economics',
  'Accounting',
  'Business Administration',
  'Mass Communication',
  'Law',
  'Medicine',
];

const levels = ['100', '200', '300', '400', '500', '600'];

export default function StudentForm({ student, onClose }: Props) {
  const { addStudent, updateStudent } = useGrade();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: student?.fullName ?? '',
    studentId: student?.studentId ?? '',
    department: student?.department ?? departments[0],
    level: student?.level ?? levels[0],
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.studentId.trim()) errs.studentId = 'Student ID is required';
    if (!form.department) errs.department = 'Department is required';
    if (!form.level) errs.level = 'Level is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (student) {
      updateStudent(student.id, form);
    } else {
      addStudent(form);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. Okafor Chidiebere Emmanuel"
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
            <input
              type="text"
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. UG/2021/001"
            />
            {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l} Level</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {student ? 'Update' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
