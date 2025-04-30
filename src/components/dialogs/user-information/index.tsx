import type { DialogContentProps } from '@/types/props/dialog.type';

import { Checkbox, Col, Row } from 'antd';
import React from 'react';

import withDialog from '@/patterns/hoc/withDialog';
import { MyButton } from '@/components/basic';
import { UserInfoItem } from '@/interface/data/setting.interface';


const UserInformationForm: React.FC<DialogContentProps<UserInfoItem, any>> = ({
  data,
  onClose,
}) => {

  return (
    <>
      <Row>
        <Col>
          <div>User Pin: <b>{data.pin}</b></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={Object.values(data.permissions).every(Boolean)} >All</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.web === true}>Web Only</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.app === true}>App Only</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.onlyUserTransaction === true}>Only Show User Transactions</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.ableRefund === true}>Can Refund</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox className='w-full' checked={data.permissions?.ableChargeback === true}>Can Submit Chargeback</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.ableViewDashboard === true}>Can View Dashboard</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.ableCreateTicket === true}>Can Create Tickets</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.ableViewBatches === true}>Can View Batches</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox checked={data.permissions?.ableViewSettings === true}>Can View Settings</Checkbox>
        </Col>
      </Row>
      <MyButton className="btn-active w-full" onClick={onClose}>OK</MyButton>
    </>
  );
};

export default withDialog(UserInformationForm);
