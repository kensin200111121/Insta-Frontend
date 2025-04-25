import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, {useEffect} from 'react';
import { Row, Input, Form } from 'antd';
import { MyButton } from '@/components/basic';

export type BankFormData = {
    name: string,
    address: string,
    account_number: string
    routing_number: string
}

const BankForm: React.FC<DialogContentProps<BankFormData, BankFormData>> = ({ data, onClose }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(data);
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
                <Form.Item<BankFormData>
                name="name"
                rules={[{ required: true, message: 'Bank name is required!' }]}
                >
                    <Input placeholder='Enter Name on Bank'/>
                </Form.Item>
                <Form.Item<BankFormData>
                name="address"
                rules={[{ required: true, message: 'Bank address is required!' }]}
                >
                    <Input placeholder='Enter Address'/>
                </Form.Item>
                <Form.Item<BankFormData>
                name="account_number"
                rules={[{ required: true, message: 'Account number is required!' }]}
                >
                    <Input placeholder='Enter Account Number'/>
                </Form.Item>
                <Form.Item<BankFormData>
                name="routing_number"
                rules={[{ required: true, message: 'Routing number is required!' }]}
                >
                    <Input placeholder='Enter Routing Number'/>
                </Form.Item>
                <Row>
                    <MyButton
                        className='btn-active w-full'
                        onClick={handleOK}
                    >
                        Confirm
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(BankForm);