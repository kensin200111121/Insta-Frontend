import type { DialogContentProps } from '@/types/props/dialog.type';

import { css } from '@emotion/react';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import withDialog from '@/patterns/hoc/withDialog';
import { MyButton } from '@/components/basic';

export type UserPermissionFormData = {
  web: boolean;
  app: boolean;
  onlyUserTransaction: boolean;
  ableRefund: boolean;
  ableChargeback: boolean;
  ableViewDashboard: boolean;
  ableCreateTicket: boolean;
  ableViewBatches: boolean;
  ableViewSettings: boolean;
};

// Define a union type for permission keys
type PermissionKeys = keyof UserPermissionFormData;

const UserPermissionForm: React.FC<DialogContentProps<UserPermissionFormData, UserPermissionFormData>> = ({
  data,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState<UserPermissionFormData>(data);

  React.useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  const handleUserPermissionChange = (type: PermissionKeys) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [type]: !prevPermissions[type], // Toggle the permission
    }));
  };
  
  const handleUserPermissionChangeAll = (checked: boolean) => {
    setPermissions({
      web: checked,
      app: checked,
      onlyUserTransaction: checked,
      ableRefund: checked,
      ableChargeback: checked,
      ableViewDashboard: checked,
      ableCreateTicket: checked,
      ableViewBatches: checked,
      ableViewSettings: checked,
    });
  };

  const handleSubmit = async () => {
    onClose(permissions);
  };

  return (
    <Form<UserPermissionFormData>
      form={form}
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={data}
      autoComplete="off"
      className="setting-form"
    >
      <Row>
        <Col span={24}>
          <Checkbox
            checked={Object.values(permissions).every(Boolean)}
            onChange={(e) => handleUserPermissionChangeAll(e.target.checked)}
          >
            All
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.web === true} onChange={() => handleUserPermissionChange('web')}>
            Web Only
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.app === true} onChange={() => handleUserPermissionChange('app')}>
            App Only
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.onlyUserTransaction === true} onChange={() => handleUserPermissionChange('onlyUserTransaction')}>
            Only Show User Transactions
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.ableRefund === true} onChange={() => handleUserPermissionChange('ableRefund')}>
            Can Refund
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox className='w-full' checked={permissions?.ableChargeback === true} onChange={() => handleUserPermissionChange('ableChargeback')}>
            Can Submit Chargeback
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.ableViewDashboard === true} onChange={() => handleUserPermissionChange('ableViewDashboard')}>
            Can View Dashboard
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.ableCreateTicket === true} onChange={() => handleUserPermissionChange('ableCreateTicket')}>
            Can Create Tickets
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.ableViewBatches === true} onChange={() => handleUserPermissionChange('ableViewBatches')}>
            Can View Batches
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox checked={permissions?.ableViewSettings === true} onChange={() => handleUserPermissionChange('ableViewSettings')}>
            Can View Settings
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <MyButton className="btn-active w-full" htmlType="submit" onClick={handleSubmit}>
          Save Changes
        </MyButton>
      </Row>
    </Form>
  );
};

export default withDialog(UserPermissionForm);

const styles = css`
  .btn-active {
    height: 48px;
    border-radius: 30px;
  }
  .ant-modal-header {
    text-align: center;
  }
`;
