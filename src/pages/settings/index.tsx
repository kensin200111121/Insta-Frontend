import type { FC } from 'react';

import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyTable from '@/components/core/table';

import SettingForm from './SettingForm';
import { GetUserLocation, GetUsersAsync } from './store/action';

const SettingPage: FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.setting);
  const { location } = useSelector(state => state.setting);

  useEffect(() => {
    dispatch(GetUsersAsync());
    dispatch(GetUserLocation());
  }, []);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <Card className="main-content">
            <SettingForm dataSource={location} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card className="main-content" style={{ marginTop: '0px' }}>
            <div className="card-header">
              <span className="card-title">Authorized Users</span>
            </div>
            <MyTable dataSource={users} columns={columns} pagable></MyTable>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SettingPage;
