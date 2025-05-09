import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Row, Form, Col } from 'antd';
import { MyButton, MyInput, MySelect } from '@/components/basic';
import { selectTerminalDescriptionOptions, selectTerminalModels } from '@/patterns/selectOptions';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocationsAsync } from '@/pages/locations/store/action';

export type TerminalFormData = {
    store_id: string,
    serial_number: string,
    TPN: string,
    model: string,
    token: string,
    description: string,
    merchant: string
}

const TerminalForm: React.FC<DialogContentProps<any, TerminalFormData>> = ({ data, onClose }) => {
    const [form] = Form.useForm();
    const { locations } = useSelector(state => state.location);
    const { merchant_accounts } = useSelector(state => state.merchantaccount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetLocationsAsync());
    }, []);

    useEffect(() => {
        if(data._id){
            form.setFieldsValue(data);
        }else{
            form.resetFields();
        }
    }, [data]);

    const handleOK = async () => {
        try {
            const values = await form.validateFields();
            form.resetFields();
            onClose(values);
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    return (
        <>
            <Form<TerminalFormData>
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
                        placeholder="Store Location"
                        className='w-full'
                        options={locations.map(d => ({label: d.name, value: d._id}))}
                    />
                </Form.Item>
                <Row className='nested-row' gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            name="serial_number"
                            rules={[{ required: true, message: 'Serial Number is invalidate!' }]}
                            >
                            <MyInput placeholder='Enter S/N'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="model"
                            rules={[{ required: true, message: 'Model is invalidate!' }]}
                            >
                            <MySelect
                                placeholder="Enter Model"
                                className='w-full'
                                options={selectTerminalModels}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="TPN"
                    rules={[{ required: true, message: 'TPN is required!' }]}
                >
                    <MyInput placeholder='Enter TPN' />
                </Form.Item>
                <Form.Item
                    name="token"
                    rules={[{ required: true, message: 'Token is required!' }]}
                >
                    <MyInput placeholder='Enter Token' />
                </Form.Item>
                <Form.Item name="merchant" rules={[{ required: true, message: 'MID is required!' }]}>
                    <MySelect
                        placeholder="Select Merchant Account"
                        className='w-full'
                        options={merchant_accounts.map(d => ({label: d.iso_name, value: d._id}))}
                    />
                </Form.Item>
                <Form.Item
                name="description"
                rules={[{ required: true, message: 'Descriptoin is required!' }]}
                >
                    <MySelect
                        placeholder="Enter Description"
                        className='w-full'
                        options={selectTerminalDescriptionOptions}
                    />
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

export default withDialog(TerminalForm);