import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTerminalAsync, GetTerminalsAsync, NoteTerminalAsync, SetTerminalStatusAsync, UpdateTerminalAsync } from './store/action';
import { TerminalItem } from '@/interface/data/terminal.interface';
import { LocationItem } from '@/interface/data/location.interface';
import { fundingReportStatusList, terminalStatusColors, terminalStatusOptions } from '@/patterns/selectOptions';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import TerminalFormDialog, { TerminalFormData } from '@/components/dialogs/terminal-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import { DialogMethod } from '@/types/props/dialog.type';
import exportToExcel from '@/utils/exportToExcel';
import moment from 'moment';
import 'moment-timezone';
import { GetMerchantAccountAsync } from '../merchant_accounts/store/action';
import getFormatedNumber from '@/utils/getFormatedNumber';
import StatusCell from '../support_tickets/StatusCell';

const TerminalPage: FC = () => {

    const dispatch = useDispatch();
    const { terminals } = useSelector(state => state.terminal);
    const { timezone } = useSelector(state => state.user);
    const [ selectedId, setSelectedId ] = useState('');
    const { merchant_accounts } = useSelector(state => state.merchantaccount);

    useEffect(() => {
        dispatch(GetTerminalsAsync());
        dispatch(GetMerchantAccountAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<any>>(null);
    const noteDialogRef = useRef<DialogMethod<string>>(null);
    const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);
    
    const onCreateOpen = (data?: TerminalItem) => {
        setSelectedId(data?._id ?? '');
        createDialogRef.current?.open(data ? {
            _id: data._id,
            store_id: data.store?._id ?? '',
            serial_number: data.serial_number,
            TPN: data.TPN,
            model: data.model_number,
            token: data.token,
            description: data.description,
            merchant: merchant_accounts.find(d => d.MID === data.MID)?._id
        } : {});
    };

    const onCreateClose = (data?: TerminalFormData) => {
        if(data){
            if(selectedId.length){
                dispatch(UpdateTerminalAsync({...data, _id: selectedId}));
            }else{
                dispatch(CreateTerminalAsync(data));
            }
        }
    };

    const onNoteOpen = (_id: string) => {
        noteDialogRef.current?.open(_id);
    };

    const onNoteClose = (data?: NoteFormData) => {
        if(data){
            dispatch(NoteTerminalAsync(data));
        }
    };

    const onSeeNoteOpen = (note: string) => {
        seeNoteDialogRef.current?.open({note});
    };

    const columns = [
        {
            title: 'Date Added',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (val: Date) => moment.tz(val, timezone).format('MM/DD/YYYY'),
        },
        {
            title: 'Location Name',
            render: (_: any, record: TerminalItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>),
            renderExport: (_: any, record: TerminalItem) => record.store?.name
        },
        {
            title: 'DBA Name',
            render: (_: any, record: TerminalItem) => (<div style={{minWidth: '70px'}}>{record.store?.dbaName}</div>),
            renderExport: (_: any, record: TerminalItem) => record.store?.dbaName
        },
        {
            title: 'Location ID',
            render: (_: any, record: TerminalItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>),
            renderExport: (_: any, record: TerminalItem) => record.store?.storeId
        },
        {
            title: 'Serial #',
            dataIndex: 'serial_number',
            key: 'serial_number',
            render: (val: string, record: TerminalItem) => (<div style={{minWidth: '80px'}}><a onClick={() => {onCreateOpen(record)}}>{val}</a></div>),
            renderExport: (val: string) => val
        },
        {
            title: 'TPN',
            dataIndex: 'TPN',
            key: 'TPN',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Model #',
            dataIndex: 'model_number',
            key: 'model_number',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'MID #',
            dataIndex: 'MID',
            key: 'MID',
            render: (val: string) => (<div style={{minWidth: '50px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (val: number, record: TerminalItem) => (
                <StatusCell<number>
                    recordId={record._id || ''}
                    status={val}
                    minWidth={100}
                    options={terminalStatusOptions}
                    colors={terminalStatusColors}
                    onChange={handleStatusChange}
                    disabled={false}
                />
            ),
            renderExport: (val: number) => terminalStatusOptions.find(d => d.value == val)?.label
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (val:string, record:TerminalItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id)}}>Add Notes</MyButton>)),
            renderExport: (val: string) => (val)
        }
    ];

    const handleExport = () => {
        exportToExcel(terminals, columns, 'Terminals');
    }

    const handleStatusChange = (_id: string, status: number) => {
        dispatch(SetTerminalStatusAsync({ _id, status }));
    };

    return (
        <MyPage
            title={`Terminals: ${getFormatedNumber(terminals?.length ?? 0, 0)}`}
            header={<>
                    <MyInput placeholder="Enter Store Name or Transaction ID"></MyInput>
                    <button className='btn-search'><SearchOutlined/></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                    <MyButton className='btn-info' style={{width: '168px'}} onClick={() => onCreateOpen()}>Add New Terminal</MyButton>
                </>}
        >
            <MyTable dataSource={terminals} columns={columns} rowKey={record => record._id} pagable ShowAll/>
            <TerminalFormDialog className='title-center' onClose={onCreateClose} ref={createDialogRef} title={`${selectedId.length ? 'Edit' : 'Add New'} Terminal`} />
            <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this terminal" />
            <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
        </MyPage>
    )
};

export default TerminalPage;
