import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import { CreateMerchantAccountAsync, GetMerchantAccountAsync, NoteMerchantAccountAsync, UpdateMerchantAccountAsync } from './store/action';
import exportToExcel from '@/utils/exportToExcel';
import MerchantAccountFormDialog, { MerchantAccountFormData } from '@/components/dialogs/merchant-account';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import { DialogMethod } from '@/types/props/dialog.type';
import { MerchantAccountItem } from '@/interface/data/merchantaccount.interface';

const MerchantAccountPage: FC = () => {

    const dispatch = useDispatch();
    const { merchant_accounts } = useSelector(state => state.merchantaccount);
    const [ selectedId, setSelectedId ] = useState('');
    
    useEffect(() => {
        dispatch(GetMerchantAccountAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<any>>(null);
    const noteDialogRef = useRef<DialogMethod<string>>(null);
    const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);
    
    const onCreateOpen = (record?: MerchantAccountItem) => {
        setSelectedId(record?._id ?? '');
        createDialogRef.current?.open(record ?? {});
    };

    const onCreateClose = (data?: MerchantAccountFormData) => {
        if(data){
            if(selectedId.length){
                dispatch(UpdateMerchantAccountAsync({ ...data, _id: selectedId }));
            }else{
                dispatch(CreateMerchantAccountAsync(data));
            }
        }
    };

    const onNoteOpen = (_id: string) => {
        noteDialogRef.current?.open(_id);
    };

    const onNoteClose = (data?: NoteFormData) => {
        if(data){
            dispatch(NoteMerchantAccountAsync(data));
        }
    };

    const onSeeNoteOpen = (note: string) => {
        seeNoteDialogRef.current?.open({note});
    };

    const columns = [
        {
            title: 'ISO Name',
            dataIndex: 'iso_name',
            key: 'iso_name',
            render: (val: string, record: MerchantAccountItem) => (<div style={{minWidth: '80px'}}><a onClick={() => {onCreateOpen(record)}}>{val}</a></div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Acquirer',
            dataIndex: 'acquirer',
            key: 'acquirer',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Monthly Volume',
            dataIndex: 'monthly_volume',
            key: 'monthly_volume',
            render: (val: string) => (<div style={{minWidth: '120px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'MID #',
            dataIndex: 'MID',
            key: 'MID',
            render: (val: string) => (<div style={{minWidth: '60px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Descriptor',
            dataIndex: 'descriptor',
            key: 'descriptor',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'BIN #',
            dataIndex: 'binNum',
            key: 'binNum',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Agent #',
            dataIndex: 'agentNum',
            key: 'agentNum',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Chain #',
            dataIndex: 'chainNum',
            key: 'chainNum',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Store #',
            dataIndex: 'storeNum',
            key: 'storeNum',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Terminal #',
            dataIndex: 'terminalNum',
            key: 'terminalNum',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Terminal ID',
            dataIndex: 'terminalId',
            key: 'terminalId',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Notes',
            dataIndex: 'note',
            key: 'note',
            render: (val:string, record:MerchantAccountItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id)}}>Add Notes</MyButton>)),
            renderExport: (val: string) => val
        }
    ];

    const handleExport = () => {
        exportToExcel(merchant_accounts, columns, 'Merchant Accounts');
    }

    return (
        <MyPage
            title="Merchant Accounts"
            header={<>
                    <MyInput placeholder="Enter MID # or ISO Name"></MyInput>
                    <button className='btn-search'><SearchOutlined/></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                    <MyButton className='btn-info' style={{width: '206px'}} onClick={() => onCreateOpen()}>Add New Merchant Account</MyButton>
                </>}
        >
            <MyTable dataSource={merchant_accounts} columns={columns} rowKey={record => record._id} pagable ShowAll/>
            <MerchantAccountFormDialog className='title-center' onClose={onCreateClose} ref={createDialogRef} title={`${selectedId.length ? 'Edit' : 'Add New'} Merchant Account`} />
            <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this merchant account" />
            <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
        </MyPage>
    )
};

export default MerchantAccountPage;
