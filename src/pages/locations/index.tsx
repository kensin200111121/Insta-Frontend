import type { LocationCreateFormItem, LocationListItem } from '@/interface/data/location.interface';
import type { DialogMethod } from '@/types/props/dialog.type';
import type { FC } from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiGetLocationById } from '@/api/pages/location.api';
import { MyButton, MyInput, MyPage } from '@/components/basic';
import MyTable from '@/components/core/table';
import CreateLocationFormDialog from '@/components/dialogs/create-location';
import EditLocationFormDialog from '@/components/dialogs/edit-location';
import { USER_ROLE } from '@/interface/user/login';
import exportToExcel from '@/utils/exportToExcel';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';
import type { NoteLocationFormData } from '@/components/dialogs/note-location';
import NoteLocationFormDialog from '@/components/dialogs/note-location';
import { GetLocationStatisticsAsync } from './store/action';
import TerminallistFormDialog from '@/components/dialogs/terminallist-form';

const LocationPage: FC = () => {
  const dispatch = useDispatch();
  const { locationStatistics } = useSelector(state => state.location);
  const { role } = useSelector(state => state.user);
  const dialogRefCreate = useRef<DialogMethod<LocationCreateFormItem>>(null);
  const dialogRefEdit = useRef<DialogMethod<LocationCreateFormItem>>(null);
  const dialogRefNote = useRef<DialogMethod<NoteLocationFormData>>(null);
  const terminalListDialogRef = useRef<DialogMethod<string>>(null);

  useEffect(() => {
    dispatch(GetLocationStatisticsAsync());
  }, []);

  const onOpenCreate = () => {
    dialogRefCreate.current?.open({
      _id: '',
      name: '',
      dbaName: '',
      address: '',
      suite: '',
      city: '',
      state: '',
      zip: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      nameOnBankAccount: '',
      addressOnBank: '',
      bankCity: '',
      bankState: '',
      bankZip: '',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      isAutoBatchTime: true,
      cryptoType: 'USDT',
      tipMode: '',
      noTip: false,
      noConvenienceFee: false,
      tipAmounts: [],
      percentageFeeMode: false,
      percentageFeeAmount: '0',
      fixedFeeMode: false,
      fixedFeeAmount: '0',
      percentageProcessingFeeMode: false,
      percentageProcessingFeeAmount: '0',
      fixedProcessingFeeMode: false,
      fixedProcessingFeeAmount: '0',
      ownershipProof: {
        name: '',
        link: '',
      },
      userMembers: [],
      reportUsers: [],
      terminals: [],
      merchants: [],
      tipAmount1: '0',
      tipAmount2: '0',
      tipAmount3: '0',
      tipAmount4: '0',
      tipAmount5: '0',
      tipAmount6: '0',
      storeId: '',
      commissionRatesAmount: '',
      perTransactionAmount: '',
      agent: '',
      enterprise: '',
      secondAgent: '',
      secondCommissionRatesAmount: '',
      secondPerTransactionAmount: '',
      subAgent: '',
      subCommissionRatesAmount: '',
      subPerTransactionAmount: '',
      live: false,
      timezone: ''
    });
  };

  const handleExport = () => {
    exportToExcel(locationStatistics, columns, 'Locations');
  };

  const onOpenEdit = (val: string, record: LocationListItem) => {
    const storeId = record._id;

    apiGetLocationById(storeId).then(res => {
      if (res.status) {
        const tipMode = res.result.data.tipMode;
        const tipAmounts = res.result.data.tipAmounts || [];
        const agents = res.result.data.agents || [];
        const firstAgent = agents[0];
        const secondAgent = agents[1]?.type === 0 ? agents[1] : undefined;
        const subAgent = agents.find(d => d.type == 1);
        dialogRefEdit.current?.open({
          _id: res.result.data._id || '',
          name: res.result.data.name || '',
          dbaName: res.result.data.dbaName || '',
          storeId: res.result.data.storeId || '',
          address: res.result.data.storeInfo.address || '',
          suite: res.result.data.storeInfo.suite || '',
          city: res.result.data.storeInfo.city || '',
          state: res.result.data.storeInfo.state || '',
          zip: res.result.data.storeInfo.zip || '',
          contactName: res.result.data.contactInfo?.name || '',
          contactPhone: res.result.data.contactInfo?.phone || '',
          contactEmail: res.result.data.contactInfo?.email || '',
          nameOnBankAccount: res.result.data.bankInfo.name || '',
          addressOnBank: res.result.data.bankInfo.address || '',
          bankCity: res.result.data.bankInfo.city || '',
          bankState: res.result.data.bankInfo.state || '',
          bankZip: res.result.data.bankInfo.zip || '',
          bankName: res.result.data.bankInfo.bankName || '',
          routingNumber: res.result.data.bankInfo.routingNumber || '',
          accountNumber: res.result.data.bankInfo.accountNumber || '',
          isAutoBatchTime: res.result.data.isAutoBatchTime !== undefined ? res.result.data.isAutoBatchTime : true,
          cryptoType: res.result.data.cryptoType || 'USDT',
          tipMode: tipMode || '',
          noTip: res.result.data.noTip,
          noConvenienceFee: res.result.data.noConvenienceFee,
          tipAmounts: tipAmounts || [],
          percentageFeeMode: res.result.data.percentageFeeMode !== undefined ? res.result.data.percentageFeeMode : false,
          percentageFeeAmount: res.result.data.percentageFeeAmount || '0',
          percentageProcessingFeeMode: res.result.data.percentageProcessingFeeMode !== undefined ? res.result.data.percentageProcessingFeeMode : false,
          percentageProcessingFeeAmount: res.result.data.percentageProcessingFeeAmount || '0',
          fixedFeeMode: res.result.data.fixedFeeMode !== undefined ? res.result.data.fixedFeeMode : false,
          fixedFeeAmount: res.result.data.fixedFeeAmount || '0',
          fixedProcessingFeeMode: res.result.data.fixedProcessingFeeMode !== undefined ? res.result.data.fixedProcessingFeeMode : false,
          fixedProcessingFeeAmount: res.result.data.fixedProcessingFeeAmount || '0',
          ownershipProof: {
            name: '',
            link: '',
          },
          userMembers: res.result.userMembers,
          reportUsers: res.result.reportUsers,
          terminals: res.result.terminals,
          tipAmount1: (tipMode === 'percentage' ? tipAmounts[0] || 0 : 0) + '',
          tipAmount2: (tipMode === 'percentage' ? tipAmounts[1] || 0 : 0) + '',
          tipAmount3: (tipMode === 'percentage' ? tipAmounts[2] || 0 : 0) + '',
          tipAmount4: (tipMode === 'fixed' ? tipAmounts[0] || 0 : 0) + '',
          tipAmount5: (tipMode === 'fixed' ? tipAmounts[1] || 0 : 0) + '',
          tipAmount6: (tipMode === 'fixed' ? tipAmounts[2] || 0 : 0) + '',
          merchants: res.result.data.merchants,
          live: res.result.data.live,
          timezone: res.result.data.timezone,
          agent: firstAgent?.agent ?? '',
          enterprise: res.result.data.enterprise,
          commissionRatesAmount: firstAgent?.commissionRatesAmount ?? '',
          perTransactionAmount: firstAgent?.perTransactionAmount ?? '',
          secondAgent: secondAgent?.agent ?? '',
          secondCommissionRatesAmount: secondAgent?.commissionRatesAmount ?? '',
          secondPerTransactionAmount: secondAgent?.perTransactionAmount ?? '',
          subAgent: subAgent?.agent ?? '',
          subCommissionRatesAmount: subAgent?.commissionRatesAmount ?? '',
          subPerTransactionAmount: subAgent?.perTransactionAmount ?? ''
        });
      }
    });
  };

  const onOpenNote = (val: string, record: LocationListItem) => {
    dialogRefNote.current?.open({
      id: record._id,
      notes: val,
      ownershipProof: record.ownershipProof,
    });
  };

  const onTerminalListOpen = (store_id: string) => {
      terminalListDialogRef.current?.open(store_id);
  };

  const onLoginStore = (val: string, record: LocationListItem) => {};

  const onClose = () => {
    dispatch(GetLocationStatisticsAsync());
  };

  const columns = [
    {
      title: 'Location Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (val: string, record: LocationListItem) => (
        <a
          onClick={() => {
            onOpenEdit(val, record);
          }}
        >
          {val}
        </a>
      ),
      renderExport: (val: string) => val
    },
    {
      title: 'DBA Name',
      dataIndex: 'dbaName',
      key: 'dbaName',
      width: 120
    },
    {
      title: 'Location ID',
      dataIndex: 'storeId',
      key: 'storeId',
      width: 120
    },
    {
      title: 'Agent Name',
      dataIndex: 'agent_name',
      key: 'agent_name',
      width: 120,
    },
    {
      title: 'MTD TX #',
      dataIndex: 'mtd_transaction_count',
      key: 'mtd_transaction_count',
      width: 100
    },
    {
      title: 'MTD Volume',
      dataIndex: 'mtd_volume',
      key: 'mtd_volume',
      width: 100,
      render: (val: number) => getPriceNumber(val)
    },
    {
      title: 'Avg Daily Volume',
      dataIndex: 'avg_daily_volume',
      key: 'avg_daily_volume',
      width: 150,
      render: (val: number) => getPriceNumber(val)
    },
    {
      title: 'Avg Ticket',
      dataIndex: 'avg_ticket',
      key: 'avg_ticket',
      width: 100,
      render: (val: number) => getPriceNumber(val)
    },
    {
      title: 'DB %',
      dataIndex: 'db',
      key: 'db',
      width: 80,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: 'CR %',
      dataIndex: 'cr',
      key: 'cr',
      width: 80,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: 'Visa %',
      dataIndex: 'visa',
      key: 'visa',
      width: 80,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: 'MC %',
      dataIndex: 'mc',
      key: 'mc',
      width: 80,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: 'Discover %',
      dataIndex: 'discover',
      key: 'discover',
      width: 100,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: 'Amex %',
      dataIndex: 'amex',
      key: 'amex',
      width: 80,
      render: (val: number) => `${getFormatedNumber(val, 0)}%`,
    },
    {
      title: '# of Terminals',
      dataIndex: 'of_terminals',
      key: 'of_terminals',
      width: 150,
      render: (value: string) => {
        return `${Number(value) === 0 ? '0.0' : `${value}`}`;
      },
    },
    ...(role === USER_ROLE.admin ? [
      {
        title: 'Descriptor',
        dataIndex: 'descriptor',
        key: 'descriptor',
        width: 200,
        render: (val: string) => {
          return `${val.length === 0 ? 'descriptor' : `${val}`}`;
        },
      }
    ]: []),
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (val: string, record: LocationListItem) => {
        const handleClick = () => onOpenNote(val, record);
        const linkText = val?.length || record.ownershipProof.name ? 'See Notes' : 'Add Notes';

        return <a onClick={handleClick}>{linkText}</a>;
      },
      renderExport: (val: string) => val
    },
    {
      title: 'Terminals',
      export: false,
      render: (val:any, record:LocationListItem) => (<a onClick={() => onTerminalListOpen(record._id)}>See Terminals</a>)
    },
    ...(role === USER_ROLE.admin ? [
      {
        title: 'Log in as Store',
        dataIndex: 'log_in_as_store',
        key: 'log_in_as_store',
        render: (val: string, record: LocationListItem) => {
          const handleClick = () => onLoginStore(val, record);

          return (
            <Button className="btn-yellow" onClick={handleClick}>
              Log in
            </Button>
          );
        },
        export: false
      }
    ]: []),
  ];

  return (
    <MyPage
      title={`Locations: ${getFormatedNumber(locationStatistics?.length ?? 0, 0)}`}
      header={
        <>
          <MyInput placeholder="Enter Store Name or Transaction ID"></MyInput>
          <button className="btn-search">
            <SearchOutlined />
          </button>
        </>
      }
      headerActions={
        <>
          <MyButton className="btn-info" onClick={handleExport}>
            Export <DownloadOutlined />
          </MyButton>
          {role == USER_ROLE.admin && (
            <>
              <MyButton className="btn-info" style={{ width: '178px' }} onClick={() => onOpenCreate()}>
                Create New Location
              </MyButton>
            </>
          )}
        </>
      }
    >
      <MyTable dataSource={locationStatistics} columns={columns} rowKey={record => record._id} pagable ShowAll />
      <CreateLocationFormDialog
        css={styles}
        className="create-location-form"
        onClose={onClose}
        ref={dialogRefCreate}
        title=""
        shouldCheckConfirmation
      ></CreateLocationFormDialog>
      <EditLocationFormDialog
        css={styles}
        className="edit-location-form"
        onClose={onClose}
        ref={dialogRefEdit}
        title=""
        shouldCheckConfirmation
      ></EditLocationFormDialog>
      <NoteLocationFormDialog
        className="title-center"
        onClose={onClose}
        ref={dialogRefNote}
        title="Notes for Location"
      ></NoteLocationFormDialog>
      <TerminallistFormDialog onClose={() => {}} ref={terminalListDialogRef} title="Terminals List" />
    </MyPage>
  );
};

export default LocationPage;

const styles = css`
  width: auto !important;
  .ant-modal-content {
    width: 1400px;
    padding-bottom: 30px;
    margin: auto;
  }
`;
