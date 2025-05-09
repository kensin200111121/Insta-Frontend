import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { CloseOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import exportToExcel from '@/utils/exportToExcel';
import { GetAgentsAsync, NoteAgentAsync, RemoveAgentAsync } from './store/action';
import { apiGetAgentById } from '@/api/pages/agent.api';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import { DialogMethod } from '@/types/props/dialog.type';
import { css } from '@emotion/react';
import AgentFormDialog, { AgentFormData } from '@/components/dialogs/agent-form';
import RemoveAgentDialog from '@/components/dialogs/notification-form/RemoveNotification';
import { AgentItem } from '@/interface/data/agent.interface';
import { ColumnType } from 'antd/es/table';

const AgentPage: FC = () => {

    const dispatch = useDispatch();
    const { agents } = useSelector(state => state.agent);
    
    useEffect(() => {
        dispatch(GetAgentsAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<AgentItem>>(null);
    const editDialogRef = useRef<DialogMethod<AgentItem>>(null);
    const removeDialogRef = useRef<DialogMethod<any>>(null);
    const noteDialogRef = useRef<DialogMethod<string>>(null);
    const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);
    
    const onCreateOpen = () => {
        createDialogRef.current?.open({
            _id: '',
            agentInfo: {
                agentCompanyName: '',
                agentName: '',
                agentEmail: '',
                agentPhone: ''
            },
            bankInfo: {
                name: '',
                bankName: '',
                street: '',
                suite: '',
                city: '',
                state: '',
                zip: '',
                routingNumber: '',
                accountNumber: ''
            },
            notes: '',
            loginInfo: {
                name: '',
                password: ''
            },
            commissionRate: 0,
            perTransactionAmount: 0
        });
    };

    const onDialogClose = (data?: AgentFormData) => {
        dispatch(GetAgentsAsync());
    };

    const onNoteOpen = (_id: string) => {
        noteDialogRef.current?.open(_id);
    };

    const onNoteClose = (data?: NoteFormData) => {
        if(data){
            dispatch(NoteAgentAsync(data));
        }
    };

    const onSeeNoteOpen = (note: string) => {
        seeNoteDialogRef.current?.open({note});
    };

    const onRemoveAgentOpen = (_id: string) => {
        removeDialogRef.current?.open(_id);
    };

    const onRemoveAgentClose = async (_id?: string) => {
        if(_id){
            dispatch(RemoveAgentAsync(_id));
        }
    };

    const onOpenEdit = (val: string, record: AgentItem) => {
        const agentId = record._id;
        apiGetAgentById(agentId).then(res => {
          if (res.status) {
            editDialogRef.current?.open({
                _id: res.result.data._id,
                agentInfo: res.result.data.agentInfo,
                bankInfo: res.result.data.bankInfo,
                notes: res.result.data.notes,
                loginInfo: res.result.data.loginInfo,
                commissionRate: res.result.data.commissionRate,
                perTransactionAmount: res.result.data.perTransactionAmount
            });
          }
        });
    };
    const columns = [
        {
            title: 'Agent Company Name',
            dataIndex: 'agentInfo.agentCompanyName',
            key: 'agentInfo.agentCompanyName',
            width: 180,
            render: (val: string, record: AgentItem) => (
            <a
                onClick={() => {
                onOpenEdit(val, record);
                }}
            >
                {record.agentInfo.agentCompanyName}
            </a>
            ),
            renderExport: (val: string, record: AgentItem) => record.agentInfo.agentCompanyName
        },
        {
            title: 'Agent Name',
            dataIndex: 'agentInfo.agentName',
            key: 'agentInfo.agentName',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.agentInfo.agentName}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.agentInfo.agentName
        },
        {
            title: 'Agent Email',
            dataIndex: 'agentInfoagentEmail',
            key: 'agentInfoagentEmail',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.agentInfo.agentEmail}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.agentInfo.agentEmail
        },
        {
            title: 'Agent Phone',
            dataIndex: 'agentInfoagentPhone',
            key: 'agentInfoagentPhone',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.agentInfo.agentPhone}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.agentInfo.agentPhone
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankInfo.name',
            key: 'bankInfo.name',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.bankInfo.name}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.name
        },
        {
            title: 'Name on Bank Account',
            dataIndex: 'bankInfo.bankName',
            key: 'bankInfo.bankName',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '150px' }}>{record.bankInfo.bankName}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.bankName
        },
        {
            title: 'Street',
            dataIndex: 'bankInfo.street',
            key: 'bankInfo.street',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.bankInfo.street}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.street
        },
        {
            title: 'City',
            dataIndex: 'bankInfo.city',
            key: 'bankInfo.city',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.bankInfo.city}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.city
        },
        {
            title: 'State',
            dataIndex: 'bankInfo.state',
            key: 'bankInfo.state',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '100px' }}>{record.bankInfo.state}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.state
        },
        {
            title: 'ZIP',
            dataIndex: 'bankInfo.zip',
            key: 'bankInfo.zip',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '100px' }}>{record.bankInfo.zip}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.zip
        },
        {
            title: 'Routing Number',
            dataIndex: 'bankInfo.routingNumber',
            key: 'bankInfo.routingNumber',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.bankInfo.routingNumber}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.routingNumber
        },
        {
            title: 'Account Number',
            dataIndex: 'bankInfo.accountNumber',
            key: 'bankInfo.accountNumber',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.bankInfo.accountNumber}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.bankInfo.accountNumber
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (val: any, record: AgentItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id)}}>Add Notes</MyButton>)),
            renderExport: (val: string, record: AgentItem) => record.notes
        },
        {
            title: 'Agent Username',
            dataIndex: 'loginInfo.name',
            key: 'loginInfo.name',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.loginInfo.name}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.loginInfo.name
        },
        {
            title: 'Agent Password',
            dataIndex: 'loginInfo.password',
            key: 'loginInfo.password',
            render: (val: any, record: AgentItem) => {
                return <div style={{ minWidth: '130px' }}>{record.loginInfo.password}</div>;
            },
            renderExport: (val: string, record: AgentItem) => record.loginInfo.password
        },
        {
            title: '',
            render: (val: any, record: AgentItem) => (<div style={{minWidth: '20px'}}>
                <button css={css`border-width: 0px; background: transparent; &:hover{cursor: pointer; background-color: #F3F3F3;}`} onClick={() => onRemoveAgentOpen(record?._id || '')}>
                    <CloseOutlined className='text-danger' />
                </button>
            </div>)
        },
    ];    

    const handleExport = () => {
        exportToExcel(agents, columns, 'Agents');
    }

    return (
        <MyPage
            title="Agents"
            header={<>
                    <MyInput placeholder="Enter Agent Company Name or Agent Name"></MyInput>
                    <button className='btn-search'><SearchOutlined/></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                    <MyButton className='btn-info' style={{width: '206px'}} onClick={onCreateOpen}>Add New Agent</MyButton>
                </>}
        >
            <MyTable dataSource={agents} columns={columns} rowKey={record => record._id} pagable ShowAll/>
            <AgentFormDialog className='title-center' onClose={onDialogClose} ref={createDialogRef} title="Add New Agent" />
            <AgentFormDialog className='title-center' onClose={onDialogClose} ref={editDialogRef} title="Edit Agent" />
            <RemoveAgentDialog css={styles} className='title-center' onClose={onRemoveAgentClose} ref={removeDialogRef} title="Remove this Agent?" />
            <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this Agent" />
            <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
        </MyPage>
    )
};

export default AgentPage;

const styles = css`
.ant-modal-content{
    width: 381px;
    padding-bottom: 30px;
    margin: auto;
}
`;