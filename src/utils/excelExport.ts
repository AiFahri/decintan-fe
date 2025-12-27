import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExcelRow {
  [key: string]: string | number | undefined;
}

export const exportToExcel = (data: ExcelRow[], filename: string) => {
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save file
  saveAs(blob, `${filename}.xlsx`);
};
