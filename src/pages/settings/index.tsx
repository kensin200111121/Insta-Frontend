import type { FC } from 'react';

import { Card, Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyTable from '@/components/core/table';

import SettingForm from './SettingForm';
import { GetUserLocation, GetUsersAsync, RemoveUserAsync } from './store/action';
import { MyButton } from '@/components/basic';
import { UserInfoItem } from '@/interface/data/setting.interface';
import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { DialogMethod } from '@/types/props/dialog.type';
import RemoveNotificationDialog from '@/components/dialogs/notification-form/RemoveNotification';
import InputPasswordFormDialog from '@/components/dialogs/user-information/InputPassword';
import UserInformationFormDialog from '@/components/dialogs/user-information';
import { css } from '@emotion/react';
import { ColumnType } from 'antd/es/table';

import * as xlsx from "xlsx";
import { saveAs } from "file-saver";

const SettingPage: FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.setting);
  const { location } = useSelector(state => state.setting);

  const removeDialogRef = useRef<DialogMethod<any>>(null);
  const passwordDialogRef = useRef<DialogMethod<string>>(null);
  const userInfoDialogRef = useRef<DialogMethod<UserInfoItem>>(null);

  useEffect(() => {
    dispatch(GetUsersAsync());
    dispatch(GetUserLocation());
  }, []);

  const columns : ColumnType<UserInfoItem>[] = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '',
      align: 'center',
      width: 30,
      render: (val: any, record: UserInfoItem) => (<div style={{minWidth: '20px'}}>
        <button className='btn-custom' onClick={() => onPasswordOpen(record?._id ?? '')} title='See the pin code & permission'>
          <EyeOutlined className='text-info' />
        </button>
      </div>)
    },
    {
      title: '',
      align: 'center',
      width: 30,
      render: (val: any, record: UserInfoItem) => (<div style={{minWidth: '20px'}}>
        <button className='btn-custom' onClick={() => onRemoveOpen(record?._id || '')}>
          <CloseOutlined className='text-danger' />
        </button>
      </div>)
    }
  ];

  const onRemoveOpen = (_id: string) => {
    removeDialogRef.current?.open(_id);
  };
  
  const onRemoveClose = async (_id?: string) => {
    if(_id){
      dispatch(RemoveUserAsync(_id));
    }
  };

  const onPasswordOpen = (_id: string) => {
    passwordDialogRef.current?.open(_id);
  };
  
  const onPasswordClose = async (userInfo?: UserInfoItem) => {
    if(userInfo){
      userInfoDialogRef.current?.open(userInfo);
    }
  };

  const exportPermissions = () => {
    const data_source = users.map( data => {
      const temp: Record<string, any>  = { 'User Name': data.name };
      const permissionKeys : string[] = Object.keys(data.permissions)
      for(const key of permissionKeys){
        temp[key] = data.permissions[key];
      }
      return temp;
    });

    const worksheet = xlsx.utils.json_to_sheet(data_source);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Permissions");

    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const data = new Blob([excelBuffer], {type: "application/octet-stream"});
    saveAs(data, 'UserPermissions.xlsx');
  }

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
              <span className="card-title">Users & Permissions</span>
              <div className='card-actions'>
                <MyButton className='btn-info' style={{width: 180}} onClick={exportPermissions}>Export Permissions</MyButton>
              </div>
            </div>
            <MyTable dataSource={users} columns={columns} pagable rowKey={record => record._id}></MyTable>
          </Card>
        </Col>
      </Row>
      <RemoveNotificationDialog css={styles} className='title-center' onClose={onRemoveClose} ref={removeDialogRef} title="Delete this user?" />
      <InputPasswordFormDialog css={userStyles} className='title-center' onClose={onPasswordClose} ref={passwordDialogRef} title="Input password to see user pin & permissions" />
      <UserInformationFormDialog css={userStyles} className='title-center' onClose={()=>{}} ref={userInfoDialogRef} title="User PIN & Permissions" />
    </>
  );
};

export default SettingPage;

const styles = css`
.ant-modal-content{
    width: 381px;
    padding-bottom: 30px;
    margin: auto;
}
`;
const userStyles = css`
.ant-modal-content{
    width: 441px;
    padding-bottom: 30px;
    margin: auto;
}
`;
