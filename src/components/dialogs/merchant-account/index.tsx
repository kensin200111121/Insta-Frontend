import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Row, Form, Col } from 'antd';
import { MyButton, MyInput } from '@/components/basic';
import { css } from '@emotion/react';

export type MerchantAccountFormData = {
    iso_name: string;
    acquirer: string;
    monthly_volume: string;
    MID: string;
    descriptor: string;
    binNum: string;
    agentNum: string;
    chainNum: string;
    storeNum: string;
    terminalNum: string;
    terminalId: string;
    note?: string;
}

const MerchantAccountForm: React.FC<DialogContentProps<any, MerchantAccountFormData>> = ({data, onClose }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if(data._id){
            form.setFieldsValue(data);
        }else{
            form.resetFields();
        }
    }, [data])

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
            <Form<MerchantAccountFormData>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Form.Item
                name="iso_name"
                rules={[{ required: true, message: 'ISO Name is invalidate!' }]}
                >
                    <MyInput placeholder='ISO Name' />
                </Form.Item>
                <Row className='nested-row' gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            name="acquirer"
                            rules={[{ required: true, message: 'Acquirer is invalidate!' }]}
                            >
                            <MyInput placeholder='Acquirer'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="monthly_volume"
                            rules={[{ required: true, message: 'Monthly Volume is invalidate!' }]}
                            >
                            <MyInput placeholder='Enter Monthly Volume'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                name="MID"
                rules={[{ required: true, message: 'MID is invalidate!' }]}
                >
                    <MyInput placeholder='MID #' />
                </Form.Item>
                <Form.Item
                name="binNum"
                rules={[{ required: true, message: 'BIN # is invalidate!' }]}
                >
                    <MyInput placeholder='BIN #' />
                </Form.Item>
                <Form.Item
                name="agentNum"
                rules={[{ required: true, message: 'Agent # is invalidate!' }]}
                >
                    <MyInput placeholder='Agent #' />
                </Form.Item>
                <Form.Item
                name="chainNum"
                rules={[{ required: true, message: 'Chain # is invalidate!' }]}
                >
                    <MyInput placeholder='Chain #' />
                </Form.Item>
                <Form.Item
                name="storeNum"
                rules={[{ required: true, message: 'Store # is invalidate!' }]}
                >
                    <MyInput placeholder='Store #' />
                </Form.Item>
                <Form.Item
                name="terminalNum"
                rules={[{ required: true, message: 'Terminal # is invalidate!' }]}
                >
                    <MyInput placeholder='Terminal #' />
                </Form.Item>
                <Form.Item
                name="terminalId"
                rules={[{ required: true, message: 'Terminal ID is invalidate!' }]}
                >
                    <MyInput placeholder='Terminal ID' />
                </Form.Item>
                <Form.Item
                name="descriptor"
                rules={[{ required: true, message: 'Descriptor is invalidate!' }]}
                >
                    <MyInput placeholder='Descriptor' />
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
                        Confirm
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(MerchantAccountForm);