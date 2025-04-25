import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { DialogContentProps } from '@/types/props/dialog.type';

import { Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';

import { MyButton, MySelect } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';

import SelectTransaction from '../confirm-refund/SelectTransaction';

export type TicketFormData = {
  transaction_id: string;
  status: number;
  description: string;
};

const TicketForm: React.FC<DialogContentProps<TransactionItem[], TicketFormData>> = ({ data, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const handleOK = async () => {
    try {
      const values = await form.validateFields();

      onClose(values);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const handleSelect = (item: TransactionItem) => {
    form.setFieldValue('transaction_id', item.transaction_id);
  };

  return (
    <>
      <Form<TicketFormData>
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={data}
        autoComplete="off"
        className="setting-form"
      >
        <Form.Item name="transaction_id" rules={[{ required: true, message: 'Transaction ID is invalidate!' }]}>
          <SelectTransaction className="w-full" transactions={data} onSelect={handleSelect} />
        </Form.Item>
        <Form.Item name="status" rules={[{ required: true, message: 'Status is invalidate!' }]}>
          <MySelect
            options={[
              { label: 'Solved', value: 1 },
              { label: 'Not Solved', value: 0 },
            ]}
            allowClear
            placeholder="Status"
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 3 }} className="w-full" />
        </Form.Item>
        <Row>
          <MyButton className="btn-active w-full" htmlType="submit" onClick={handleOK}>
            Create
          </MyButton>
        </Row>
      </Form>
    </>
  );
};

export default withDialog(TicketForm);
