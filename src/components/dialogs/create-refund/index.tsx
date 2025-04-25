import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Row, Form, Col } from 'antd';
import { MyButton, MyInput, MyInputNumber, MySelect } from '@/components/basic';
import { LocationItem } from '@/interface/data/location.interface';

export type RefundFormData = {
    store_id: string,
    transaction_id: string,
    full_name: string,
    phone: string,
    amount: number,
    note: string,
}

const RefundForm: React.FC<DialogContentProps<LocationItem[], RefundFormData>> = ({ data, onClose }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [data]);

    const handleOK = async () => {
        try {
            const values = await form.validateFields();
            onClose(values);
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    return (
        <>
            <Form<RefundFormData>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Form.Item
                name="store_id"
                rules={[{ required: true, message: 'Store is invalidate!' }]}
                >
                    <MySelect
                        placeholder="Select Store Name"
                        className='w-full'
                        options={data.map(d => ({label: d.name, value: d._id}))}
                    />
                </Form.Item>
                <Form.Item
                    name="transaction_id"
                    rules={[{ required: true, message: 'Transaction ID is invalidate!' }]}
                    >
                    <MyInput placeholder='Enter Transaction ID'/>
                </Form.Item>
                <Form.Item
                    name="full_name"
                    rules={[{ required: true, message: 'Full name is invalidate!' }]}
                    >
                    <MyInput placeholder='Enter Full Name'/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Phone number is invalidate!' }]}
                    >
                    <MyInput placeholder='Enter Phone Number'/>
                </Form.Item>
                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Amount is invalidate!' }]}
                    >
                    <MyInputNumber placeholder='Enter Amount' className='w-full'/>
                </Form.Item>
                <Form.Item
                name="note"
                >
                    <MyInput placeholder='Notes' />
                </Form.Item>
                <Row>
                    <MyButton
                        className='btn-active w-full' htmlType='submit'
                        onClick={handleOK}
                    >
                        Create
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(RefundForm);