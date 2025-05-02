import type { LocationItem, ReportUserInterface } from '@/interface/data/location.interface';
import type { UserInfoItem } from '@/interface/data/setting.interface';

import { css } from '@emotion/react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateNewReporterAsync, CreateNewUserAsync } from './store/action';
import UserPermissionFormDialog, { UserPermissionFormData } from '@/components/dialogs/user-permission';
import { DialogMethod } from '@/types/props/dialog.type';
import { MySelect } from '@/components/basic';
import { selectReporterTypeOptions, selectReportTypeOptions } from '@/patterns/selectOptions';

interface SettingFormProps {
  dataSource: LocationItem; // Define the dataSource prop
}

const SettingForm: React.FC<SettingFormProps> = ({ dataSource }) => {
  const [userForm] = Form.useForm();
  const [reporterForm] = Form.useForm();
  const [form] = Form.useForm();
  const { users } = useSelector(state => state.setting);
  const [ userInfoValid, setUserInfoValid ] = useState(false);
  const [ reporterInfoValid, setReporterInfoValid ] = useState(false);
  const dispatch = useDispatch();

  const dialogRefUserPermission = useRef<DialogMethod<UserPermissionFormData>>(null);
  const [permission, setPermission] = useState<UserPermissionFormData>({
    web: false,
    app: false,
    onlyUserTransaction: false,
    ableRefund: false,
    ableChargeback: false,
    ableViewDashboard: false,
    ableCreateTicket: false,
    ableViewBatches: false,
    ableViewSettings: false
  });

  useEffect(() => {
    if(dataSource?.bankInfo?.accountNumber){
      form.setFieldsValue({...dataSource, bankInfo: {...dataSource.bankInfo, accountNumber: dataSource.bankInfo.accountNumber.slice(-4)}});
    }
    clearUserInfo();
    reporterForm.resetFields();
  }, [dataSource]);

  const handleAddNewUser = async () => {
    try {
      const values = await userForm.validateFields(['name', 'pin']);
      dispatch(CreateNewUserAsync({...values, permission}));
      clearUserInfo();
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const clearUserInfo = () => {
    userForm.resetFields();
    setUserInfoValid(false);
    setPermission({
      web: false,
      app: false,
      onlyUserTransaction: false,
      ableRefund: false,
      ableChargeback: false,
      ableViewDashboard: false,
      ableCreateTicket: false,
      ableViewBatches: false,
      ableViewSettings: false
    });
  }

  const handleEditPermission = () => {
    dialogRefUserPermission.current?.open(permission);
  };

  const onUserPermissionClose = (permissions: any) => {
    setPermission(permissions);
  };

  const checkUserField = async () => {
    userForm.validateFields(['name', 'pin']).then(values => {
      setUserInfoValid(true);
    })
    .catch(e => {
      setUserInfoValid(false);
    });
  }

  const handleAddNewReporter = async () => {
    try {
      const values = await reporterForm.validateFields(['name', 'email', 'phone', 'type']);
      dispatch(CreateNewReporterAsync(values));
      reporterForm.resetFields();
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const checkReporterField = async () => {
    reporterForm.validateFields(['name', 'email', 'phone', 'type']).then(values => {
      setReporterInfoValid(true);
    })
    .catch(e => {
      setReporterInfoValid(false);
    });
  }

  return (
    <>
      <div className="card-title">Settings</div>
      <h3>Location Address:</h3>
      <div css={styles} className="setting-form">
        <Form form={form} name="settings_form" layout="vertical">
          <Row gutter={[24, 20]}>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item name="name" rules={[{ required: true, message: 'Store Name is required!' }]}>
                <Input placeholder="Store Name" className="w-full" readOnly={true}/>
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item name="dbaName" rules={[{ required: true, message: 'DBA Name is required!' }]}>
                <Input placeholder="DBA Name" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item
                name={['storeInfo', 'address']}
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input placeholder="Address" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item
                name={['storeInfo', 'suite']}
                rules={[{ required: true, message: 'Please input your suite #!' }]}
              >
                <Input placeholder="Suite #" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item name={['storeInfo', 'city']} rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input placeholder="City" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item
                name={['storeInfo', 'state']}
                rules={[{ required: true, message: 'Please input your state!' }]}
              >
                <Input placeholder="State" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item
                name={['storeInfo', 'zip']}
                rules={[{ required: true, message: 'Please input your zip code!' }]}
              >
                <Input placeholder="Zip" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <Form.Item
                name={['storeInfo', 'phoneNumber']}
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder="Phone Number" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={12} xs={12}>
              <h3>Store ID:</h3>
            </Col>
            <Col xl={4} lg={9} md={12} sm={12} xs={12}>
              <Form.Item name="storeId" rules={[{ required: true, message: 'StoreId is required!' }]}>
                <Input placeholder="Store ID" className="w-full" readOnly={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={24} xs={24}>
              <h3>Tip Settings:</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={24} xs={24}>
              { dataSource?.noTip ? <Button className={`w-full btn-green`}>
                  No Tip
                </Button> :
                <Row gutter={20} className='nested-row'>
                  <Col span={8}>
                    <Form.Item name={['tipAmounts', 0]} valuePropName="checked">
                      <Button className={`w-full btn-green`}>
                        {dataSource?.tipMode === 'fixed' && '$'}
                        {dataSource?.tipAmounts?.length ? dataSource?.tipAmounts[0] : 0}
                        {dataSource?.tipMode === 'percentage' && '%'}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={['tipAmounts', 1]} valuePropName="checked">
                      <Button className={`w-full btn-green`}>
                        {dataSource?.tipMode === 'fixed' && '$'}
                        {dataSource?.tipAmounts?.length ? dataSource?.tipAmounts[1] : 0}
                        {dataSource?.tipMode === 'percentage' && '%'}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item name={['tipAmounts', 2]} valuePropName="checked">
                        <Button className={`w-full btn-green`}>
                          {dataSource?.tipMode === 'fixed' && '$'}
                          {dataSource?.tipAmounts?.length ? dataSource?.tipAmounts[2] : 0}
                          {dataSource?.tipMode === 'percentage' && '%'}
                        </Button>
                      </Form.Item>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={24} xs={24}>
              <h3>Convenience Fee:</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={24} xs={24}>
              <Form.Item name="convenienceFee" valuePropName="checked">
                <Button className={`w-full btn-green`}>
                  { dataSource?.noConvenienceFee && 'No Convenience Fee'}
                  {
                    (dataSource?.percentageFeeMode ? (dataSource?.percentageFeeAmount ?? 0) + '%' : '')
                  }
                  {
                    dataSource?.percentageFeeMode && dataSource?.fixedFeeMode && ' + '
                  }
                  {
                    (dataSource?.fixedFeeMode ? '$' + (dataSource?.fixedFeeAmount ?? 0) : '')
                  }
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={24} xs={24}>
              <h3>Processing Fee:</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={24} xs={24}>
              <Form.Item name="ProcessingFee" valuePropName="checked">
                <Button className={`w-full btn-green`}>
                  {
                    (dataSource?.percentageProcessingFeeMode ? (dataSource?.percentageProcessingFeeAmount ?? 0) + '%' : '')
                  }
                  {
                    dataSource?.percentageProcessingFeeMode && dataSource?.fixedProcessingFeeMode && ' + '
                  }
                  {
                    (dataSource?.fixedProcessingFeeMode ? '$' + (dataSource?.fixedProcessingFeeAmount ?? 0) : '')
                  }
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={24} xs={24}>
              <h3>Auto Batch :</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={24} xs={24}>
              <Row gutter={[15, 20]} className="nested-row">
                <Col span={12}>
                  <Form.Item name="isAutoBatchTime" valuePropName="checked">
                    <Button className={`w-full ${dataSource.isAutoBatchTime ? 'btn-green' : ''}`}>Yes</Button>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="isAutoBatchTime">
                    <Button className={`w-full ${!dataSource.isAutoBatchTime ? 'btn-green' : ''}`}>No</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row><i>Time - 4am EST, daily</i></Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={12} xs={24}>
              <h3>Last 4 digits of Bank :</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={12} xs={24}>
              <Form.Item
                name={['bankInfo', 'accountNumber']}
                rules={[{ required: true, message: 'Please input your bank on file!' }]}
              >
                <Input placeholder="xxxx xxxx xxxx 4242" className="w-full text-align-center" readOnly={true}  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={12} xs={24}>
              <h3>Descriptor :</h3>
            </Col>
            <Col xl={8} lg={9} md={12} sm={12} xs={24}>
              <Form.Item name={['merchant', 'descriptor']} rules={[{ required: true, message: 'Please input your descriptor!' }]}>
                <Input placeholder="Descriptor" className="w-full text-align-center" readOnly={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form form={userForm} name="basic" wrapperCol={{ span: 24 }} autoComplete="off" className="setting-form">
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={12} xs={10}>
              <h3>Add New User:</h3>
            </Col>
            <Col xl={20} lg={18} md={12} sm={12} xs={14}>
              <Row gutter={[24, 20]} className="nested-row">
                <Col lg={10} md={24} sm={24} xs={24}>
                  <Form.Item<UserInfoItem>
                    name="name"
                    rules={[
                      { required: true, message: 'Name is invalidate!' },
                      { validator: (_, value) => {
                        const nameExists = users.some((m) => m.name === value);
                        return nameExists ? Promise.reject('Name must be unique!') : Promise.resolve();
                      }}
                    ]}
                    style={{ marginBottom: '0px' }}
                  >
                    <Input placeholder="Enter User Name" onChange={checkUserField} />
                  </Form.Item>
                </Col>
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Form.Item<UserInfoItem>
                    name="pin"
                    rules={[
                      { required: true, message: 'PIN is invalidate!' },
                      { len: 4, message: 'PIN Should be 4 Digits'},
                      { validator: (_, value) => {
                        const pinExists = users.some((m) => m.pin === value);
                        return pinExists ? Promise.reject('PIN must be unique!') : Promise.resolve();
                      }}
                    ]}
                    style={{ marginBottom: '0px' }}
                  >
                    <Input.Password placeholder="Enter PIN" maxLength={4} visibilityToggle onChange={checkUserField}
                      onKeyDown={(e) => {
                        if (!/[0-9]|Backspace|Delete|Arrow/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={4} md={24} sm={24} xs={24}>
                  <Button className={`w-full${userInfoValid ? ' btn-yellow' : ''}`} onClick={handleEditPermission}>
                    Permission
                  </Button>
                </Col>
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Button className={`w-full${userInfoValid ? ' btn-green' : ''}`} onClick={handleAddNewUser}>
                    Add New User
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <UserPermissionFormDialog
            css={styles}
            className="title-center"
            onClose={onUserPermissionClose}
            ref={dialogRefUserPermission}
            title="User Permissions"
          />
        </Form>
        <Form<ReportUserInterface> form={reporterForm} name="basic" wrapperCol={{ span: 24 }} autoComplete="off" className="setting-form">
          <Row gutter={24}>
            <Col xl={4} lg={6} md={12} sm={12} xs={10}>
              <h3>Add New Reporter:</h3>
            </Col>
            <Col xl={20} lg={18} md={12} sm={12} xs={14}>
              <Row gutter={[24, 20]} className="nested-row">
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Form.Item<ReportUserInterface>
                    name='name'
                    rules={[{ required: true, message: 'Name is invalidate!' }]}
                  >
                    <Input placeholder="Name" onChange={checkReporterField} />
                  </Form.Item>
                </Col>
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Form.Item<ReportUserInterface>
                    name='email'
                    rules={[{ required: true, message: 'Email is invalidate!' }]}
                  >
                    <Input placeholder="Email" onChange={checkReporterField} />
                  </Form.Item>
                </Col>
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Form.Item<ReportUserInterface>
                    name='phone'
                    rules={[{ required: true, message: 'Phone Number is invalidate!' }]}
                  >
                    <Input placeholder="Phone Number" onChange={checkReporterField} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={24} sm={24} xs={24}>
                  <Form.Item<ReportUserInterface>
                    name='type'
                    rules={[{ required: true, message: 'Report type is invalidate!' }]}
                  >
                    <MySelect
                      className="w-full"
                      options={selectReporterTypeOptions}
                      placeholder="Report Type"
                      onChange={checkReporterField}
                    />
                  </Form.Item>
                </Col>
                <Col lg={5} md={24} sm={24} xs={24}>
                  <Button className={`w-full${reporterInfoValid ? ' btn-green' : ''}`} onClick={handleAddNewReporter}>
                    Add New Reporter
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default SettingForm;

const styles = css`
  @media (max-width: 1300px) {
    gap: 30px;
  }

  @media (max-width: 1100px) {
    gap: 5px;
  }

  @media (max-width: 1060px) {
    flex-direction: column;
    gap: 60px;
  }

  .ant-row.ant-form-item-row {
    margin-bottom: 0px;
  }

  .text-align-center {
    text-align: center;
  }
  .auto-batch {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .auto-batch > * {
    margin-right: 8px;
  }
`;
