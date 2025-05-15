import type { RefundCreateRequest, RefundItem } from '@/interface/data/refund.interface';
import type { FC } from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton, MyDatePicker, MyInput, MyPage } from '@/components/basic';
import MyTable from '@/components/core/table';
import { USER_ROLE } from '@/interface/user/login';
import exportToExcel from '@/utils/exportToExcel';
import ConfirmRefundFormDialog, {ConfirmRefundFormData} from '@/components/dialogs/confirm-refund';
import InputRefundFromDialog from '@/components/dialogs/confirm-refund/InputRefund';
import { DialogMethod } from '@/types/props/dialog.type';

import { CreateRefundAsync, GetRefundsAsync } from './store/action';
import { TransactionItem } from '@/interface/data/transaction.interface';
import { GetTransactionsAsync } from '../transactions/store/action';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';
import { TablePaginationConfig } from 'antd';
import { apiGetRefunds } from '@/api/pages/refund.api';

const RefundPage: FC = () => {
  const dispatch = useDispatch();
  const { refunds, total } = useSelector(state => state.refund);
  const { transactions } = useSelector(state => state.transaction);
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
    dispatch(GetRefundsAsync({pagination: {}, filters}));
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
      dispatch(GetRefundsAsync({pagination, filters}));
    }
  }, [pagination, filters]);

  useEffect(() => {
    dispatch(GetTransactionsAsync({pagination: {}, filters: {}, sorter: {}}));
  }, []);

  const confirmDialogRef = useRef<DialogMethod<ConfirmRefundFormData>>(null);
  const inputDialogRef = useRef<DialogMethod<TransactionItem[]>>(null);

  const onConfirmOpen = (data: ConfirmRefundFormData) => {
    confirmDialogRef.current?.open(data);
  };

  const onConfirmClose = (data?: ConfirmRefundFormData) => {
    if (data) {
      const index = transactions.findIndex(t => t.transaction_id == data.transaction_id);

      if (index >= 0) {
        const transaction: TransactionItem = transactions[index];
        const refundData: RefundCreateRequest = {
          transaction_id: transaction._id,
          amount: data.refundAmount,
        };

        dispatch(CreateRefundAsync(refundData));
      }
    }
  };

  const onInputOpen = () => {
    inputDialogRef.current?.open(transactions.filter(t => (!t.isRefunded && t.type == 0 && transactions.findIndex(data => data.transaction_id == t.transaction_id + '-CB') < 0)));
  };

  const onInputClose = (data?: ConfirmRefundFormData) => {
    if (data) {
      onConfirmOpen(data);
    }
  };

  const handleExport = async () => {
    const { result, status } = await apiGetRefunds({filters});
    if(status){
      exportToExcel(result.data, columns, 'Refunds');
    }else{
      console.log('error in export');
    }
  };

  const columns = [
    {
      title: 'Original Tx Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (val: Date) => (<div style={{minWidth: '110px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>),
      renderExport: (val: Date) => moment.tz(val, timezone).format('MM/DD/YYYY')
    },
    {
      title: 'Refund Date',
      dataIndex: 'refunded_at',
      key: 'refunded_at',
      render: (val: Date) => (<div style={{minWidth: '80px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>),
      renderExport: (val: Date) => moment.tz(val, timezone).format('MM/DD/YYYY')
    },
    {
      title: 'Time',
      render: (val: any, record: RefundItem) => moment.tz(record.refunded_at, timezone).format('hh:mm:ss A'),
    },
    ...(role === USER_ROLE.admin ? [
      {
        title: 'Location Name',
        render: (val: any, record: RefundItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>),
        renderExport: (val: any, record: RefundItem) => record.store?.name
      },
      {
        title: 'DBA Name',
        render: (val: any, record: RefundItem) => (<div style={{minWidth: '70px'}}>{record.store?.dbaName}</div>),
        renderExport: (val: any, record: RefundItem) => record.store?.dbaName
      },
      {
        title: 'Location ID',
        render: (val: any, record: RefundItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>),
        renderExport: (val: any, record: RefundItem) => record.store?.storeId
      }
    ]: []),
    {
      title: 'User Name',
      render: (val: any, record: RefundItem) => (<div style={{minWidth: '80px'}}>{record.user?.name}</div>),
      renderExport: (val: any, record: RefundItem) => record.user?.name
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
      title: 'Original Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: number) => (<div style={{minWidth: '120px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Refunded Amount',
      dataIndex: 'refund',
      key: 'refund',
      render: (val: number) => (<div style={{minWidth: '120px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    }
  ];

  return (
    <MyPage
      title={`Refunds: ${getFormatedNumber(total, 0)}`}
      header={
        <>
          <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
          <MyInput placeholder="User Name / Phone Number / Transaction ID" onChange={e => setSearchKey(e.target.value)} />
          <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
        </>
      }
      headerActions={
        <>
          <MyButton className="btn-info" onClick={handleExport}>
            Export <DownloadOutlined />
          </MyButton>
          {role == USER_ROLE.admin && (
            <MyButton className="btn-primary" style={{ width: '168px' }} onClick={onInputOpen}>
              Create New Refund
            </MyButton>
          )}
        </>
      }
    >
      <MyTable dataSource={refunds} columns={columns} rowKey={record => record._id} pagable ShowAll
        onTableChange={handleTableChange} onShowAll={handleShowAll} total={total} />
      <ConfirmRefundFormDialog className="title-center" onClose={onConfirmClose} ref={confirmDialogRef} title="Refund Confirmation" />
      <InputRefundFromDialog className="title-center" onClose={onInputClose} ref={inputDialogRef} title="Create New Refund" />
    </MyPage>
  );
};

export default RefundPage;
