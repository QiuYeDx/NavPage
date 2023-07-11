import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

/**
 * **导出表格数据为Excel文件**
 * @param data - 表格数据 格式为[{}, {}, ...]
 * @param name - 导出的文件名
 *
 * - 示例:
 *   const tableData = [
 *     { name: 'John', age: 25, email: 'john@example.com' },
 *     { name: 'Jane', age: 30, email: 'jane@example.com' },
 *     { name: 'Mike', age: 35, email: 'mike@example.com' }
 *   ];
 *
 *   const handleExportClick = () => {
 *     exportToExcel(tableData);
 *   };
 */
export const exportToExcel = (data, name) => {
    // 创建工作簿
    const workbook = XLSX.utils.book_new();

    // 创建工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 将工作簿转换为二进制数据
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 创建 Blob 对象
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // 使用 file-saver 库保存文件并进行下载
    saveAs(blob, name || 'table.xlsx');
};
