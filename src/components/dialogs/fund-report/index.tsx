import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect, useState } from 'react';
import { Row, Form, Col, Input, Upload, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MyButton, MyDatePicker, MyTimePicker, MyInput, MyInputNumber, MySelect } from '@/components/basic';
import { LocationItem } from '@/interface/data/location.interface';
import { allStoresItem, fundingReportStatusOptions } from '@/patterns/selectOptions';
import { Dayjs } from 'dayjs';
import type { UploadFile, UploadProps } from 'antd';
import { useDispatch } from 'react-redux';
import { apiCreateFundingReport } from '@/api/pages/fundingreport.api';
import { createFundingReport } from '@/pages/funding_report/store/reducer';
import * as XLSX from 'xlsx';

export type ReportFormData = {
    funded_at: Date,
    ACH_ID: string,
    store_id: string,
    amount: string,
    status: number,
    note: string,
    report: string,
}

const ReportForm: React.FC<DialogContentProps<LocationItem[], ReportFormData>> = ({ data, onClose }) => {
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileNameList, setFileNameList] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        form.resetFields();
        setFileList([]);
        setFileNameList([]);
    }, [data]);    

    useEffect(() => {
        form.setFieldValue('report', fileNameList.join(", "));
    }, [fileNameList]);    

    const beforeUpload = (file: UploadFile<ArrayBuffer>) => {
        console.log('File:', file);

        const isExcel = 
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
            file.type === 'application/vnd.ms-excel' || 
            file.name.endsWith('.xlsx') || 
            file.name.endsWith('.xls');

        if (!isExcel) {
            message.error('You can only upload Excel files!');
            return Upload.LIST_IGNORE;
        }

        setFileList([file]);
        return false;
    };

    const handleOK = async () => {
        if (fileList.length === 0) {
            message.error('Please upload an Excel file!');
            return;
        }
    
        const file = fileList[0];
        console.log(fileList);
        if (!(file instanceof File)) {
            message.error('Invalid file type!');
            return;
        }
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const result = e.target?.result as ArrayBuffer | null;
            if (!result) {
                message.error('Failed to read the file');
                return;
            }
    
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: 'array' });
    
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            type FundingReportRow = (string | number | null)[];
            const jsonData: FundingReportRow[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
            const requiredColumns = ['Store Name', 'Store ID', 'Amount Funded', 'Funding Date', 'Status', 'Notes'];
            const headers = jsonData[0] as (string | number | null)[];
            const isValid = requiredColumns.every(col => headers.includes(col));
    
            if (!isValid) {
                message.error('The uploaded file must contain the following columns: ' + requiredColumns.join(', '));
                return;
            }
            const fundingReports = jsonData.slice(1).map((row: FundingReportRow) => {
                const rawDate = row[3];
                let fundedAt: Date;

                if (typeof rawDate === 'number') {
                    fundedAt = excelDateToJSDate(rawDate);
                } else {
                    fundedAt = new Date();
                }
                return {
                    store_name: row[0],
                    store_id: row[1],
                    amount: row[2],
                    funded_at: fundedAt,
                    status: row[4],
                    notes: row[5],
                };
            });
            const formData = new FormData();
            formData.append('report', file as any);
            formData.append('reports', JSON.stringify(fundingReports));
    
            const res = await apiCreateFundingReport(formData);
            if (res.status) {
                onClose();
            }
        };
    
        reader.readAsArrayBuffer(file);
    };
    
    const excelDateToJSDate = (excelDate: number) => {
        const excelBaseDate = Date.UTC(1900, 0, 1);
        return new Date(excelBaseDate + (excelDate - 1) * 24 * 60 * 60 * 1000);
    };
    
    return (
        <>
            <Form<ReportFormData>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Row style={{marginBottom: '25px'}}>
                    <Col span={24}>
                        <Upload
                        fileList={fileList}
                        className='w-full'
                        beforeUpload={beforeUpload}
                        onRemove={() => setFileList([])}
                        >
                            <Form.Item
                            name="report"
                            style={{marginBottom: '-20px'}}
                            >
                                <MyInput className="w-full" placeholder='Upload Funding Report' suffix={
                                    <PlusCircleOutlined />
                                } />
                            </Form.Item>
                        </Upload>
                    </Col>
                </Row>
                <Row>
                    <MyButton
                        className='btn-active w-full' htmlType='submit'
                        onClick={handleOK}
                    >
                        Confirm
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(ReportForm);