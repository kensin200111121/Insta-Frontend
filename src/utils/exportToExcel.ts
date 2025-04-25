
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";

export default function exportToExcel(dataSource: any[], columns: any[], filePath = 'table', sheetName = 'Sheet1')
{
    const data_source = dataSource.map( data => {
        const temp: Record<string, any>  = {};
        for(const col of columns){
            if(col.export !== false){
                temp[col.title] = col.renderExport ? col.renderExport(data[col.dataIndex], data) : (col.render ? col.render(data[col.dataIndex], data) : data[col.dataIndex]);
            }
        }
        return temp;
    });

    const worksheet = xlsx.utils.json_to_sheet(data_source);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const data = new Blob([excelBuffer], {type: "application/octet-stream"});
    saveAs(data, filePath + '.xlsx');
}