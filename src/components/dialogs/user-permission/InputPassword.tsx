import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { MyButton, MyInput } from '@/components/basic';
import { apiGetUsersWithPins } from '@/api/pages/setting.api';
import { useDispatch } from 'react-redux';
import { setSettingState } from '@/pages/settings/store/reducer';

export interface InputPasswordFormData{
    password: string
}

const InputPasswordForm: React.FC<DialogContentProps<any, any>> = ({ onClose }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleOK = async () => {
        try {
            const values = await form.validateFields();
            apiGetUsersWithPins(values.password)
            .then(res => {
                if (res.status) {
                    dispatch(setSettingState({users: res.result}));
                    onClose();
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