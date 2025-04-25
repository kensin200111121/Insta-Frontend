import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CloseOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import exportToExcel from '@/utils/exportToExcel';
import { GetEnterprisesAsync, RemoveEnterpriseAsync } from './store/action';
import { DialogMethod } from '@/types/props/dialog.type';
import { css } from '@emotion/react';
import EnterpriseFormDialog, { EnterpriseFormData } from '@/components/dialogs/enterprise-form';
import RemoveEnterpriseDialog from '@/components/dialogs/notification-form/RemoveNotification';
import { EnterpriseItem } from '@/interface/data/enterprise.interface';
import { ColumnType } from 'antd/es/table';

const EnterprisePage: FC = () => {

    const dispatch = useDispatch();
    const { enterprises } = useSelector(state => state.enterprise);
    const [ createFormMode, setCreateFormMode ] = useState(true);
    
    useEffect(() => {
        dispatch(GetEnterprisesAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<any>>(null);
    const removeDialogRef = useRef<DialogMethod<any>>(null);
    
    const onCreateOpen = (_id?: string) => {
        setCreateFormMode(_id ? false : true);
        createDialogRef.current?.open({_id});
    };

    const onCreateClose = (data?: EnterpriseFormData) => {
        dispatch(GetEnterprisesAsync());
    };

    const onRemoveEnterpriseOpen = (_id: string) => {
        removeDialogRef.current?.open(_id);
    };

    const onRemoveEnterpriseClose = async (_id?: string) => {
        if(_id){
            dispatch(RemoveEnterpriseAsync(_id));
        }
    };

    const columns: ColumnType<EnterpriseItem>[] = [
        {
            title: 'Enterprise Name',
            dataIndex: 'name',
            key: 'name',
            render: (val: any, record: EnterpriseItem) => {
                return <div style={{ minWidth: '130px' }}><a onClick={() => onCreateOpen(record._id)}>{record.name}</a></div>;
            }
        },
        {
            title: 'Enterprise Username',
            dataIndex: 'loginInfo.name',
            key: 'loginInfo.name',
            render: (val: any, record: EnterpriseItem) => {
                return <div style={{ minWidth: '130px' }}>{record.loginInfo.name}</div>;
            }
        },
        {
            title: 'Enterprise Password',
            dataIndex: 'loginInfo.password',
            key: 'loginInfo.password',
            render: (val: any, record: EnterpriseItem) => {
                return <div style={{ minWidth: '130px' }}>{record.loginInfo.password}</div>;
            }
        },
        {
            title: '',
            align: 'center',
            render: (val: any, record: EnterpriseItem) => (<div style={{minWidth: '20px'}}>
                <button css={css`border-width: 0px; background: transparent; &:hover{cursor: pointer; background-color: #F3F3F3;}`} onClick={() => onRemoveEnterpriseOpen(record?._id || '')}>
                    <CloseOutlined className='text-danger' />
                </button>
            </div>)
        },
    ];    

    const handleExport = () => {
        exportToExcel(enterprises, columns, 'Enterprises');
    }

    return (
        <MyPage
            title="Enterprises"
            header={<>
                    <MyInput placeholder="Enter Enterprise Name"></MyInput>
                    <button className='btn-search'><SearchOutlined/></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                    <MyButton className='btn-info' style={{width: '206px'}} onClick={() => onCreateOpen()}>Add New Enterprise</MyButton>
                </>}
        >
            <MyTable dataSource={enterprises} columns={columns} rowKey={record => record.name} pagable ShowAll/>
            <EnterpriseFormDialog className='title-center' onClose={onCreateClose} ref={createDialogRef} title={`${createFormMode ? 'Add New' : 'Edit'} Enterprise`} />
            <RemoveEnterpriseDialog css={styles} className='title-center' onClose={onRemoveEnterpriseClose} ref={removeDialogRef} title="Remove this Enterprise?" />
        </MyPage>
    )
};

export default EnterprisePage;

const styles = css`
.ant-modal-content{
    width: 381px;
    padding-bottom: 30px;
    margin: auto;
}
`;