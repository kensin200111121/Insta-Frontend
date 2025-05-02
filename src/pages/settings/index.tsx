import type { FC } from 'react';

import { Card, Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyTable from '@/components/core/table';

import SettingForm from './SettingForm';
import { GetReportersAsync, GetUserLocation, GetUsersAsync, RemoveReporterAsync, RemoveUserAsync } from './store/action';
import { MyButton } from '@/components/basic';
import { UserInfoItem } from '@/interface/data/setting.interface';
import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { DialogMethod } from '@/types/props/dialog.type';
import RemoveNotificationDialog from '@/components/dialogs/notification-form/RemoveNotification';
import InputPasswordFormDialog from '@/components/dialogs/user-permission/InputPassword';
import UserPermissionFormDialog, { UserPermissionFormData } from '@/components/dialogs/user-permission';
import { css } from '@emotion/react';
import { ColumnType } from 'antd/es/table';

import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { ReportUserInterface } from '@/interface/data/location.interface';

const SettingPage: FC = () => {
  const dispatch = useDispatch();
  const { users, reporters } = useSelector(state => state.setting);
  const { location } = useSelector(state => state.setting);
  const [ isUserRemove, setIsUserRemove ] = useState(true);

  const removeDialogRef = useRef<DialogMethod<any>>(null);
  const passwordDialogRef = useRef<DialogMethod<any>>(null);
  const permissionDialogRef = useRef<DialogMethod<UserPermissionFormData>>(null);

  useEffect(() => {
    dispatch(GetUsersAsync());
    dispatch(GetReportersAsync());
    dispatch(GetUserLocation());
  }, []);

  const columns : ColumnType<UserInfoItem>[] = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name'
    },
    ...(users?.[0]?.pin ? [{
      title: 'User Pin',
      dataIndex: 'pin',
      key: 'pin'
    }] : []),
    {
      title: '',
      align: 'center',
      width: 30,
      render: (val: any, record: UserInfoItem) => (<div style={{minWidth: '20px'}}>
        <button className='btn-custom' onClick={() => onPermissionOpen(record.permissions as UserPermissionFormData)} title='See Permissions'>
          <EyeOutlined className='text-info' />
        </button>
      </div>)
    },
    {
      title: '',
      align: 'center',
      width: 30,
      render: (val: any, record: UserInfoItem) => (<div style={{minWidth: '20px'}}>
        <button className='btn-custom' onClick={() => onRemoveOpen(record?._id || '', true)}>
          <CloseOutlined className='text-danger' />
        </button>
      </div>)
    }
  ];

  const columnsForReporters : ColumnType<ReportUserInterface>[] = [
    {
      title: 'Reporter Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Report Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '',
      align: 'center',
      width: 30,
      render: (val: any, record: ReportUserInterface) => (<div style={{minWidth: '20px'}}>
        <button className='btn-custom' onClick={() => onRemoveOpen(record?._id || '', false)}>
          <CloseOutlined className='text-danger' />
        </button>
      </div>)
    }
  ];

  const onRemoveOpen = (_id: string, isUser: boolean) => {
    setIsUserRemove(isUser);
    removeDialogRef.current?.open(_id);
  };
  
  const onRemoveClose = async (_id?: string) => {
    if(_id && _id != ''){
      if(isUserRemove){
        dispatch(RemoveUserAsync(_id));
      }else{
        dispatch(RemoveReporterAsync(_id));
      }
    }
  };

  const onPasswordOpen = () => {
    passwordDialogRef.current?.open(true);
  };
  
  const onPermissionOpen = (permissions: UserPermissionFormData) => {
    permissionDialogRef.current?.open(permissions);
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
        <Col span={24}>
          <Card className="main-content" style={{ marginTop: '0px' }}>
            <div className="card-header">
              <span className="card-title">Users & Permissions</span>
              <div className='card-actions'>
                <MyButton className='btn-info' style={{width: 180}} onClick={onPasswordOpen}>View Pin</MyButton>
                <MyButton className='btn-info' style={{width: 180}} onClick={exportPermissions}>Export Permissions</MyButton>
              </div>
            </div>
            <MyTable dataSource={users} columns={columns} pagable rowKey={record => record._id}></MyTable>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="main-content" style={{ marginTop: '0px' }}>
            <div className="card-header">
              <span className="card-title">Reporters</span>
            </div>
            <MyTable dataSource={reporters} columns={columnsForReporters} pagable rowKey={record => record._id}></MyTable>
          </Card>
        </Col>
      </Row>
      <RemoveNotificationDialog css={styles} className='title-center' onClose={onRemoveClose} ref={removeDialogRef} title={`Delete this ${isUserRemove ? 'user' : 'reporter'}?`} />
      <InputPasswordFormDialog css={userStyles} className='title-center' onClose={() => {}} ref={passwordDialogRef} title="Input password to see user pin & permissions" />
      <UserPermissionFormDialog css={userStyles} className='title-center' onClose={()=>{}} ref={permissionDialogRef} title="User Permissions" />
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
