'use client';

import { useGrade } from '@/context/GradeContext';
import { calculateAverage, getGrade, getOverallGrade } from '@/types';

export default function ExportButtons() {
  const { students } = useGrade();

  function exportCSV() {
    const headers = ['Student Name', 'Student ID', 'Department', 'Level', 'Course Name', 'Course Code', 'Score', 'Grade', 'Remarks'];
    const rows = students.flatMap((s) =>
      s.courses.length > 0
        ? s.courses.map((c) => {
            const { grade, remarks } = getGrade(c.score);
            return [s.fullName, s.studentId, s.department, s.level, c.courseName, c.courseCode, c.score, grade, remarks];
          })
        : [[s.fullName, s.studentId, s.department, s.level, '—', '—', '—', '—', '—']]
    );

    const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-grades.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function printReport() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const allCourses = students.flatMap((s) => s.courses);
    const scores = allCourses.map((c) => c.score);
    const overallAvg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    printWindow.document.write(`
      <html>
      <head>
        <title>Student Grade Report</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; color: #222; }
          h1 { text-align: center; font-size: 22px; margin-bottom: 4px; }
          h2 { text-align: center; font-size: 16px; font-weight: normal; margin-bottom: 30px; color: #555; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
          th, td { border: 1px solid #333; padding: 8px 10px; text-align: left; }
          th { background: #f0f0f0; font-weight: bold; }
          .summary { margin-top: 30px; }
          .summary p { margin: 4px 0; font-size: 14px; }
          .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #777; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>STUDENT GRADE REPORT</h1>
        <h2>Academic Session — Comprehensive Results</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Department</th>
              <th>Level</th>
              <th>Course</th>
              <th>Code</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            ${students
              .flatMap((s, i) =>
                s.courses.length > 0
                  ? s.courses.map((c) => {
                      const { grade } = getGrade(c.score);
                      return `
              <tr>
                <td>${i + 1}</td>
                <td>${s.fullName}</td>
                <td>${s.studentId}</td>
                <td>${s.department}</td>
                <td>${s.level}</td>
                <td>${c.courseName}</td>
                <td>${c.courseCode}</td>
                <td>${c.score}</td>
                <td>${grade}</td>
              </tr>`;
                    })
                  : [
                      `
              <tr>
                <td>${i + 1}</td>
                <td>${s.fullName}</td>
                <td>${s.studentId}</td>
                <td>${s.department}</td>
                <td>${s.level}</td>
                <td colspan="4" style="text-align:center; color:#999;">— No courses —</td>
              </tr>`,
                    ]
              )
              .join('')}
          </tbody>
        </table>
        <div class="summary">
          <p><strong>Total Students:</strong> ${students.length}</p>
          <p><strong>Total Courses:</strong> ${allCourses.length}</p>
          <p><strong>Overall Average:</strong> ${overallAvg.toFixed(2)}</p>
        </div>
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        <\\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportCSV}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export CSV
      </button>
      <button
        onClick={printReport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print Report
      </button>
    </div>
  );
}
