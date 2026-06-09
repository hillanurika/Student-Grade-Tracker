'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface StudentFormProps {
  editStudent?: Student | null;
  onComplete?: () => void;
}

export default function StudentForm({ editStudent, onComplete }: StudentFormProps) {
  const { dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    department: '',
    level: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editStudent) {
      setFormData({
        fullName: editStudent.fullName,
        studentId: editStudent.studentId,
        department: editStudent.department,
        level: editStudent.level,
      });
    }
  }, [editStudent]);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.level.trim()) newErrors.level = 'Level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (editStudent) {
      dispatch({
        type: 'UPDATE_STUDENT',
        payload: {
          ...editStudent,
          ...formData,
        },
      });
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData,
        courses: [],
      };
      dispatch({ type: 'ADD_STUDENT', payload: newStudent });
    }

    setFormData({ fullName: '', studentId: '', department: '', level: '' });
    setErrors({});
    setIsSubmitting(false);
    if (onComplete) onComplete();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {editStudent ? 'Edit Student' : 'Add New Student'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.studentId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. CSC/2022/001"
          />
          {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
            placeholder="e.g. Computer Science"
          />
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level/Class</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.level ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
          >
            <option value="">Select Level</option>
            <option value="100 Level">100 Level</option>
            <option value="200 Level">200 Level</option>
            <option value="300 Level">300 Level</option>
            <option value="400 Level">400 Level</option>
            <option value="500 Level">500 Level</option>
            <option value="ND I">ND I</option>
            <option value="ND II">ND II</option>
            <option value="HND I">HND I</option>
            <option value="HND II">HND II</option>
          </select>
          {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
      >
        {isSubmitting ? 'Saving...' : editStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}
