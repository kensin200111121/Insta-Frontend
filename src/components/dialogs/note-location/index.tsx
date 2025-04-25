import type { DialogContentProps } from '@/types/props/dialog.type';

import { css } from '@emotion/react';
import { Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';

import { apiNoteLocation } from '@/api/pages/location.api';
import { MyButton } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';

export type NoteLocationFormData = {
  id: string;
  notes: string;
  ownershipProof: {
    name: string;
    link: string;
  };
};
export type NoteLocationResponse = { id: string; name: string; link: string };

const NoteLocationForm: React.FC<DialogContentProps<NoteLocationFormData, NoteLocationResponse>> = ({
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
      apiNoteLocation(data)
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
    <Form<NoteLocationFormData>
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
        {data?.ownershipProof.name && (
          <div>
            <h3>Ownership Proof</h3>
            <a href={data.ownershipProof.link} target="_blank" rel="noopener noreferrer">
            {data.ownershipProof.name}
            </a>
          </div>
        )}
      </Row>
      <Row>
        <MyButton className="btn-active w-full" htmlType="submit" onClick={handleSubmit}>
          Done
        </MyButton>
      </Row>
    </Form>
  );
};

export default withDialog(NoteLocationForm);

const styles = css`
  .btn-active {
    height: 48px;
    border-radius: 30px;
  }
`;
