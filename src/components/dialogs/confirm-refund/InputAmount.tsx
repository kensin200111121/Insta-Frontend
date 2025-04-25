import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect, useState } from 'react';
import { Row, Form } from 'antd';
import { MyButton, MyInputNumber } from '@/components/basic';

export interface InputAmountFormData{
    refundAmount: number
}

const InputAmountForm: React.FC<DialogContentProps<InputAmountFormData, InputAmountFormData>> = ({ data, onClose }) => {

    const [amountLimit, setAmountLimit] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        setAmountLimit(data.refundAmount);
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
            <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={data}
                autoComplete="off"
                className='setting-form'
            >
                <Form.Item<InputAmountFormData>
                name="refundAmount"
                rules={[{ required: true, message: 'Amount is invalidate!' }]}
                >
                    <MyInputNumber className='w-full' placeholder='Enter Refund Amount' prefix={"$"} min={0} max={amountLimit}/>
                </Form.Item>
                <Row>
                    <MyButton
                        className='btn-active w-full' htmlType='submit'
                        onClick={handleOK}
                    >
                        Yes
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(InputAmountForm);