import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { StudentRecord } from '@/types';

export function exportToPDF(records: StudentRecord[], title: string = 'Student Grade Report'): void {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  let yOffset = 40;

  records.forEach((record, index) => {
    if (index > 0) {
      doc.addPage();
      yOffset = 20;
    }

    doc.setFontSize(14);
    doc.text(`${record.fullName} (${record.studentId})`, 14, yOffset);
    yOffset += 8;
    doc.setFontSize(10);
    doc.text(`Department: ${record.department} | Level: ${record.level}`, 14, yOffset);
    yOffset += 6;

    const tableData = record.gradedCourses.map((c) => [
      c.courseCode,
      c.courseName,
      c.score.toString(),
      c.grade,
      c.remarks,
    ]);

    autoTable(doc, {
      startY: yOffset,
      head: [['Course Code', 'Course Name', 'Score', 'Grade', 'Remarks']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || yOffset + 20;
    yOffset = finalY + 10;

    doc.setFontSize(11);
    doc.text(`Total Score: ${record.totalScore}`, 14, yOffset);
    doc.text(`Average: ${record.averageScore}`, 60, yOffset);
    doc.text(`Grade: ${record.overallGrade}`, 110, yOffset);
    yOffset += 8;
  });

  doc.save('student-grades.pdf');
}

export function exportToExcel(records: StudentRecord[]): void {
  const data = records.flatMap((record) =>
    record.gradedCourses.map((c) => ({
      'Student Name': record.fullName,
      'Student ID': record.studentId,
      Department: record.department,
      Level: record.level,
      'Course Code': c.courseCode,
      'Course Name': c.courseName,
      Score: c.score,
      Grade: c.grade,
      Remarks: c.remarks,
      'Average Score': record.averageScore,
      'Overall Grade': record.overallGrade,
    }))
  );

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  const colWidths = [
    { wch: 25 }, { wch: 18 }, { wch: 20 }, { wch: 12 },
    { wch: 14 }, { wch: 22 }, { wch: 8 }, { wch: 8 },
    { wch: 14 }, { wch: 12 }, { wch: 14 },
  ];
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, 'Grades');
  XLSX.writeFile(wb, 'student-grades.xlsx');
}

export function printRecords(records: StudentRecord[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Grade Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #1e40af; }
        .date { text-align: center; font-size: 12px; color: #666; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
        th { background-color: #3b82f6; color: white; }
        .student-header { margin-top: 20px; margin-bottom: 5px; }
        .student-header h2 { margin: 0; font-size: 16px; }
        .student-info { font-size: 12px; color: #555; margin-bottom: 8px; }
        .summary { font-size: 13px; margin-top: 8px; }
        .page-break { page-break-after: always; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <h1>Student Grade Report</h1>
      <div class="date">Generated: ${new Date().toLocaleDateString()}</div>
  `;

  records.forEach((record, index) => {
    if (index > 0) html += `<div class="page-break"></div>`;
    html += `
      <div class="student-header">
        <h2>${record.fullName} (${record.studentId})</h2>
        <div class="student-info">Department: ${record.department} | Level: ${record.level}</div>
      </div>
      <table>
        <thead>
          <tr><th>Course Code</th><th>Course Name</th><th>Score</th><th>Grade</th><th>Remarks</th></tr>
        </thead>
        <tbody>
    `;

    record.gradedCourses.forEach((c) => {
      html += `<tr><td>${c.courseCode}</td><td>${c.courseName}</td><td>${c.score}</td><td>${c.grade}</td><td>${c.remarks}</td></tr>`;
    });

    html += `
        </tbody>
      </table>
      <div class="summary">
        <strong>Total Score:</strong> ${record.totalScore} | 
        <strong>Average:</strong> ${record.averageScore} | 
        <strong>Grade:</strong> ${record.overallGrade}
      </div>
    `;
  });

  html += `</body></html>`;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}
