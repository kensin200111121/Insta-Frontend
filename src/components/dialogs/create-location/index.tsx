import type {
  LocationCreateFormItem,
  ReportUserInterface,
  TerminalInterface,
  UserMembersInterface,
} from '@/interface/data/location.interface';
import type { UserPermissionFormData } from '@/components/dialogs/user-permission';

import type { DialogContentProps, DialogMethod } from '@/types/props/dialog.type';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';

import { css } from '@emotion/react';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Switch, Upload } from 'antd';
import React, { useRef, useEffect, useState } from 'react';

import { apiCreateLocation, apiUploadOwnershipProof } from '@/api/pages/location.api';
import UserPermissionFormDialog from '@/components/dialogs/user-permission';
import { MyInputNumber, MySelect } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';
import {
  selectCurrencyOptions,
  selectReportTypeOptions,
  selectStateOptions,
} from '@/patterns/selectOptions';
import { useDispatch, useSelector } from 'react-redux';
import { GetMerchantAccountAsync } from '@/pages/merchant_accounts/store/action';
import { GetAgentsAsync } from '@/pages/agents/store/action';
import { GetEnterprisesAsync } from '@/pages/enterprises/store/action';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import getFormatedNumber, { roundDown } from '@/utils/getFormatedNumber';
import moment from 'moment-timezone';

const hasPermission = (permission: Record<string, boolean>) => {
  let result = false;
  for (let key in permission) {
    result = result || permission[key];
    if (result) {
      return true;
    }
  }
  return false;
};

const CreateLocationDialog: React.FC<DialogContentProps<LocationCreateFormItem, LocationCreateFormItem>> = ({
  data,
  onClose,
}) => {
  const [form] = Form.useForm<LocationCreateFormItem>();
  const [usersForm] = Form.useForm();
  const [reportForm] = Form.useForm();
  const [storeId, setStoreId] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sameProfile, setSameProfile] = useState(false);
  const [openProcessingFree, setOpenProcessingFree] = useState(false);
  const [isReadOnlyAgentBuyRate, setIsReadOnlyAgentBuyRate] = useState(true);
  const [hasAnotherAgent, setHasAnotherAgent] = useState(false);
  const [showSubAgent, setShowSubAgent] = useState(false);
  const [isLiveStore, setIsLiveStore] = useState(false);

  const dialogRefUserPermission = useRef<DialogMethod<UserPermissionFormData>>(null);

  const { merchant_accounts } = useSelector(state => state.merchantaccount);
  const { agents } = useSelector(state => state.agent);
  const { enterprises } = useSelector(state => state.enterprise);
  const dispatch = useDispatch();

  React.useEffect(() => {
    userMembers.forEach((userMember, key) => {
      usersForm.setFieldValue(`name${key}`, '');
      usersForm.setFieldValue(`pin${key}`, '');
    });

    reportUsers.forEach((reportUser, key) => {
      reportForm.setFieldValue(`reportName${key}`, '');
      reportForm.setFieldValue(`reportEmail${key}`, '');
      reportForm.setFieldValue(`reportPhoneNumber${key}`, '');
      reportForm.setFieldValue(`reportType${key}`, 'Report Type');
    });
    setUserMembers([{
      _id: '',
      pin: '',
      readOnly: false,
      permissions: {
          web: false,
          app: false,
          onlyUserTransaction: false,
          ableRefund: false,
          ableChargeback: false,
          ableViewDashboard: false,
          ableCreateTicket: false,
          ableViewBatches: false,
          ableViewSettings: false
      },
      name: ''
    }]);
    setReportUsers([{
      _id: '',
      name: '',
      email: '',
      phone: '',
      type: '',
      readOnly: false,
    }]);
    setTipMode('');
    setNoTip(false);
    setNoConvenienceFee(false);
    setNoConvenienceFee(false);
    setConvenienceFeeModes({percentageFeeMode: false, fixedFeeMode: false});
    setProcessingFeeModes({percentageProcessingFeeMode: false, fixedProcessingFeeMode: false});
    setSameProfile(false);
    setIsReadOnlyAgentBuyRate(true);
    setHasAnotherAgent(false);
    setShowSubAgent(false);
    setMerchants([null]);
    setDescriptors(['']);
    setIsLiveStore(false);
    form.resetFields();
    // setDescriptor(merchant_accounts.find(d => d._id == data?.merchant)?.descriptor || '');
  }, [data]);

  useEffect(() => {
    dispatch(GetMerchantAccountAsync());
    dispatch(GetAgentsAsync());
    dispatch(GetEnterprisesAsync());
  }, []);
  
  const [userMembers, setUserMembers] = useState<UserMembersInterface[]>([
    {
      _id: '', pin: '', readOnly: false,
      permissions: {
        web: false,
        app: false,
        onlyUserTransaction: false,
        ableRefund: false,
        ableChargeback: false,
        ableViewDashboard: false,
        ableCreateTicket: false,
        ableViewBatches: false,
        ableViewSettings: false
      },
      name: ''
    },
  ]);
  const [reportUsers, setReportUsers] = useState<ReportUserInterface[]>([
    {
      _id: '',
      name: '',
      email: '',
      phone: '',
      type: '',
      readOnly: false,
    },
  ]);
  const [merchants, setMerchants] = useState<any[]>([null]);
  const [descriptors, setDescriptors] = useState<string[]>(['']);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [tipMode, setTipMode] = useState(String);
  const [noTip, setNoTip] = useState(false);
  const [noConvenienceFee, setNoConvenienceFee] = useState(false);
  const [convenienceFeeModes, setConvenienceFeeModes] = useState({
    percentageFeeMode: false,
    fixedFeeMode: false,
  });
  const [processingFeeModes, setProcessingFeeModes] = useState({
    percentageProcessingFeeMode: false,
    fixedProcessingFeeMode: false,
  });
  const [autoTime, setAutoTime] = useState(true);
  
  React.useEffect(() => {
    generateStoreId();
  }, [data]);

  const handleTipModeChange = (mode: string) => {
    setTipMode(mode);
    setNoTip(false);
    form.setFieldsValue({ tipMode: mode, noTip: false });
  };

  const handleConvenienceFeeChange = (type: 'percentageFeeMode' | 'fixedFeeMode') => {
    setNoConvenienceFee(false);
    setNoConvenienceFee(false);
    setConvenienceFeeModes(prev => {
      const newModes = {
        ...prev,
        [type]: !prev[type],
      };

      form.setFieldsValue({
        percentageFeeMode: newModes.percentageFeeMode,
        fixedFeeMode: newModes.fixedFeeMode,
      });

      return newModes;
    });
    form.setFieldValue('noConvenienceFee', false);
    form.setFieldValue('noConvenienceFee', false);
  };

  const handleProcessingFeeChange = (type: 'percentageProcessingFeeMode' | 'fixedProcessingFeeMode') => {
    setProcessingFeeModes(prev => {
      const newModes = {
        ...prev,
        [type]: !prev[type],
      };

      form.setFieldsValue({
        percentageProcessingFeeMode: newModes.percentageProcessingFeeMode,
        fixedProcessingFeeMode: newModes.fixedProcessingFeeMode,
      });

      return newModes;
    });
  };
  
  const validateInputsName = (index: number) => {
    const member = userMembers[index];
    if (!member.name) {
      return false;
    }
    return true;
  };

  const validateInputsPin = (index: number) => {
    const member = userMembers[index];
    const pinExists = userMembers.some((m, i) => m.pin === member.pin && i !== index);

    if (!member.pin) {
      return false;
    }

    if (pinExists) {
      return false;
    }

    return true;
  };

  const handleNameChange = (index: number, value: string) => {
    const updatedMembers = [...userMembers];
    updatedMembers[index].name = value;

    if (validateInputsName(index)) {
      setUserMembers(updatedMembers);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    const updatedMembers = [...userMembers];
    updatedMembers[index].pin = value;

    if (validateInputsPin(index)) {
      setUserMembers(updatedMembers);
    }
  };

  const handleAddNewUser = async () => {
    let hasError = false;
    userMembers.some((e, index) => {
      if (!e.name || !e.pin || !hasPermission(e.permissions)) {
        hasError = true;
      }
    });
    if (hasError) {
      alert('Please fill all user information & permissions');
      return;
    }

    const lastMember = userMembers[userMembers.length - 1];
    const nameExists = userMembers.slice(0, -1).some(member => member.name === lastMember.name);
    const pinExists = userMembers.slice(0, -1).some(member => member.pin === lastMember.pin);
    if (lastMember && !lastMember.name) {
        message.error('Name is required!');
        return;
    }

    if (lastMember && !lastMember.pin) {
        message.error('PIN is required!');
        return;
    }

    if (nameExists) {
        message.error('Name must be unique!');
        return;
    }

    if (pinExists) {
        message.error('PIN must be unique!');
        return;
    }

    const updatedLastMember = { ...lastMember, readOnly: false };
    setUserMembers(prevMembers =>
        prevMembers
            .map((member, index) => (index === prevMembers.length - 1 ? updatedLastMember : member))
            .concat({
                _id: '',
                pin: '',
                readOnly: false,
                permissions: {
                    web: false,
                    app: false,
                    onlyUserTransaction: false,
                    ableRefund: false,
                    ableChargeback: false,
                    ableViewDashboard: false,
                    ableCreateTicket: false,
                    ableViewBatches: false,
                    ableViewSettings: false
                },
                name: ''
            }),
    );
  };

  const handleAddNewReport = async () => {
    const lastReport = reportUsers[reportUsers.length - 1];
    const nameExists = reportUsers.slice(0, -1).some(report => report.name === lastReport.name);
    const emailExists = reportUsers.slice(0, -1).some(report => report.email === lastReport.email);
    const phoneExists = reportUsers.slice(0, -1).some(report => report.phone === lastReport.phone);
    
    if (lastReport && !lastReport.name) {
        message.error('Name is required!');
        return;
    }

    if (lastReport && !lastReport.email) {
        message.error('Email is required!');
        return;
    }

    if (lastReport && !lastReport.phone) {
      message.error('Phone is required!');
      return;
    }

    if (lastReport && (lastReport.type === '' || lastReport.type === 'None')) {
      message.error('Report type is required!');
      return;
    }

    if (nameExists) {
        message.error('Name must be unique!');
        return;
    }

    if (emailExists) {
        message.error('Email must be unique!');
        return;
    }

    if (phoneExists) {
      message.error('Phone must be unique!');
      return;
    }
    const updatedLastReport = { ...lastReport };

    setReportUsers(prevReports =>
      prevReports
        .map((report, index) => (index === prevReports.length - 1 ? updatedLastReport : report))
        .concat({
          _id: '',
          name: '',
          email: '',
          phone: '',
          type: '',
          readOnly: false,
        }),
    );
  };

  const handleMerchantSelect = (value: string|null, index: number) => {
    if(merchants.includes(value)){
      message.error('MID was alreay added.');
      return;
    }
    const temp = [...descriptors];
    temp[index] = merchant_accounts.find(d => d._id == value)?.descriptor || '';
    setDescriptors(temp);
    const mtemp = [...merchants];
    mtemp[index] = value;
    setMerchants(mtemp);
  }
  const handleAgentSelect = (value: String) => {
    form.setFieldValue('commissionRatesAmount', agents.find(d => d._id == value)?.commissionRate ?? 0)
    form.setFieldValue('perTransactionAmount', agents.find(d => d._id == value)?.perTransactionAmount ?? 0)
    setShowSubAgent(true);
  }
  const handleSecondAgentSelect = (value: String) => {
    form.setFieldValue('secondCommissionRatesAmount', agents.find(d => d._id == value)?.commissionRate ?? 0)
    form.setFieldValue('secondPerTransactionAmount', agents.find(d => d._id == value)?.perTransactionAmount ?? 0)
  }
  const handleSubAgentSelect = (value: String) => {
    form.setFieldValue('subCommissionRatesAmount', agents.find(d => d._id == value)?.commissionRate ?? 0)
    form.setFieldValue('subPerTransactionAmount', agents.find(d => d._id == value)?.perTransactionAmount ?? 0)
  }
  const handleCloseProcessingFree = () => {
    setOpenProcessingFree(false);
  };
  const handleSubmit = () => {
    const userHasErrors = userMembers.some(member => {
      if (!member.name || !member.pin) {
          message.error('Please enter user information or delete it.');
          return true;
      }

      if (member.pin.length != 4) {
        message.error('PIN Should be 4 Digits.');
        return true;
      }

      const nameExists = userMembers.filter(m => m.name === member.name).length > 1;
      const pinExists = userMembers.filter(m => m.pin === member.pin).length > 1;

      if (nameExists) {
          message.error(`Name "${member.name}" must be unique!`);
          return true;
      }

      if (pinExists) {
          message.error(`PIN "${member.pin}" must be unique!`);
          return true;
      }

      return false;
    });

    const reportHasErrors = reportUsers.some(report => {
        if (!report.name || !report.email || !report.phone) {
            message.error('Please enter report information or delete it.');
            return true;
        }

        const nameExists = reportUsers.filter(r => r.name === report.name).length > 1;
        const emailExists = reportUsers.filter(r => r.email === report.email).length > 1;
        const phoneExists = reportUsers.filter(r => r.phone === report.phone).length > 1;

        if (nameExists) {
            message.error(`Name "${report.name}" must be unique!`);
            return true;
        }

        if (emailExists) {
            message.error(`Email "${report.email}" must be unique!`);
            return true;
        }

        if (phoneExists) {
          message.error(`Phone "${report.phone}" must be unique!`);
          return true;
        }

        return false;
    });

    if(merchants.length === 0){
      message.error('MID information is required.');
      return false;
    }else if(merchants[merchants.length - 1] === null){
      message.error('Please enter MID information or delete it.');
      return false;
    }

    if (!(merchants.filter(e => !!e))?.length) {
      message.error(`Merchant account is required. Please select the valid MID!`);
      return;
    }

    if (userHasErrors || reportHasErrors) {
        return;
    }
    const { percentageProcessingFeeMode, fixedProcessingFeeMode } = processingFeeModes;
    if (!percentageProcessingFeeMode && !fixedProcessingFeeMode) {
        setOpenProcessingFree(true);
        return;
    }

    if(
      Number(form.getFieldValue('percentageProcessingFeeAmount') ?? 0) < 
      Number(form.getFieldValue('commissionRatesAmount') ?? 0) + Number(form.getFieldValue('secondCommissionRatesAmount') ?? 0)
      || Number(form.getFieldValue('fixedProcessingFeeAmount') ?? 0) < 
      Number(form.getFieldValue('perTransactionAmount') ?? 0) + Number(form.getFieldValue('secondPerTransactionAmount') ?? 0)
    ){
      message.error("Agent commission rate can't be bigger than processing fee.");
      return;
    }

    if(
      Number(form.getFieldValue('percentageProcessingFeeAmount') ?? 0) < 
      Number(form.getFieldValue('commissionRatesAmount') ?? 0) + Number(form.getFieldValue('secondCommissionRatesAmount') ?? 0)
      + Number(form.getFieldValue('subCommissionRatesAmount') ?? 0)
      || Number(form.getFieldValue('fixedProcessingFeeAmount') ?? 0) < 
      Number(form.getFieldValue('perTransactionAmount') ?? 0) + Number(form.getFieldValue('secondPerTransactionAmount') ?? 0)
      + Number(form.getFieldValue('subPerTransactionAmount') ?? 0)
    ){
      message.info("Agent commission rate is bigger than processing fee.");
    }

    const { percentageFeeMode, fixedFeeMode } = convenienceFeeModes;

    if ((!noTip && !tipMode) || (!noConvenienceFee && !percentageFeeMode && !fixedFeeMode)) {
      setIsModalVisible(true);
      return;
    }

    formSubmit(false, false);
  };
  
  const formSubmit = async (noTipConfirm: boolean, noConvenienceFeeConfirm: boolean) => {
    const formData = new FormData();

    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append('ownershipProof', file.originFileObj);
      } else {
        console.error('File object is undefined:', file);
      }
    });

    try {
      const values = await form.validateFields();

      const merchantIds = (merchants || []).filter((e) => !!e);
      data = {
        ...data,
        ...values,
        merchants: merchantIds,
        isAutoBatchTime: autoTime,
        noTip: noTipConfirm || noTip,
        noConvenienceFee: noConvenienceFeeConfirm || noConvenienceFee,
        userMembers: [...userMembers],
        reportUsers: [...reportUsers],
        terminals: [],
        live: isLiveStore
      };

      apiCreateLocation(data)
        .then(res => {
          if (res.status) {
            formData.append('id', res.result._id);
            apiUploadOwnershipProof(formData).then(res => {
              onClose();
            });
          }
        })
        .finally(() => {
          setFileList([]);
        });
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };
  
  const handleModalOk = () => {
    setIsModalVisible(false);
    let noTipConfirm = false;
    let noConvenienceFeeConfirm = false;
    if (!noTip && !tipMode) {
      setNoTip(true);
      noTipConfirm = true;
    }
    const { percentageFeeMode, fixedFeeMode } = convenienceFeeModes;
    if (!noConvenienceFee && !percentageFeeMode && !fixedFeeMode) {
      setNoConvenienceFee(true);
      noConvenienceFeeConfirm = true;
    }
    formSubmit(noTipConfirm, noConvenienceFeeConfirm);
  };

  const handleModalCancel = () => {
      setIsModalVisible(false);
  };

  const beforeUpload = (file: { type: string; size: number }) => {
    const isValidFileType =
      file.type === 'application/pdf' ||
      file.type.startsWith('image/') ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'text/plain';
    const isFileSizeValid = file.size / 1024 / 1024 < 5;

    if (!isValidFileType) {
      message.error('You can only upload PDF or image files!');

      return false;
    }

    if (!isFileSizeValid) {
      message.error('File must be smaller than 5MB!');

      return false;
    }

    return true;
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handleAutoTimeChange = (value: boolean) => {
    setAutoTime(value);
  };

  const generateStoreId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    // Generate 3 random letters
    let randomLetters = '';
    for (let i = 0; i < 3; i++) {
      randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 3 random digits
    let randomDigits = '';
    for (let i = 0; i < 3; i++) {
      randomDigits += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // Combine letters and numbers
    const newStoreId = randomLetters + randomDigits;
    form.setFieldsValue({ storeId: newStoreId });
    setStoreId(newStoreId);
  };

  const handlePermissionMember = (index: number) => {
    const updatedMembers = [...userMembers];
    setSelectedIndex(index);
    dialogRefUserPermission.current?.open(
      updatedMembers[index].permissions
    );
  };
  
  const handleDeleteMember = (index: number) => {
    const updatedMembers = userMembers.filter((_, i) => i !== index);
    setUserMembers(updatedMembers);
  };
 
  const handleDeleteReport = (index: number) => {
    const updatedReports = reportUsers.filter((_, i) => i !== index);

    setReportUsers(updatedReports);
  };

  const handleDeleteMerchant = (index: number) => {
    const updatedMerchants = merchants.filter((_, i) => i !== index);
    setMerchants(updatedMerchants);
    const updatedDescriptors = descriptors.filter((_, i) => i !== index);
    setDescriptors(updatedDescriptors);
  };

  const onUserPermissionClose = (permissions: any) => {
    if (selectedIndex !== null) {
      const updatedMembers = [...userMembers];
      updatedMembers[selectedIndex].permissions = permissions;
      setUserMembers(updatedMembers);
    }
  };
  
  const handleSameProfileChange = () => {
    if (!sameProfile) {
      const fieldsToUpdate = {
        nameOnBankAccount: form.getFieldValue('name'),
        addressOnBank: form.getFieldValue('address'),
        bankCity: form.getFieldValue('city'),
        bankState: form.getFieldValue('state'),
        bankZip: form.getFieldValue('zip'),
      };
  
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        form.setFieldValue(field, value);
        form.validateFields([field]);
      });
    }
    setSameProfile(prev => !prev);
  };

  const handleSetNoTip = () => {
    form.setFieldsValue({
      tipMode: ''
    });
    setTipMode('');
    setNoTip(prev => !prev);
  }

  const handleSetNoConvenienceFee = () => {
    form.setFieldsValue({
      fixedFeeMode: false,
      percentageFeeMode: false
    });
    setConvenienceFeeModes({percentageFeeMode: false, fixedFeeMode: false});
    setNoConvenienceFee(prev => !prev);
  }

  const handleAddNewMerchant = async () => {
    if(merchants.length){
      const lastMember = merchants[merchants.length - 1];
      if (lastMember === null) {
        message.error('MID is required!');
        return;
      }
    }
    setMerchants([...merchants, null]);
    setDescriptors([...descriptors, '']);
  };

  return (
    <div css={styles}>
      <Form<LocationCreateFormItem>
        form={form}
        name="create_location"
        initialValues={data}
        autoComplete="off"
        layout="vertical"
        className='setting-form'
      >
        <h2>Create New Location</h2>
        <Row className='subtitle-row'><Col><h3>Store Profile</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={4}>
            <Form.Item name="storeId">
              <Input placeholder="Store ID" className="w-full" readOnly={true} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="name" rules={[{ required: true, message: 'Please input the store name!' }]}>
              <Input placeholder="Location Entity Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="dbaName" >
              <Input placeholder="DBA Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="address" rules={[{ required: true, message: 'Please input the store address!' }]}>
              <Input placeholder="Store Address" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="suite" >
              <Input placeholder="Store Suite #" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="city" rules={[{ required: true, message: 'Please input the city!' }]}>
              <Input placeholder="City" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="state" rules={[{ required: true, message: 'Please select the state!' }]}>
              <MySelect
                className="w-full"
                options={selectStateOptions}
                placeholder="State"
                defaultValue={''}
                onChange={value => {
                  form.setFieldValue('state', value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="zip" rules={[{ required: true, message: 'Please input the zip code!' }]}>
              <Input placeholder="Zip" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row'><Col><h3>Location Contact Person</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={4}>
            <Form.Item name="contactName" rules={[{ required: true, message: 'Please input the store contact name!' }]}>
              <Input placeholder="Store Contact Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="contactPhone"
              rules={[{ required: true, message: 'Please input the store contact phone!' }]}
            >
              <Input placeholder="Store Contact Phone" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="contactEmail" rules={[{ required: true, message: 'Please input the email address!' }]}>
              <Input placeholder="Store Email Address" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className='subtitle-row'>
          <Col span={5}><h3>Bank Information For Deposit</h3></Col>
          <Col span={6}>
            <Checkbox checked={sameProfile} onChange={() => handleSameProfileChange()}>
              <h3>Same as Store Profile?</h3>
            </Checkbox>
          </Col>
        </Row>
        <Row gutter={16} className='nested-row'>
          <Col span={5}>
            <Form.Item
              name="nameOnBankAccount"
              rules={[{ required: true, message: 'Please input the name on bank account!' }]}
            >
              <Input placeholder="Name on Bank Account" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="addressOnBank" rules={[{ required: true, message: 'Please input the address on bank!' }]}>
              <Input placeholder="Address On Bank" className="w-full" readOnly={sameProfile}/>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="bankCity" rules={[{ required: true, message: 'Please input the bank city!' }]}>
              <Input placeholder="City" className="w-full"  readOnly={sameProfile}/>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="bankState" rules={[{ required: true, message: 'Please input the bank state!' }]}>
            <MySelect
              className="w-full"
              options={selectStateOptions}
              placeholder="State"
              defaultValue={''}
              onChange={value => {
                form.setFieldValue('bankState', value);
              }}
              disabled={sameProfile}
            />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="bankZip" rules={[{ required: true, message: 'Please input the bank zip code!' }]}>
              <Input placeholder="Zip" className="w-full" readOnly={sameProfile}/>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="bankName" rules={[{ required: true, message: 'Please input the bank name!' }]}>
              <Input placeholder="Bank Name" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="routingNumber"
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
          <Col span={5}>
            <Form.Item name="accountNumber" rules={[{ required: true, message: 'Please input the account number!' }]}>
              <Input
                placeholder="Account Number" className="w-full"
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace|Delete|Arrow/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className='nested-row' style={{marginTop: '10px'}}>
          <Col span={12}>
            <Row gutter={16} className='nested-row'>
              <Col span={10}>
                <h3>Upload Proof Of Ownership</h3>
              </Col>
              <Col span={6}>
                <Upload
                  fileList={fileList}
                  onChange={handleChange}
                  className="w-full"
                  maxCount={1}
                  beforeUpload={beforeUpload}
                >
                  <Button className="btn-yellow w-full">
                    <div>Upload</div>
                  </Button>
                </Upload>
              </Col>
            </Row>
            <Row gutter={16} className='nested-row'>
              <ul>
                <li>
                  <i>Upload Bank Letter or Voided Check of Proof of Ownership. </i>
                </li>
                <li>
                  <i>IF Name is Defferent Upload Articles and EIN Document for Proof of Ownership. </i>
                </li>
              </ul>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} className='nested-row'>
              <Col span={6}>
                <h3>Auto Batch Time</h3>
              </Col>
              <Col span={5}>
                <Button
                  className={`w-full ${autoTime ? 'btn-green' : ''}`}
                  onClick={() => handleAutoTimeChange(true)}
                >
                  Yes
                </Button>
              </Col>
              <Col span={5}>
                <Button
                  className={`w-full ${!autoTime ? 'btn-green' : ''}`}
                  // onClick={() => handleAutoTimeChange(false)}
                >
                  No
                </Button>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                Time - 4am EST, daily
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            <h3>Tip Settings</h3>
          </Col>
          <Col span={3}>
            <Form.Item name="noTip">
              <Checkbox checked={noTip} onChange={handleSetNoTip}>
                No Tipping
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            <Form.Item name="tipMode">
              <Checkbox checked={tipMode === 'percentage'} onChange={() => handleTipModeChange('percentage')}>
                Percentage Based
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount1">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount2">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount3">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipMode">
              <Checkbox checked={tipMode === 'fixed'} onChange={() => handleTipModeChange('fixed')}>
                Fixed Amount
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount4">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount5">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="tipAmount6">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            <h3>Convenience Fees</h3>
          </Col>
          <Col span={5}>
            <Form.Item name="noConvenienceFee">
              <Checkbox checked={noConvenienceFee} onChange={handleSetNoConvenienceFee}>
                No Convenience Fee
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            <Form.Item name="percentageFeeMode">
              <Checkbox
                checked={convenienceFeeModes.percentageFeeMode}
                onChange={() => handleConvenienceFeeChange('percentageFeeMode')}
              >
                Percentage Based
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="percentageFeeAmount">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={3}>
            <Form.Item name="fixedFeeMode">
              <Checkbox
                checked={convenienceFeeModes.fixedFeeMode}
                onChange={() => handleConvenienceFeeChange('fixedFeeMode')}
              >
                Fixed Amount
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="fixedFeeAmount">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row'><Col><h3>Processing fee</h3></Col></Row>
        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            <Form.Item name="percentageProcessingFeeMode">
              <Checkbox
                checked={processingFeeModes.percentageProcessingFeeMode}
                onChange={() => handleProcessingFeeChange('percentageProcessingFeeMode')}
              >
                Percentage Based
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="percentageProcessingFeeAmount">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={3}>
            <Form.Item name="fixedProcessingFeeMode">
              <Checkbox
                checked={processingFeeModes.fixedProcessingFeeMode}
                onChange={() => handleProcessingFeeChange('fixedProcessingFeeMode')}
              >
                Fixed Amount
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="fixedProcessingFeeAmount">
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <h3>Agent Name</h3>
          </Col>
          <Col span={4}>
          {!hasAnotherAgent &&
            <Button className={`w-full btn-green`} onClick={() => setHasAnotherAgent(true)}>
              Create Another Agent
            </Button>
          }
          </Col>
        </Row>
        <Row gutter={18} className='nested-row'>
          <Col span={6}>
            <Form.Item name="agent" rules={[{ required: true, message: 'AgentName is required!' }]}>
              <MySelect
                className="select-normal w-full"
                options={agents.map(d => ({label: d.agentInfo.agentCompanyName, value: d._id}))}
                placeholder="Agent Name"
                popupClassName="select-dropdown-normal"
                onSelect={handleAgentSelect}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={10}>
            <h3>Agent Buy Rate</h3>
          </Col>
          {isReadOnlyAgentBuyRate && 
            <Col span={3}>
              <Button className={`w-full btn-yellow`} onClick={() => setIsReadOnlyAgentBuyRate(false)}>
                Edit
              </Button>
            </Col>
          }
        </Row>
        <Row gutter={16} className='nested-row'>
          <Col span={3}>
            Amount
          </Col>
          <Col span={5}>
            <Form.Item name="commissionRatesAmount" rules={[{ required: true, message: 'Agent commission amount is required!' }]}>
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' readOnly={isReadOnlyAgentBuyRate} />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={3}>
            Per Transaction Amount
          </Col>
          <Col span={5}>
            <Form.Item name="perTransactionAmount" rules={[{ required: true, message: 'Agent per transaction amount is required!' }]}>
              <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`} readOnly={isReadOnlyAgentBuyRate}/>
            </Form.Item>
          </Col>
        </Row>

        { hasAnotherAgent && <>
          <Row className='subtitle-row'><Col><h3>Another Agent</h3></Col></Row>
          <Row gutter={16} className='nested-row'>
            <Col span={3}>
              Agent Name
            </Col>
            <Col span={5}>
              <Form.Item name="secondAgent" rules={[{ required: hasAnotherAgent, message: 'Second agent name is required!' }]}>
                <MySelect
                  className="select-normal w-full"
                  options={agents.map(d => ({label: d.agentInfo.agentCompanyName, value: d._id}))}
                  placeholder="Agent Name"
                  popupClassName="select-dropdown-normal"
                  onSelect={handleSecondAgentSelect}
                />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={2}>
              Amount
            </Col>
            <Col span={4}>
              <Form.Item name="secondCommissionRatesAmount" rules={[{ required: hasAnotherAgent, message: 'Second agent commission amount is required!' }]}>
                <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={3}>
              Per Transaction Amount
            </Col>
            <Col span={4}>
              <Form.Item name="secondPerTransactionAmount" rules={[{ required: hasAnotherAgent, message: 'Second agent per transaction amount is required!' }]}>
                <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`} />
              </Form.Item>
            </Col>
          </Row>
        </>}

        { showSubAgent && <>
          <Row className='subtitle-row'><Col><h3>Sub Agent BAKE IN Rate</h3></Col></Row>
          <Row gutter={16} className='nested-row'>
            <Col span={3}>
              Agent Name
            </Col>
            <Col span={5}>
              <Form.Item name="subAgent">
                <MySelect
                  className="select-normal w-full"
                  options={agents.map(d => ({label: d.agentInfo.agentCompanyName, value: d._id}))}
                  placeholder="Agent Name"
                  popupClassName="select-dropdown-normal"
                  onSelect={handleSubAgentSelect}
                />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={2}>
              Amount
            </Col>
            <Col span={4}>
              <Form.Item name="subCommissionRatesAmount">
                <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={100} precision={2} addonAfter='%' />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={3}>
              Per Transaction Amount
            </Col>
            <Col span={4}>
              <Form.Item name="subPerTransactionAmount">
                <MyInputNumber className='w-full' placeholder='Enter Amount' min={0} max={1000} precision={2} addonBefore='$' css={css`.ant-input-number-input{padding-left: 3px}`} />
              </Form.Item>
            </Col>
          </Row>
        </>}
      </Form>

      <Form form={usersForm} name="basic" onFinish={handleSubmit} autoComplete="off" className="setting-form" style={{marginTop: '10px'}}>
        <Row gutter={16}>
          <Col span={8}>
            <h3>Users & Permissions</h3>
          </Col>
          <Col span={4}>
            <Button className={`w-full btn-green`} onClick={handleAddNewUser}>
              Create New User
            </Button>
          </Col>
        </Row>
        {userMembers.map((member, index) => (
          <Row gutter={16} key={index} className='nested-row'>
            <Col span={6}>
              <Form.Item 
                name={`name${index}`} 
                rules={[
                    { required: true, message: 'Name is required!' },
                    { validator: (_, value) => {
                        const nameExists = userMembers.some((m, i) => m.name === value && i !== index);
                        return nameExists ? Promise.reject('Name must be unique!') : Promise.resolve();
                    }},
                ]}
              >
                <Input
                    className="w-full"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => handleNameChange(index, e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item 
                name={`pin${index}`} 
                rules={[
                    { required: true, message: 'PIN is required!' },
                    {
                      len: 4,
                      message: 'PIN Should be 4 Digits',
                    },
                    { validator: (_, value) => {
                        const pinExists = userMembers.some((m, i) => m.pin === value && i !== index);
                        return pinExists ? Promise.reject('PIN must be unique!') : Promise.resolve();
                    }},
                ]}
              >
                <Input
                  className="w-full"
                  placeholder="PIN"
                  value={member.pin}
                  maxLength={4}
                  onKeyDown={(e) => {
                    if (!/[0-9]|Backspace|Delete|Arrow/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={e => handlePinChange(index, e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Button className="btn-yellow w-full" onClick={() => handlePermissionMember(index)}>
                Permissions
              </Button>
            </Col>
            <Col span={3}>
              <Button className="btn-red w-full" onClick={() => handleDeleteMember(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </Form>

      <Form
        form={reportForm}
        name="basic"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className="setting-form"
        style={{marginTop: '10px'}}
        onFinish={handleSubmit}
      >
        <Row gutter={16} className='nested-row'>
          <Col span={8}>
            <h3>Send Reports To</h3>
          </Col>
          <Col span={4}>
            <Form.Item name="createReport">
              <Button className={`w-full btn-green`} onClick={handleAddNewReport}>
                Create New Report User
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {reportUsers.map((reportUser, index) => (
          <Row gutter={16} key={index} className='nested-row'>
            <Col span={4}>
              <Form.Item<ReportUserInterface>
                name={`reportName${index}`}
                rules={[{ required: true, message: 'Name is required!' }]}
              >
                <Input
                  className="w-full"
                  placeholder="Name"
                  readOnly={reportUser.readOnly}
                  value={reportUser.name}
                  onChange={e => {
                    const updatedReportUsers = [...reportUsers];

                    updatedReportUsers[index].name = e.target.value;
                    setReportUsers(updatedReportUsers);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<ReportUserInterface>
                name={`reportEmail${index}`}
                rules={[{ required: true, message: 'Email is required!' }]}
              >
                <Input
                  className="w-full"
                  placeholder="Email"
                  readOnly={reportUser.readOnly}
                  value={reportUser.email}
                  onChange={e => {
                    const updatedReportUsers = [...reportUsers];

                    updatedReportUsers[index].email = e.target.value;
                    setReportUsers(updatedReportUsers);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<ReportUserInterface>
                name={`reportPhoneNumber${index}`}
                rules={[{ required: true, message: 'Phone Number is required!' }]}
              >
                <Input
                  className="w-full"
                  placeholder="Phone Number"
                  readOnly={reportUser.readOnly}
                  value={reportUser.phone}
                  onChange={e => {
                    const updatedReportUsers = [...reportUsers];

                    updatedReportUsers[index].phone = e.target.value;
                    setReportUsers(updatedReportUsers);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<ReportUserInterface>
                name={`reportType${index}`}
                rules={[{ required: true, message: 'Report type is required!' }]}
              >
                <MySelect
                  className="select-normal w-full"
                  options={selectReportTypeOptions}
                  placeholder="Report Type"
                  defaultValue={'Report Type'}
                  popupClassName="select-dropdown-normal"
                  value={reportUser.type}
                  disabled={reportUser.readOnly}
                  onChange={value => {
                    const updatedReportUsers = [...reportUsers];

                    updatedReportUsers[index].type = value;
                    setReportUsers(updatedReportUsers);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button className="btn-red" onClick={() => handleDeleteReport(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </Form>

      <Form<LocationCreateFormItem>
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className="setting-form"
      >
        <Row gutter={16}>
          <Col span={6}><h3>MID</h3></Col>
          <Col span={4}>
            <Button className={`w-full btn-green`} onClick={handleAddNewMerchant}>
              Add New MID
            </Button>
          </Col>
        </Row>
        { merchants.map((merchant, index) => 
          (<Row gutter={16}>
            <Col span={6}>
              <MySelect
                placeholder="Select Merchant Account"
                className='w-full'
                value={merchant}
                options={merchant_accounts.map(d => ({label: d.iso_name, value: d._id}))}
                onSelect={(val: string|null) => handleMerchantSelect(val, index)}
              />
            </Col>
            <Col span={4}>
              <Input placeholder="Descriptor" className="w-full" disabled value={descriptors[index]} />
            </Col>
            <Col span={3}>
              <Button className="btn-red w-full" onClick={() => handleDeleteMerchant(index)}>
                Delete
              </Button>
            </Col>
          </Row>)
        )}

        <Row className='subtitle-row'><Col><h3>Enterprise Name</h3></Col></Row>
        <Row gutter={18} className='nested-row'>
          <Col span={6}>
            <Form.Item name="enterprise" >
              <MySelect
                className="select-normal w-full"
                options={enterprises.map(d => ({label: d.name, value: d._id}))}
                placeholder="Enterprise Name"
                popupClassName="select-dropdown-normal"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className='subtitle-row' gutter={16}>
          <Col span={3}><h3>Live</h3></Col>
          <Col span={1}>
            <Form.Item name="live" >
              <Switch checked={isLiveStore} onChange={() => setIsLiveStore(!isLiveStore)} />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={3}><h3>Timezone</h3></Col>
          <Col span={5}>
            <Form.Item name="timezone" rules={[{ required: true, message: 'Timezone is required!' }]}>
              <MySelect
                className="w-full"
                placeholder='Timezone'
                options={moment.tz.names().map(d => ({label: d, value: d}))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={10}>
          <Button className={`w-full btn-active`} htmlType="submit" onClick={handleSubmit}>
            Create New Merchant Location
          </Button>
        </Col>
      </Row>
      <Dialog open={openProcessingFree} onClose={handleCloseProcessingFree}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
            <h3>Processing fee is mandatory (select either Percentage Based or Fixed Amount)</h3>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseProcessingFree} className={`btn-active`}>
                OK
            </Button>
        </DialogActions>
      </Dialog>
      <UserPermissionFormDialog
        css={styles}
        className="title-center"
        onClose={onUserPermissionClose}
        ref={dialogRefUserPermission}
        title="User Permissions"
      ></UserPermissionFormDialog>
      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="no" onClick={handleModalCancel}>
              No
          </Button>,
          <Button key="yes" type="primary" className="btn-active" onClick={handleModalOk}>
              Yes
          </Button>,
        ]}
      >
        <p>Are you sure no TIP or Convenience fees apply here?</p>
      </Modal>
    </div>
  );
};

export default withDialog(CreateLocationDialog);
const styles = css`
  .btn-active {
    height: 42px;
    border-radius: 30px;
  },
  .input-suffix {
    display: inline-block;
    padding: 0 10px;
    line-height: 32px;
  }
`;
