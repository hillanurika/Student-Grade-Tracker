'use client';

import { useState, useEffect } from 'react';
import { Student, Course } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { processAllStudents } from '@/utils/grades';

interface CourseFormProps {
  editCourse?: { studentId: string; course: Course } | null;
  onComplete?: () => void;
}

export default function CourseForm({ editCourse, onComplete }: CourseFormProps) {
  const { state, dispatch } = useAppContext();
  const processed = processAllStudents(state.students);

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    score: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editCourse) {
      setSelectedStudentId(editCourse.studentId);
      setFormData({
        courseName: editCourse.course.courseName,
        courseCode: editCourse.course.courseCode,
        score: editCourse.course.score.toString(),
      });
    }
  }, [editCourse]);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!selectedStudentId) newErrors.student = 'Please select a student';
    if (!formData.courseName.trim()) newErrors.courseName = 'Course name is required';
    if (!formData.courseCode.trim()) newErrors.courseCode = 'Course code is required';

    const scoreNum = Number(formData.score);
    if (formData.score === '') {
      newErrors.score = 'Score is required';
    } else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      newErrors.score = 'Score must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const courseData: Course = {
      id: editCourse?.course.id || Date.now().toString(),
      courseName: formData.courseName.trim(),
      courseCode: formData.courseCode.trim().toUpperCase(),
      score: Number(formData.score),
    };

    if (editCourse) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { studentId: selectedStudentId, course: courseData },
      });
    } else {
      dispatch({
        type: 'ADD_COURSE',
        payload: { studentId: selectedStudentId, course: courseData },
      });
    }

    setFormData({ courseName: '', courseCode: '', score: '' });
    setErrors({});
    setIsSubmitting(false);
    if (onComplete) onComplete();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  const selectedStudent = state.students.find((s) => s.id === selectedStudentId);

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {editCourse ? 'Edit Course Score' : 'Add Course Score'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Student</label>
        <select
          value={selectedStudentId}
          onChange={(e) => { setSelectedStudentId(e.target.value); if (errors.student) setErrors((prev) => ({ ...prev, student: '' })); }}
          className={`w-full px-3 py-2 rounded-lg border ${
            errors.student ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
          disabled={!!editCourse}
        >
          <option value="">-- Select a Student --</option>
          {processed.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullName} ({s.studentId}) - {s.department}
            </option>
          ))}
        </select>
        {errors.student && <p className="text-red-500 text-xs mt-1">{errors.student}</p>}
      </div>

      {selectedStudent && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 text-sm text-blue-700 dark:text-blue-300">
          Adding course to: <strong>{selectedStudent.fullName}</strong> ({selectedStudent.studentId})
          <br />
          Current courses: {selectedStudent.courses.length}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.courseName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. Data Structures"
          />
          {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.courseCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. CSC 301"
          />
          {errors.courseCode && <p className="text-red-500 text-xs mt-1">{errors.courseCode}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Score (0-100)</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            min={0}
            max={100}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.score ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. 75"
          />
          {errors.score && <p className="text-red-500 text-xs mt-1">{errors.score}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
      >
        {isSubmitting ? 'Saving...' : editCourse ? 'Update Score' : 'Add Course'}
      </button>
    </form>
  );
}
