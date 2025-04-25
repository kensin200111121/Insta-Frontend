import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect } from 'react';
import { Row, Input, Form } from 'antd';
import { MyButton } from '@/components/basic';

export type NoteFormData = {
    id: string,
    notes: string
}

const NoteForm: React.FC<DialogContentProps<string, NoteFormData>> = ({ data, onClose }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [data]);

    const handleOK = async () => {
        try {
            const values = await form.validateFields();
            onClose({...values, id: data});
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    return (
        <>
            <Form<NoteFormData>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Form.Item
                name="notes"
                >
                    <Input.TextArea placeholder='Enter Notes Description' autoSize={{minRows:5, maxRows:5}} className='w-full'/>
                </Form.Item>
                <Row>
                    <MyButton
                        className='btn-active w-full' htmlType='submit'
                        onClick={handleOK}
                    >
                        Done
                    </MyButton>
                </Row>
            </Form>
        </>
    )
}

export default withDialog(NoteForm);