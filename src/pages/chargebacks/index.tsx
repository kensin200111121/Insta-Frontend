import type { FightChargebackFormData } from '@/components/dialogs/fight-chargeback';
import type { NewChargebackFormData } from '@/components/dialogs/new-chargeback';
import type { NoteChargebackFormData } from '@/components/dialogs/note-chargeback';
import type { ChargebackItem } from '@/interface/data/chargeback.interface';
import type { StoreInfo } from '@/interface/data/store.interface';
import type { DialogMethod } from '@/types/props/dialog.type';
import type { FC } from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton, MyDatePicker, MyInput, MyPage } from '@/components/basic';
import MyTable from '@/components/core/table';
import FightChargebackFormDialog from '@/components/dialogs/fight-chargeback';
import NewChargebackFormDialog from '@/components/dialogs/new-chargeback';
import NoteChargebackFormDialog from '@/components/dialogs/note-chargeback';
import ConfirmChargebackStatusFormDialog, {ConfirmChargebackStatusFormData} from '@/components/dialogs/confirm-chargebackstatus';
import { USER_ROLE } from '@/interface/user/login';
import { chargebackStatusOptions, chargebackStatusColors } from '@/patterns/selectOptions';
import exportToExcel from '@/utils/exportToExcel';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';

import { GetChargebacksAsync, SetChargebackStatusAsync } from './store/action';
import StatusCell from '../support_tickets/StatusCell';
import { TablePaginationConfig } from 'antd';
import { apiGetChargebacks } from '@/api/pages/chargeback.api';

const ChargebackPage: FC = () => {
  const dispatch = useDispatch();
  const { chargebacks, total } = useSelector(state => state.chargeback);
  const { role, timezone } = useSelector(state => state.user);
  const [ pagination, setPagination ] = useState<TablePaginationConfig>({});
  const [ filters, setFilters ] = useState<Record<string, any>>({});
  const [ dateRange, setDateRange ] = useState<string[]>([]);
  const [ searchKey, setSearchKey ] = useState('');

  const handleTableChange = (pagination: TablePaginationConfig, filtersInTable: Record<string, any>, sorter: any) => {
    setPagination(pagination);
    setFilters({...filters, ...filtersInTable});
  };

  const handleShowAll = () => {
    dispatch(GetChargebacksAsync({pagination: {}, filters}));
  }

  const handleChangeDateRange = (range1: any, range2: string[]) => {
    if(range2[0].length && range2[1].length){
      setDateRange(range2);
    }else{
      setDateRange([]);
    }
  }
    
  const handleSearch = () => {
    setFilters({...filters, dateFilter: dateRange.map(date => moment.tz(date, 'YYYY-MM-DD', timezone).format()), searchKey})
  }

  useEffect(() => {
    if(Object.keys(pagination).length || Object.keys(filters).length){
      dispatch(GetChargebacksAsync({pagination, filters}));
    }
  }, [pagination, filters]);
  
  const dialogRefFight = useRef<DialogMethod<FightChargebackFormData>>(null);
  const dialogRefNew = useRef<DialogMethod<NewChargebackFormData>>(null);
  const dialogRefNote = useRef<DialogMethod<NoteChargebackFormData>>(null);
  const dialogRefChange = useRef<DialogMethod<ConfirmChargebackStatusFormData>>(null);

  const onCloseChange = async (data?: ConfirmChargebackStatusFormData) => {
    if(data){
      dispatch(SetChargebackStatusAsync(data));
    }
  };

  const onOpenFight = (record: ChargebackItem) => {
    dialogRefFight.current?.open({ id: record._id, transaction_id: record.transaction_id, amount: record.amount });
  };

  const onOpenNew = () => {
    dialogRefNew.current?.open({
      _id: '',
      transaction_id: '',
      amount: 0,
      customer_name: '',
      phone: '',
    });
  };

  const onOpenNote = (val: string, record: ChargebackItem) => {
    dialogRefNote.current?.open({
      id: record._id,
      notes: val,
    });
  };

  const onClose = () => {
  };

  const handleExport = async () => {
    const { result, status } = await apiGetChargebacks({filters});
    if(status){
      exportToExcel(result.data, columns, 'Chargebacks');
    }else{
      console.log('error in export');
    }
  };

  const columns = [
    {
      title: 'Date of Original TX',
      render: (val: any, record: ChargebackItem) => (<div style={{minWidth: '130px'}}>{moment.tz(record.created_at, timezone).format('MM/DD/YYYY')}</div>),
      renderExport: (val: any, record: ChargebackItem) => moment.tz(record.created_at, timezone).format('MM/DD/YYYY')
    },
    {
      title: 'Time',
      render: (val: any, record: ChargebackItem) => moment.tz(record.created_at, timezone).format('HH:MM:SS'),
    },
    ...(role === USER_ROLE.admin ? [
      {
        title: 'Location Name',
        dataIndex: 'store',
        key: 'store',
        render: (val: StoreInfo) => (<div style={{minWidth: '100px'}}>{val?.name}</div>),
        renderExport: (val: StoreInfo) => val?.name
      },
      {
        title: 'DBA Name',
        dataIndex: 'store',
        key: 'store',
        render: (val: StoreInfo) => (<div style={{minWidth: '70px'}}>{val?.dbaName}</div>),
        renderExport: (val: StoreInfo) => val?.dbaName
      },
      {
        title: 'Location ID',
        dataIndex: 'store',
        key: 'store',
        render: (val: StoreInfo) => (<div style={{minWidth: '80px'}}>{val?.storeId}</div>),
        renderExport: (val: StoreInfo) => val?.storeId
      },
    ] : []),
    {
      title: 'Chargeback Date',
      dataIndex: 'charged_at',
      key: 'charged_at',
      render: (val: Date) => (<div style={{minWidth: '120px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>),
      renderExport: (val: Date) => moment.tz(val, timezone).format('MM/DD/YYYY')
    },
    {
      title: 'Last Response Date',
      dataIndex: 'respond_at',
      key: 'respond_at',
      render: (val: Date) => (<div style={{minWidth: '130px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>),
      renderExport: (val: Date) => moment.tz(val, timezone).format('MM/DD/YYYY')
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (val: string) => (<div style={{minWidth: '120px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (val: string) => (<div style={{minWidth: '60px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: 'pending' | 'lost' | 'won', record: ChargebackItem) => (
        val == 'pending' ? (
          <StatusCell<string>
            recordId={record._id || ''}
            status={val}
            minWidth={140}
            options={chargebackStatusOptions}
            colors={chargebackStatusColors}
            onChange={handleStatusChange}
            disabled={role == USER_ROLE.user}
          />
        ) : (
          <div className={`text-${chargebackStatusColors[val]}`} style={{minWidth: '100px'}}>
            {chargebackStatusOptions.find(d => d.value == val)?.label || ''}
          </div>
        )
      ),
      renderExport: (val: 'pending' | 'lost' | 'won') => chargebackStatusOptions.find(d => d.value == val)?.label || ''
    },
    {
      title: 'Evidence Uploaded',
      dataIndex: 'evidence',
      key: 'evidence',
      render: (val: { name: string; link: string }) =>
        (<div style={{ minWidth: '130px' }}>{val?.link && (
          <a className="link" href={val.link} target="_blank">
            {val.name}
          </a>
        )}</div>),
      renderExport: (val: { name: string; link: string }) => val?.link,
    },
    {
      export: false,
      title: 'Fight Chargeback',
      render: (val: any, record: ChargebackItem) =>
        (<div style={{ minWidth: '120px' }}>{!(record.evidence?.link || record.status == 'won' || record.status == 'lost' ) && <MyButton onClick={() => onOpenFight(record)}>Fight Chargeback</MyButton>}</div>),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (val: string, record: ChargebackItem) => {
        const handleClick = () => onOpenNote(val, record);
        const linkText = val?.length ? 'See Notes' : 'Add Notes';
        return <a onClick={handleClick}>{linkText}</a>;
      },
      renderExport: (val: string) => val
    }
  ];

  const handleStatusChange = (_id: string, status: string) => {
    if(status != 'pending'){
      dialogRefChange.current?.open({_id, status});
    }
    return false;
  };
  
  return (
    <MyPage
      title={`Chargebacks: ${getFormatedNumber(total, 0)}`}
      header={
        <>
          <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
          <MyInput placeholder="Enter Name / Transaction ID / Phone Number" onChange={e => setSearchKey(e.target.value)} />
          <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
        </>
      }
      headerActions={
        <>
          {role == USER_ROLE.user && (
            <MyButton className="btn-info" onClick={handleExport}>
              Export <DownloadOutlined />
            </MyButton>
          )}
          {role == USER_ROLE.admin && (
            <MyButton className="btn-info" style={{ width: '168px' }} onClick={() => onOpenNew()}>
              Enter New Chargeback
            </MyButton>
          )}
        </>
      }
    >
      <MyTable
        dataSource={chargebacks}
        columns={columns}
        rowKey={record => record._id}
        pagable
        ShowAll
        onTableChange={handleTableChange}
        onShowAll={handleShowAll}
        total={total}
      />
      <FightChargebackFormDialog
        className="title-center"
        onClose={onClose}
        ref={dialogRefFight}
        title="Fight Chargeback"
      ></FightChargebackFormDialog>
      <NewChargebackFormDialog
        className="title-center"
        onClose={onClose}
        ref={dialogRefNew}
        title="New Chargeback"
      ></NewChargebackFormDialog>
      <NoteChargebackFormDialog
        className="title-center"
        onClose={onClose}
        ref={dialogRefNote}
        title="Enter Notes for this Chargeback"
      ></NoteChargebackFormDialog>
      <ConfirmChargebackStatusFormDialog onClose={onCloseChange} ref={dialogRefChange} title="Confirm" />
    </MyPage>
  );
};

export default ChargebackPage;
