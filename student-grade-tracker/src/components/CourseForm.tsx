'use client';

import { useState } from 'react';
import { useGrade } from '@/context/GradeContext';
import type { Course } from '@/types';

interface Props {
  studentId: string;
  course?: Course;
  onClose: () => void;
}

export default function CourseForm({ studentId, course, onClose }: Props) {
  const { addCourse, updateCourse } = useGrade();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    courseName: course?.courseName ?? '',
    courseCode: course?.courseCode ?? '',
    score: course?.score?.toString() ?? '',
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.courseName.trim()) errs.courseName = 'Course name is required';
    if (!form.courseCode.trim()) errs.courseCode = 'Course code is required';
    const score = Number(form.score);
    if (form.score === '' || isNaN(score)) errs.score = 'Score is required';
    else if (score < 0 || score > 100) errs.score = 'Score must be between 0 and 100';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const data = { courseName: form.courseName.trim(), courseCode: form.courseCode.trim(), score: Number(form.score) };
    if (course) {
      updateCourse(studentId, course.id, data);
    } else {
      addCourse(studentId, data);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {course ? 'Edit Course' : 'Add Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name</label>
            <input
              type="text"
              value={form.courseName}
              onChange={(e) => setForm({ ...form, courseName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. Software Engineering"
            />
            {errors.courseName && <p className="mt-1 text-xs text-red-500">{errors.courseName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
            <input
              type="text"
              value={form.courseCode}
              onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. CSC 401"
            />
            {errors.courseCode && <p className="mt-1 text-xs text-red-500">{errors.courseCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Score (0–100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. 75"
            />
            {errors.score && <p className="mt-1 text-xs text-red-500">{errors.score}</p>}
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
              {course ? 'Update' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
