import type { ConfirmRefundFormData } from './index';
import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { DialogContentProps } from '@/types/props/dialog.type';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { Checkbox, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { MyButton, MyInputNumber } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';

import SelectTransaction from './SelectTransaction';

const InputRefundForm: React.FC<DialogContentProps<TransactionItem[], ConfirmRefundFormData>> = ({ data, onClose }) => {
  const [form] = Form.useForm();
  const [isShowPartialAmount, setShowPartialAmount] = useState(false);
  const [maxRefundAmount, setMaxRefundAmount] = useState(0);

  useEffect(() => {
    resetDialog();
  }, [data]);

  const handleOK = async () => {
    try {
      const values = await form.validateFields();
      onClose(values);
      resetDialog();
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const handleSelect = async (item: TransactionItem) => {
    form.setFieldValue('transaction_id', item.transaction_id);
    form.setFieldValue('refundAmount', item.amount.toFixed(2));
    form.setFieldValue('transactionAmount', item.amount);
    setMaxRefundAmount(item.amount);
  };

  const handleAmount = async (e: CheckboxChangeEvent) => {
    setShowPartialAmount(e.target.checked);

    try {
      const values = await form.validateFields();

      if (!e.target.checked) {
        form.setFieldValue('refundAmount', values.transactionAmount);
      }
    } catch (errorInfo) {
      form.setFieldValue('refundCheck', false);
    }
  };

  const resetDialog = () => {
    setShowPartialAmount(false);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} name="basic" wrapperCol={{ span: 24 }} autoComplete="off" className="setting-form">
        <Form.Item<ConfirmRefundFormData>
          name="transaction_id"
          rules={[{ required: true, message: 'Transaction ID is invalidate!' }]}
        >
          <SelectTransaction className="w-full" onSelect={handleSelect} transactions={data} />
        </Form.Item>
        <Form.Item<ConfirmRefundFormData> name="refundCheck" className="partial-checkbox">
          <Checkbox onChange={handleAmount} checked={isShowPartialAmount}>
            <span className="link">Issue Partial Refund</span>
          </Checkbox>
        </Form.Item>
        <Form.Item<ConfirmRefundFormData> name="refundAmount" hidden={!isShowPartialAmount} className="partial-input">
          <MyInputNumber className="w-full" min={0} max={maxRefundAmount}/>
        </Form.Item>
        <Form.Item<ConfirmRefundFormData> name="transactionAmount" hidden>
          <MyInputNumber />
        </Form.Item>
        <Row>
          <MyButton className="btn-active w-full" htmlType="submit" onClick={handleOK}>
            Refund
          </MyButton>
        </Row>
      </Form>
    </>
  );
};

export default withDialog(InputRefundForm);
