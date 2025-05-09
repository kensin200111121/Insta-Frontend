import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput, MyDatePicker } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import exportToExcel from '@/utils/exportToExcel';
import { GetCommissionsAsync, NoteCommissionAsync, SetCommissionStatusAsync } from './store/action';
import { css } from '@emotion/react';
import { CommissionItem } from '@/interface/data/commission.interface';
import { commissionStatusOptions, commissionStatusColors } from '@/patterns/selectOptions';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import { DialogMethod } from '@/types/props/dialog.type';
import StatusCell from '../support_tickets/StatusCell';
import moment from 'moment';
import { getPriceNumber } from '@/utils/getFormatedNumber';
import { TablePaginationConfig } from 'antd';
import { apiGetCommissions } from '@/api/pages/commission.api';
import { USER_ROLE } from '@/interface/user/login';

const CommissionPage: FC = () => {

    const dispatch = useDispatch();
    const { role } = useSelector(state => state.user);
    const { commissions, total } = useSelector(state => state.commission);
    const [ dateRange, setDateRange ] = useState<string[]>([]);
    const [ pagination, setPagination ] = useState<TablePaginationConfig>({});
    const [ filters, setFilters ] = useState<Record<string, any>>({});

    const noteDialogRef = useRef<DialogMethod<string>>(null);
    const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);

    const onNoteOpen = (_id: string) => {
        noteDialogRef.current?.open(_id);
    };

    const onNoteClose = (data?: NoteFormData) => {
        if(data){
            dispatch(NoteCommissionAsync(data));
        }
    };

    const onSeeNoteOpen = (note: string) => {
        seeNoteDialogRef.current?.open({note});
    };

    const columns = [
        ...(role === USER_ROLE.admin ? [{
            title: 'Agent Name',
            dataIndex: 'agentName',
            key: 'agentName',
            render: (val: string) => (<div style={{minWidth: '90px'}}>{val}</div>),
            renderExport: (val: string) => val,
        }] : []),
        {
            title: 'Commission Period',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (val: Date, record: CommissionItem) => (<div style={{minWidth: '130px'}}>{`${moment.tz(val, moment.tz.guess()).format('MMM Do H')} - ${record.endedAt ? moment.tz(record.endedAt, moment.tz.guess()).format('MMM Do H') : ''}`}</div>),
            renderExport: (val: Date, record: CommissionItem) => (`${moment.tz(val, moment.tz.guess()).format('MMM Do H')} - ${record.endedAt ? moment.tz(record.endedAt, moment.tz.guess()).format('MMM Do H') : ''}`)
            // render: (val: Date) => (<div style={{minWidth: '100px'}}>{`${moment(val).startOf('isoWeek').format('MMM Do')} - ${moment(val).startOf('isoWeek').add(6, 'days').format('MMM Do')}`}</div>),
            // renderExport: (val: Date) => (`${moment(val).startOf('isoWeek').format('MMM Do')} - ${moment(val).startOf('isoWeek').add(6, 'days').format('MMM Do')}`)
        },
        {
            title: 'Funding Date',
            dataIndex: 'fundedAt',
            key: 'fundedAt',
            render: (val: Date) => (<div style={{minWidth: '90px'}}>{moment.tz(val, moment.tz.guess()).format('MM/DD/YYYY')}</div>),
            renderExport: (val: Date) => moment.tz(val, moment.tz.guess()).format('MM/DD/YYYY'),
        },
        {
            title: 'Gross Transaction Amount',
            dataIndex: 'grossTransactionAmount',
            key: 'grossTransactionAmount',
            render: (val: number) => (<div style={{minWidth: '170px'}}>{getPriceNumber(val)}</div>),
            renderExport: (val: number) => val
        },
        {
            title: '# of Transactions',
            dataIndex: 'transactionCount',
            key: 'transactionCount',
            render: (val: number) => (<div style={{minWidth: '120px'}}>{val}</div>),
            renderExport: (val: number) => val
        },
        {
            title: 'Last 4 of Bank',
            dataIndex: 'bank',
            key: 'bank',
            render: (val: any) => (<div style={{minWidth: '100px'}}>{val.accountNumber?.length >= 4 ? val.accountNumber.slice(-4) : ''}</div>),
            renderExport: (val: any) => (val.accountNumber?.length >= 4 ? val.accountNumber.slice(-4) : '')
        },
        {
            title: 'Commission Amount',
            dataIndex: 'commissionAmount',
            key: 'commissionAmount',
            render: (val: number) => (<div style={{minWidth: '140px'}}>{getPriceNumber(val)}</div>),
            renderExport: (val: number) => val
        },
        {
            title: 'Commission Status',
            dataIndex: 'status',
            key: 'status',
            render: (val: number, record: CommissionItem) => (
                val == 0 && role === USER_ROLE.admin ? (
                    <StatusCell<number>
                        recordId={record._id || ''}
                        status={val}
                        minWidth={140}
                        options={commissionStatusOptions}
                        colors={commissionStatusColors}
                        onChange={handleStatusChange}
                        disabled={false}
                    />
                ) : (
                    <div className={`text-${commissionStatusColors[val]}`} style={{minWidth: '100px'}}>
                        {commissionStatusOptions.find(d => d.value == val)?.label || ''}
                    </div>
                )
              ),
              renderExport: (val: number) => commissionStatusOptions.find(d => d.value == val)?.label || ''
        },
        {
            title: 'Report',
            dataIndex: 'file',
            key: 'file',
            render: (val: number) => (<div style={{minWidth: '60px'}}>{val}</div>),
            renderExport: (val: number) => val
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (val: string, record: CommissionItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id)}}>Add Notes</MyButton>)),
            renderExport: (val: string) => (val)
        },
    ];

    const handleExport = async () => {
        const { result, status } = await apiGetCommissions({filters});
        if(status){
            exportToExcel(result.data, columns, 'Commissions');
        }else{
            console.log('error in export');
        }
    };

    const handleStatusChange = (_id: string, status: number) => {
        const commission = commissions.find(d => d._id == _id);
        if( commission && moment(commission.fundedAt).isBefore(moment()) && commission.status < status ){
            dispatch(SetCommissionStatusAsync({ _id, status }));
        }
        return false;
    };

    const handleTableChange = (pagination: TablePaginationConfig, filtersInTable: Record<string, any>, sorter: any) => {
        setPagination(pagination);
        setFilters({...filters, ...filtersInTable});
    };

    const handleShowAll = () => {
        dispatch(GetCommissionsAsync({pagination: {}, filters}));
    }

    const handleChangeDateRange = (range1: any, range2: string[]) => {
        if(range2[0].length && range2[1].length){
            setDateRange(range2);
        }else{
            setDateRange([]);
        }
    }

    const handleSearch = () => {
        setFilters({...filters, dateFilter: dateRange})
    }

    useEffect(() => {
        if(Object.keys(pagination).length || Object.keys(filters).length){
            dispatch(GetCommissionsAsync({pagination, filters: {...filters}}));
        }
    }, [pagination, filters]);

    return (
        <MyPage
            title="Commission Reports"
            header={<>
                    <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
                    <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                </>}
        >
            <MyTable
                dataSource={commissions}
                columns={columns}
                rowKey={record => record._id}
                pagable
                onTableChange={handleTableChange}
                onShowAll={handleShowAll}
                total={total}
                ShowAll
            />
            <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this commission" />
            <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
        </MyPage>
    )
};

export default CommissionPage;

const styles = css`
.ant-modal-content{
    width: 381px;
    padding-bottom: 30px;
    margin: auto;
}
`;