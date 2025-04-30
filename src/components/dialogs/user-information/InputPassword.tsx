import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { MyButton, MyInput } from '@/components/basic';
import { apiGetUserInfo } from '@/api/pages/setting.api';
import { UserInfoItem } from '@/interface/data/setting.interface';

export interface InputPasswordFormData{
    password: string
}

const InputPasswordForm: React.FC<DialogContentProps<string, UserInfoItem>> = ({ data, onClose }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [data]);

    const handleOK = async () => {
        try {
            const values = await form.validateFields();
            apiGetUserInfo(data, values.password)
            .then(res => {
                if (res.status) {
                    onClose(res.result);
                    form.resetFields();
                }else{
                    form.setFields([{name: 'password', errors: [res.message]}]);
                }
            })
            .catch(() => {
                form.setFields([{name: 'password', errors: ['The password is incorrect!']}]);
            });
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    return (
        <>
            <Form<InputPasswordFormData>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Amount is invalidate!' }]}
                >
                    <MyInput.Password className='w-full' placeholder='Enter Password' visibilityToggle/>
                </Form.Item>
                <MyButton
                    className='btn-active w-full' htmlType='submit'
                    onClick={handleOK}
                >
                    Yes
                </MyButton>
            </Form>
        </>
    )
}

export default withDialog(InputPasswordForm);