import type { TicketFormData } from '@/components/dialogs/ticket-form';
import type { SupportTicketItem } from '@/interface/data/supportticket.interface';
import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { DialogMethod } from '@/types/props/dialog.type';
import type { FC } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton, MyDatePicker, MyInput, MyPage, MySelect } from '@/components/basic';
import MyTable from '@/components/core/table';
import TicketFormDialog from '@/components/dialogs/ticket-form';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import SeeTransactionFormDialog from '@/components/dialogs/transaction-form/';
import { supportTicketStatusColors, supportTicketStatusOptions } from '@/patterns/selectOptions';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';

import StatusCell from './StatusCell';
import { CreateNewTicketAsync, GetSupportTicketsAsync, NoteTicketAsync, SetTicketStatusAsync } from './store/action';
import { USER_ROLE } from '@/interface/user/login';
import { apiGetTransactionById } from '@/api/pages/transaction.api';

const SupportTicketPage: FC = () => {
  const dispatch = useDispatch();
  const { supporttickets } = useSelector(state => state.supportticket);
  const { transactions } = useSelector(state => state.transaction);
  const { role, timezone } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(GetSupportTicketsAsync());
  }, []);

  const dialogRef = useRef<DialogMethod<TransactionItem[]>>(null);
  const noteDialogRef = useRef<DialogMethod<string>>(null);
  const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);
  const seeTransactionDialogRef = useRef<DialogMethod<TransactionItem>>(null);
    
  const onNoteOpen = (_id: string) => {
    noteDialogRef.current?.open(_id);
  };

  const onNoteClose = (data?: NoteFormData) => {
    if(data){
      dispatch(NoteTicketAsync(data));
    }
  };

  const onSeeNoteOpen = (note: string) => {
    seeNoteDialogRef.current?.open({note});
  };

  const onOpenTransactionInfo = async (transactionId: string) => {
    const { result, status } = await apiGetTransactionById(transactionId);
    if (status) {
      seeTransactionDialogRef.current?.open(result.data);
    }
  };
  
  const columns = [
    {
      title: 'Date of Transaction',
      dataIndex: 'date',
      key: 'date',
      render: (val: any) => (<div style={{minWidth: '120px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>),
    },
    ...(role === USER_ROLE.admin ? [
      {
        title: 'Location Name',
        render: (val: any, record: SupportTicketItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>)
      },
      {
        title: 'DBA Name',
        render: (val: any, record: SupportTicketItem) => (<div style={{minWidth: '70px'}}>{record.store?.dbaName}</div>)
      },
      {
        title: 'Location ID',
        render: (val: any, record: SupportTicketItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>)
      }
    ] : []),
    {
      title: 'User Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>)
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (val: string) => (<div style={{minWidth: '100px'}}><a onClick={() => onOpenTransactionInfo(val)}>{val}</a></div>)
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (val: string) => (<div style={{minWidth: '60px'}}>{val}</div>)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val, 0)}</div>),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (val: string) => (<div style={{minWidth: '150px'}}>{val}</div>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: number, record: SupportTicketItem) => (
        <StatusCell<number> recordId={record._id || ''} status={val} options={supportTicketStatusOptions} colors={supportTicketStatusColors} onChange={handleStatusChange} disabled={false} />
      ),
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        render: (val:string, record:SupportTicketItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id || '')}}>Add Notes</MyButton>)),
        renderExport: (val:string) => (val)
    }
  ];

  const onOpen = () => {
    dialogRef.current?.open([...transactions]);
  };

  const onClose = (data?: TicketFormData) => {
    if (data) {
      dispatch(CreateNewTicketAsync(data));
    }
  };

  const onTransactionClose = async (data?: TransactionItem) => {
    console.log('=====onTransactionClose====', data)
  };
  
  const handleStatusChange = (_id: string, status: number) => {
    dispatch(SetTicketStatusAsync({ _id, status }));
  };

  const handleSortBy = (value: number) => {
    setFilter(value == -1 ? undefined : value);
  };

  const [filteredData, setFilteredData] = useState(supporttickets);
  const [filter, setFilter] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (filter == undefined) {
      setFilteredData(supporttickets);
    } else {
      setFilteredData(supporttickets.filter(data => data.status == filter));
    }
  }, [filter, supporttickets]);

  return (
    <MyPage
      title={`Support Tickets (Solved: ${getFormatedNumber(supporttickets.filter(t => t.status == 1).length, 0)} / Unsolved: ${getFormatedNumber(supporttickets.filter(t => t.status == 0).length, 0)})`}
      header={
        <>
          <MyDatePicker.RangePicker style={{width: '300px'}} />
          <MyInput placeholder="User Name / Phone Number / Transaction ID"></MyInput>
          <button className="btn-search">
            <SearchOutlined />
          </button>
        </>
      }
      headerActions={
        <>
          <MySelect
            options={[ { label: 'All', value: -1 }, ...supportTicketStatusOptions]}
            placeholder="Sort by"
            onChange={handleSortBy}
            defaultValue={-1}
          />
          <MyButton style={{ width: '142px' }} onClick={onOpen} className='btn-info'>
            Create New Ticket
          </MyButton>
        </>
      }
      headerCollapsable
    >
      <MyTable
        dataSource={filteredData}
        columns={columns}
        rowKey={record => record._id}
        pagable
        ShowAll
      />
      <TicketFormDialog onClose={onClose} ref={dialogRef} title="Create New Ticket"></TicketFormDialog>
      <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this support ticket" />
      <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
      <SeeTransactionFormDialog
        className="title-center"
        onClose={onTransactionClose}
        ref={seeTransactionDialogRef}
        title="Transaction Information"
      />
    </MyPage>
  );
};

export default SupportTicketPage;
