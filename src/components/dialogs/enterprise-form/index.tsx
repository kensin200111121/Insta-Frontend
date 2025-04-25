import type { DialogContentProps } from '@/types/props/dialog.type';

import { Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { MyButton, MyInput, MySelect } from '@/components/basic';
import { EnterpriseItem } from '@/interface/data/enterprise.interface';
import withDialog from '@/patterns/hoc/withDialog';
import { apiCreateEnterprise, apiGetEnterpriseById, apiUpdateEnterprise } from '@/api/pages/enterprise.api';
import { GetLocationsAsync } from '@/pages/locations/store/action';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

export type EnterpriseFormData = {
  enterpriseName: string;
  enterpriseEmail: string;
  enterpriseUserName: string;
  enterprisePassword: string;
  selectedLocations: string[];
};

const EnterpriseForm: React.FC<DialogContentProps<{_id: string}, EnterpriseFormData>> = ({ data, onClose }) => {
  const [form] = Form.useForm();
  const { locations } = useSelector(state => state.location);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!data._id || data._id == ''){
      form.resetFields();
    }else{
      apiGetEnterpriseById(data._id)
        .then(res => {
          if (res.status) {
            console.log(res.result);
            form.setFieldsValue({
              enterpriseName: res.result.name,
              enterpriseEmail: res.result.email,
              enterpriseUserName: res.result.loginInfo.name,
              enterprisePassword: res.result.loginInfo.password,
              selectedLocations: res.result.stores?.map(d => d._id) ?? [],
            });
          };
        }).catch(() => {});
    }
  }, [data]);

  useEffect(() => {
    dispatch(GetLocationsAsync());
  }, []);
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const request = data._id?.length ? apiUpdateEnterprise({enterpriseId: data._id, ...values}) : apiCreateEnterprise(values);
      
      request.then(res => {
        if (res.status) {
          onClose();
        };
      }).catch(() => {});
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  return (
    <>
      <Form<EnterpriseFormData>
        form={form}
        name="create_enterprise"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className='setting-form'
      >
        <Row className='subtitle-row'><Col><h3>Enterprise Information</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="enterpriseName" rules={[{ required: true, message: 'Please input the enterprise name!' }]}>
              <Input placeholder="Enterprise Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="enterpriseEmail" rules={[{ required: true, message: 'Please input the enterprise email!' }]}>
              <Input placeholder="Enterprise Email" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="selectedLocations" rules={[{ required: true, message: 'Please input the enterprise email!' }]}>
          <MySelect
            options={locations.map(d => ({ label: d.name, value: d._id }))}
            mode="multiple"
            placeholder="Select Store Names"
            className="w-full"
          />
        </Form.Item>

        <Row className='subtitle-row'><Col><h3>Login Information</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={12}>
            <Form.Item name="enterpriseUserName" rules={[{ required: true, message: 'Please input the username name!' }]}>
              <Input placeholder="Enterprise Username" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="enterprisePassword"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input placeholder="Enterprise Password" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <MyButton className="btn-active w-full" onClick={handleSubmit}>
              {data._id?.length ? 'Update' : 'Create'} Enterprise
            </MyButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default withDialog(EnterpriseForm);

