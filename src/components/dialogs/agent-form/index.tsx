import type { DialogContentProps } from '@/types/props/dialog.type';

import { Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';

import { MyButton, MyInput, MyInputNumber, MySelect } from '@/components/basic';
import { AgentItem } from '@/interface/data/agent.interface';
import withDialog from '@/patterns/hoc/withDialog';
import { apiCreateAgent, apiEditAgent } from '@/api/pages/agent.api';
import { selectStateOptions } from '@/patterns/selectOptions';
import { css } from '@emotion/react';
export type AgentFormData = {
  agentId: string,
  agentCompanyName: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  bankName: string;
  nameOnBankAccount: string;
  bankStreet: string;
  bankSuite: string;
  bankCity: string;
  bankState: string;
  bankZip: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  agentUserName: string;
  agentPassword: string;
  commissionRate: number;
  perTransactionAmount: number;
};

const AgentForm: React.FC<DialogContentProps<AgentItem, AgentFormData>> = ({ data, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldValue('agentCompanyName', data.agentInfo.agentCompanyName);
    form.setFieldValue('agentEmail', data.agentInfo.agentEmail);
    form.setFieldValue('agentName', data.agentInfo.agentName);
    form.setFieldValue('agentPhone', data.agentInfo.agentPhone);
    form.setFieldValue('bankAccountNumber', data.bankInfo.accountNumber);
    form.setFieldValue('nameOnBankAccount', data.bankInfo.bankName);
    form.setFieldValue('bankCity', data.bankInfo.city);
    form.setFieldValue('bankName', data.bankInfo.name);
    form.setFieldValue('bankRoutingNumber', data.bankInfo.routingNumber);
    form.setFieldValue('bankState', data.bankInfo.state);
    form.setFieldValue('bankStreet', data.bankInfo.street);
    form.setFieldValue('bankSuite', data.bankInfo.suite);
    form.setFieldValue('bankZip', data.bankInfo.zip);
    form.setFieldValue('agentUserName', data.loginInfo.name);
    form.setFieldValue('agentPassword', data.loginInfo.password);
    form.setFieldValue('commissionRate', data.commissionRate);
    form.setFieldValue('perTransactionAmount', data.perTransactionAmount);
  }, [data]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const saveData = {agentId: data._id, ...values};
      if(data._id) {
        apiEditAgent(saveData)
        .then(res => {
          if (res.status) {
            onClose();
          };
        })
        .finally(() => {});
      }
      else {
        apiCreateAgent(values)
        .then(res => {
          if (res.status) {
            onClose();
          };
        })
        .finally(() => {});
      }
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  return (
    <>
      <Form<AgentFormData>
        form={form}
        name="create_agent"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className='setting-form'
      >
        <Row className='subtitle-row'><Col><h3>Agent Information</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="agentCompanyName" rules={[{ required: true, message: 'Please input the company name!' }]}>
              <Input placeholder="Agent Company Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="agentName" rules={[{ required: true, message: 'Please input the agent name!' }]}>
              <Input placeholder="Agent Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="agentEmail" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input placeholder="Agent Email" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="agentPhone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
              <Input placeholder="Agent Phone" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row'><Col><h3>Agent Banking Information</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="bankName" rules={[{ required: true, message: 'Please input the bank name!' }]}>
              <Input placeholder="Bank Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameOnBankAccount"
              rules={[{ required: true, message: 'Please input the name on bank account!' }]}
            >
              <Input placeholder="Name on Bank Account" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bankStreet" rules={[{ required: true, message: 'Please input the bank street!' }]}>
              <Input placeholder="Street" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bankSuite">
              <Input placeholder="Suite #" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankCity"
              rules={[{ required: true, message: 'Please input the bank city!' }]}
            >
              <Input placeholder="City" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankState"
              rules={[{ required: true, message: 'Please input the bank state!' }]}
            >
              <MySelect
                className="select-normal w-full"
                options={selectStateOptions}
                placeholder="State"
                defaultValue={''}
                popupClassName="select-dropdown-normal"
                onChange={value => {
                  form.setFieldValue('bankState', value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankZip"
              rules={[{ required: true, message: 'Please input the bank zip!' }]}
            >
              <Input placeholder="zip" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankRoutingNumber"
              rules={[
                { required: true, message: 'Please input the routing number!' },
                {
                  len: 9,
                  message: 'Routing Number Should be 9 Digits',
                },
              ]}
            >
              <Input
                placeholder="Routing Number" className="w-full"
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace|Delete|Arrow/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankAccountNumber"
              rules={[{ required: true, message: 'Please input the name on bank account!' }]}
            >
              <Input placeholder="Account Number" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row'><Col><h3>Login Information</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="agentUserName" rules={[{ required: true, message: 'Please input the agent name!' }]}>
              <Input placeholder="Agent Username" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="agentPassword"
              rules={[{ required: true, message: 'Please input the name on agent password!' }]}
            >
              <Input placeholder="Agent Password" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row'><Col><h3>Agent Buy Rate</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="commissionRate" rules={[{ required: true, message: 'Please input the commission rate!' }]}>
              <MyInputNumber className='w-full' placeholder='Enter Commission Rate' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="perTransactionAmount"
              rules={[{ required: true, message: 'Please input the per transaction amount!' }]}
            >
              <MyInputNumber className='w-full' placeholder='Enter Per Transaction Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <MyButton className="btn-active w-full" onClick={handleSubmit}>
              {data._id ? 'Save Agent' : 'Create Agent'}
            </MyButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default withDialog(AgentForm);
