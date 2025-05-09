import type { DialogContentProps } from '@/types/props/dialog.type';

import { Checkbox, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { MyButton, MyInput, MySelect } from '@/components/basic';
import { LocationItem } from '@/interface/data/location.interface';
import withDialog from '@/patterns/hoc/withDialog';
import { useDispatch, useSelector } from 'react-redux';
import { GetAgentsAsync } from '@/pages/agents/store/action';

export type NotificationFormData = {
  title: string;
  store_id: string[];
  agent_id: string[];
  description: string;
};

const NotificationForm: React.FC<DialogContentProps<LocationItem[], NotificationFormData>> = ({ data, onClose }) => {
  const [form] = Form.useForm();
  const { agents } = useSelector(state => state.agent);
  const [ includeAgents, SetIncludeAgents ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAgentsAsync());
  }, []);

  useEffect(() => {
    form.resetFields();
    SetIncludeAgents(false);
  }, [data]);

  const handleOK = async () => {
    try {
      const values = await form.validateFields();
      if(values.store_id.includes('all')){
        values.store_id = [];
      }
      if(values.agent_id.includes('all')){
        values.agent_id = [];
      }

      onClose(values);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const handleChange = (key: string, values: string[]) => {
    if(values.includes('all')){
      form.setFieldValue(key, ['all']);
    }else{
      form.setFieldValue(key, values);
    }
  }

  return (
    <>
      <Form<NotificationFormData>
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className='setting-form'
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Title is invalidate!' }]}
        >
          <MyInput placeholder='Enter notification title' />
        </Form.Item>
        <Form.Item
          name="store_id"
          rules={[{ required: true, message: 'Store is invalidate!' }]}
        >
          <MySelect
            mode="multiple"
            placeholder="All or select individual stores"
            className='w-full'
            options={[{label: 'All Stores', value: 'all'}, ...data.map(d => ({ label: d.name, value: d._id }))]}
            onChange={(val) => handleChange('store_id', val)}
          />
        </Form.Item>
        <Form.Item name="includeAgents">
          <Checkbox onChange={() => SetIncludeAgents(prev => !prev)} checked={includeAgents}>
            Include Agents?
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="agent_id"
          hidden={!includeAgents}
          rules={includeAgents ? [{ required: true, message: 'Store is invalidate!' }] : []}
        >
          <MySelect
            mode="multiple"
            placeholder="All or select individual stores"
            className='w-full'
            options={[{label: 'All Agents', value: 'all'}, ...agents.map(d => ({ label: d.agentInfo.agentName, value: d._id }))]}
            onChange={(val) => handleChange('agent_id', val)}
          />
        </Form.Item>
        <Form.Item
          name="description"
        >
          <Input.TextArea placeholder='Description of notification...' autoSize={{ minRows: 3, maxRows: 3 }} className='w-full' />
        </Form.Item>
        <Row>
          <MyButton
            className='btn-active w-full' htmlType='submit'
            onClick={handleOK}
          >
            Create
          </MyButton>
        </Row>
      </Form>
    </>
  )
}

export default withDialog(NotificationForm);
