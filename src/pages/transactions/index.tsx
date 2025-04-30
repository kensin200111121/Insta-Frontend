import type { ConfirmRefundFormData } from '@/components/dialogs/confirm-refund';
import type { RefundCreateRequest } from '@/interface/data/refund.interface';
import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { DialogMethod } from '@/types/props/dialog.type';
import type { FC } from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton, MyDatePicker, MyInput, MyPage, MySelect } from '@/components/basic';
import MyTable from '@/components/core/table';
import ConfirmRefundFormDialog from '@/components/dialogs/confirm-refund';
import InputRefundFromDialog from '@/components/dialogs/confirm-refund/InputRefund';
import { cardTypeList, transactionStatusList, transactionStatusOptions, transactionTypeColors, transactionTypeOptions } from '@/patterns/selectOptions';
import exportToExcel from '@/utils/exportToExcel';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';

import { CreateRefundAsync, GetTransactionsAsync } from './store/action';
import { USER_ROLE } from '@/interface/user/login';
import { TablePaginationConfig } from 'antd';
import { GetLocationsAsync } from '../locations/store/action';

const TransactionPage: FC = () => {
  const dispatch = useDispatch();
  const { transactions, total } = useSelector(state => state.transaction);
  const { role } = useSelector(state => state.user);
  const { locations } = useSelector(state => state.location);
  const [ pagination, setPagination ] = useState<TablePaginationConfig>({});
  const [ filters, setFilters ] = useState<Record<string, any>>({});
  const [ sorter, setSorter ] = useState<any>({});
  const [ stores, setStores ] = useState<string[]>(['all']);
  const [ dateRange, setDateRange ] = useState<string[]>([]);
  const [ searchKey, setSearchKey ] = useState('');

  useEffect(() => {
    dispatch(GetLocationsAsync());
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

  const handleExport = () => {
    exportToExcel(transactions, columns, 'Transactions');
  };

  const columns = [
    {
      title: 'Date',
      render: (val: any, record: TransactionItem) => moment(record.created_at).format('MM/DD/YYYY'),
    },
    {
      title: 'Time',
      render: (val: any, record: TransactionItem) => moment(record.created_at).format('hh:mm:ss A'),
    },
    ...(role === USER_ROLE.admin || role === USER_ROLE.agent ? [
      {
        title: 'Location Name',
        render: (val: any, record: TransactionItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>),
        renderExport: (val: any, record: TransactionItem) => record.store?.name
      },
      {
        title: 'DBA Name',
        render: (val: any, record: TransactionItem) => (<div style={{minWidth: '70px'}}>{record.store?.dbaName}</div>),
        renderExport: (val: any, record: TransactionItem) => record.store?.dbaName
      },
      {
        title: 'Location ID',
        render: (val: any, record: TransactionItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>),
        renderExport: (val: any, record: TransactionItem) => record.store?.storeId
      }] : []
    ),
    {
      title: 'Terminal S/N',
      dataIndex: 'terminal_sn',
      key: 'terminal_sn',
      render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Terminal TPN',
      dataIndex: 'terminal_tpn',
      key: 'terminal_tpn',
      render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Batch ID',
      dataIndex: 'batchId',
      key: 'batchId',
      render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'User Name',
      render: (val: any, record: TransactionItem) => (<div style={{minWidth: '80px'}}>{record.user?.name}</div>),
      renderExport: (val: any, record: TransactionItem) => record.user?.name
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
      render: (val: string) => (<div style={{minWidth: '50px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Card #',
      dataIndex: 'card_number',
      key: 'card_number',
      render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Card Brand',
      dataIndex: 'card_brand',
      key: 'card_brand',
      render: (val: string) => (<div style={{minWidth: '90px'}} className='card-logo'><img src={val !== undefined ? `card/card_${val}.png` : ''}/></div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Card Type',
      dataIndex: 'card_type',
      key: 'card_type',
      width: '80px',
      render: (val: string) => (<div className={val !== undefined ? `circle-${cardTypeList[val]?.label}` : ''}>{val !== undefined && cardTypeList[val]?.label}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Authorization Code',
      dataIndex: 'response_code',
      key: 'response_code',
      render: (val: string) => (<div style={{minWidth: '130px'}}>{val}</div>),
      renderExport: (val: string) => val
    },
    {
      title: 'Base Amount',
      dataIndex: 'base_amount',
      key: 'base_amount',
      render: (val: number) => (<div style={{minWidth: '100px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Tip',
      dataIndex: 'tip',
      key: 'tip',
      render: (val: number) => (<div style={{minWidth: '50px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Convenience Fee',
      dataIndex: 'convenience_fee',
      key: 'convenience_fee',
      render: (val: number) => (<div style={{minWidth: '120px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Gross Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: number) => (<div style={{minWidth: '120px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Processing Fee',
      dataIndex: 'processing_fee',
      key: 'processing_fee',
      render: (val: number) => (<div style={{minWidth: '120px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: 'Net Amount',
      dataIndex: 'net_amount',
      key: 'net_amount',
      render: (val: number) => (<div style={{minWidth: '80px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    ...(role === USER_ROLE.admin || role === USER_ROLE.agent ? [{
      title: 'Commissions',
      dataIndex: 'commission_amount',
      key: 'commission_amount',
      render: (val: number) => (<div style={{minWidth: '90px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    }] : []),
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: number) => (<div style={{minWidth: '60px'}} className={`graphics-${transactionStatusList[val].label}`}></div>),
      renderExport: (val: number) => transactionStatusList[val].label
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (val: number) => (<div className={val !== undefined ? `circle-${transactionTypeOptions.find(d => d.value == val)?.label}` : ''}>{val !== undefined && transactionTypeOptions.find(d => d.value == val)?.label}</div>),
      renderExport: (val: number) => transactionTypeOptions.find(d => d.value == val)?.label || ''
    }
  ];

  const handleTableChange = (pagination: TablePaginationConfig, filtersInTable: Record<string, any>, sorter: any) => {
    setPagination(pagination);
    setFilters({...filters, ...filtersInTable});
    setSorter(sorter);
  };

  const handleChangeStores = (values: string[]) => {
    if(values.includes('all')){
      setStores(['all']);
    }else{
      setStores(values);
    }
  }

  const handleShowAll = () => {
    dispatch(GetTransactionsAsync({pagination: {}, filters, sorter}));
  }

  const handleChangeDateRange = (range1: any, range2: string[]) => {
    if(range2[0].length && range2[1].length){
      setDateRange(range2);
    }else{
      setDateRange([]);
    }
  }

  const handleSearch = () => {
    setFilters({...filters, dateFilter: dateRange.map(date => moment.tz(date, 'YYYY-MM-DD', moment.tz.guess()).format()), searchKey})
  }

  const handleFilterChange = (filter: string, val: number) => {
    setFilters({...filters, [filter]: val == -1 ? undefined : val});
  }

  useEffect(() => {
    if(Object.keys(pagination).length || Object.keys(filters).length || Object.keys(sorter).length){
      dispatch(GetTransactionsAsync({pagination, filters: {...filters, storeFilter: stores.includes('all') ? [] : stores}, sorter}));
    }
  }, [pagination, filters, sorter, stores]);
  
  return (
    <MyPage
      title={`Transactions: ${total}`}
      header={
        <>
          <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
          <MyInput placeholder="Enter Amount / Transaction ID / Name / Phone Number" onChange={e => setSearchKey(e.target.value)}></MyInput>
          <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
        </>
      }
      headerActions={
        <>
          <MyButton className="btn-info" onClick={handleExport}>
            Export <DownloadOutlined />
          </MyButton>
          { role !== USER_ROLE.agent && 
            <MyButton className="btn-primary" onClick={onInputOpen}>
              Refund
            </MyButton>
          }
          { ( role === USER_ROLE.agent || role === USER_ROLE.enterprise )&&
            <div style={{width: '300px'}}>
              <MySelect
                  mode="multiple"
                  placeholder="All or select individual stores"
                  className='w-full'
                  options={[{label: 'All Stores', value: 'all'}, ...locations.map(d => ({ label: d.name, value: d._id }))]}
                  onChange={handleChangeStores}
                  value={stores}
              />
            </div>
          }
          {role === USER_ROLE.admin && 
            <MySelect
              className="select-secondary"
              options={transactionStatusOptions}
              placeholder="Sort by Status"
              defaultValue={-1}
              popupClassName="select-dropdown-secondary"
              onChange={val => handleFilterChange('status', val)}
            />
          }
          {role >= USER_ROLE.admin && 
            <MySelect
              className="select-secondary"
              options={transactionTypeOptions}
              placeholder="Sort by TYpe"
              defaultValue={-1}
              popupClassName="select-dropdown-secondary"
              onChange={val => handleFilterChange('type', val)}
            />
          }
        </>
      }
      headerCollapsable
    >
      <MyTable
        dataSource={transactions}
        columns={columns}
        rowKey={record => record._id}
        rowClassName={record => (record.isRefunded ? 'highlight-row' : '')}
        pagable
        onTableChange={handleTableChange}
        onShowAll={handleShowAll}
        total={total}
        ShowAll
      />
      <ConfirmRefundFormDialog
        className="title-center"
        onClose={onConfirmClose}
        ref={confirmDialogRef}
        title="Refund Confirmation"
      />
      <InputRefundFromDialog
        className="title-center"
        onClose={onInputClose}
        ref={inputDialogRef}
        title="Issue Refund"
      />
    </MyPage>
  );
};

export default TransactionPage;
