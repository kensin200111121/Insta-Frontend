import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { DialogContentProps } from '@/types/props/dialog.type';

import { css } from '@emotion/react';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { apiCreateChargeback } from '@/api/pages/chargeback.api';
import { MyButton, MySelect } from '@/components/basic';
import SelectTransaction from '@/components/dialogs/confirm-refund/SelectTransaction';
import withDialog from '@/patterns/hoc/withDialog';
import getFormatedNumber from '@/utils/getFormatedNumber';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocationsAsync } from '@/pages/locations/store/action';
import { GetTransactionsAsync } from '@/pages/transactions/store/action';

export type NewChargebackFormData = {
  _id: string;
  transaction_id: string;
  amount: number;
  store_id?: string;
  customer_name: string;
  phone: string;
  charged_at?: Date;
  respond_at?: Date;
};
export type NewChargebackResponse = { id: string; name: string; link: string };

const NewChargebackForm: React.FC<DialogContentProps<NewChargebackFormData, NewChargebackResponse>> = ({
  data,
  onClose,
}) => {
  const [amount, setAmount] = useState(data.amount);
  const [form] = Form.useForm();

  const { transactions } = useSelector(state => state.transaction);
  const { locations } = useSelector(state => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    if( !locations || locations.length == 0 ){
      dispatch(GetLocationsAsync());
    }
    dispatch(GetTransactionsAsync({pagination: {}, filters: {type: 0, isRefunded: false}, sorter: {}}));
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      data = { ...data, ...values };

      apiCreateChargeback(data)
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

  const handleSelect = async (item: TransactionItem) => {
    form.setFieldValue('transaction_id', item.transaction_id);
    form.setFieldValue('amount', getFormatedNumber(item.amount));
    form.setFieldValue('customer_name', item.customer_name);
    form.setFieldValue('phone', formatPhoneNumber(item.phone));
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };
  
  return (
    <Form<NewChargebackFormData>
      form={form}
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={data}
      autoComplete="off"
      className="setting-form"
    >
      <div css={styles}>
        <Form.Item name="store_id" rules={[{ required: true, message: 'Store Name is required!' }]}>
          <MySelect
            options={locations.map(d => ({label: d.name, value: d._id}))}
            allowClear
            placeholder="Select Store Name Or Search Here"
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="transaction_id" rules={[{ required: true, message: 'transaction id is required!' }]}>
          <SelectTransaction className="w-full" onSelect={handleSelect} transactions={transactions} />
        </Form.Item>
        <Row className='nested-row' gutter={16}>
          <Col span={12}>
            <Form.Item name="charged_at" rules={[{ required: true, message: 'Chargeback date is required!' }]}>
              <DatePicker
                placeholder="Date of Chargeback"
                value={data.charged_at ? dayjs(data.charged_at) : undefined}
                format="MM/DD/YYYY"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="respond_at" rules={[{ required: true, message: 'Respond date is required!' }]}>
              <DatePicker
                placeholder="Respond By Date"
                value={data.respond_at ? dayjs(data.respond_at) : undefined}
                format="MM/DD/YYYY"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="customer_name">
          <Input placeholder="Enter Full Name" value={data.customer_name} className="w-full" readOnly={true} />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="Enter Phone Number" value={formatPhoneNumber(data.phone)} className="w-full" readOnly={true} />
        </Form.Item>
        <Form.Item name="amount">
          <Input
            className="w-full"
            placeholder="Enter Amount"
            value={`$${getFormatedNumber(amount)}`}
            prefix={"$"}
            // onChange={e => handleAmountChange(e.target.value)}
            disabled={true}
          />
        </Form.Item>
        <Row>
          <Col span={24}>
            <MyButton className="btn-active w-full" onClick={handleSubmit}>
              Create
            </MyButton>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default withDialog(NewChargebackForm);

const styles = css`
  .btn-active {
    height: 48px;
    border-radius: 30px;
  }
`;
