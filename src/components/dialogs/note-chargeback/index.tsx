import type { DialogContentProps } from '@/types/props/dialog.type';

import { css } from '@emotion/react';
import { Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';

import { apiNoteChargeback } from '@/api/pages/chargeback.api';
import { MyButton } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';

export type NoteChargebackFormData = {
  id: string;
  notes: string;
};
export type NoteChargebackResponse = { id: string; name: string; link: string };

const NoteChargebackForm: React.FC<DialogContentProps<NoteChargebackFormData, NoteChargebackResponse>> = ({
  data,
  onClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      data = { ...data, ...values };
      apiNoteChargeback(data)
        .then(res => {
          if (res.status) {
            onClose();
          }
        })
        .finally(() => {});
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  return (
    <Form<NoteChargebackFormData>
      form={form}
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={data}
      autoComplete="off"
      className="setting-form"
    >
      <Form.Item name="notes">
        <Input.TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 3 }} className="w-full" />
      </Form.Item>
      <Row>
        <MyButton className="btn-active w-full" htmlType="submit" onClick={handleSubmit}>
          Done
        </MyButton>
      </Row>
    </Form>
  );
};

export default withDialog(NoteChargebackForm);

const styles = css`
  .btn-active {
    height: 48px;
    border-radius: 30px;
  }
`;
