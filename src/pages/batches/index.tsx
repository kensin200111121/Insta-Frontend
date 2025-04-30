import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyDatePicker, MyInput, MySelect } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import { GetBatchesAsync, SetBatchStatusAsync } from './store/action';
import moment from 'moment';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';
import exportToExcel from '@/utils/exportToExcel';
import { batchStatusColors, batchStatusOptions } from '@/patterns/selectOptions';
import { StoreInfo } from '@/interface/data/store.interface';
import { USER_ROLE } from '@/interface/user/login';
import { TablePaginationConfig } from 'antd';
import { BatchItem } from '@/interface/data/batch.interface';
import StatusCell from '../support_tickets/StatusCell';

const BatchPage: FC = () => {

    const dispatch = useDispatch();
    const { batches, total } = useSelector(state => state.batch);
    const { role } = useSelector(state => state.user);
    const [pagination, setPagination] = useState<TablePaginationConfig>({});
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [ dateRange, setDateRange ] = useState<string[]>([]);
    const [ searchKey, setSearchKey ] = useState('');

    const handleExport = () => {
        exportToExcel(batches, columns, 'Batches');
    }

    const handleTableChange = (pagination: TablePaginationConfig, filtersInTable: Record<string, any>, sorter: any) => {
        setPagination(pagination);
        setFilters({...filters, ...filtersInTable});
    };

    const handleShowAll = () => {
        dispatch(GetBatchesAsync({pagination: {}, filters}));
    }

    const handleFilterChange = (filter: string, val: number) => {
        setFilters({...filters, [filter]: val == -1 ? undefined : val});
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

    useEffect(() => {
        if(Object.keys(pagination).length || Object.keys(filters).length){
            dispatch(GetBatchesAsync({pagination, filters}));
        }
    }, [pagination, filters]);

    const columns = [
        {
            title: role === USER_ROLE.admin ? 'Batch Date' : 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (val:Date) => (<div style={{minWidth: '80px'}}>{moment(val).format('MM/DD/YYYY')}</div>),
            renderExport: (val: Date) => moment(val).format('MM/DD/YYYY')
        },
        {
            title: 'Funding Date',
            dataIndex: 'funded_at',
            key: 'funded_at',
            render: (val:Date) => (<div style={{minWidth: '80px'}}>{moment(val).format('MM/DD/YYYY')}</div>),
            renderExport: (val: Date) => moment(val).format('MM/DD/YYYY')
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
            }
        ] : []),
        {
            title: 'Batch ID',
            dataIndex: 'batch_id',
            key: 'batch_id',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Bank on File',
            dataIndex: 'bank',
            key: 'bank',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>),
            renderExport: (val: string) => val
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (val:number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
            renderExport: (val: number) => getFormatedNumber(val)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (val: number, record: BatchItem) => (
                val ? (
                    <StatusCell<number>
                        recordId={record._id || ''}
                        status={val}
                        minWidth={140}
                        options={batchStatusOptions}
                        colors={batchStatusColors}
                        onChange={handleStatusChange}
                    />
                ) : (
                    <div style={{minWidth: '100px'}}>OPEN</div>
                )
            ),
            renderExport: (val: number) => batchStatusOptions.find(d => d.value == val)?.label || 'OPEN'
        }
    ];

    const handleStatusChange = (_id: string, status: number) => {
        dispatch(SetBatchStatusAsync({ _id, status }));
    };
              
    return (
        <MyPage
            title={`Batches: ${total}`}
            header={<>
                    <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
                    <MyInput placeholder="Enter Batch ID" onChange={e => setSearchKey(e.target.value)} />
                    <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' onClick={handleExport}>Export <DownloadOutlined /></MyButton>
                    { role == USER_ROLE.admin && 
                        <MySelect
                            className='select-secondary'
                            options={[{ label: 'All', value: -1 }, { label: 'OPEN', value: 0 }, ...batchStatusOptions]}
                            placeholder="Sort by"
                            defaultValue={-1}
                            popupClassName='select-dropdown-secondary'
                            onChange={val => handleFilterChange('status', val)}
                        />
                    }
                </>}
        >
            <MyTable dataSource={batches} columns={columns} rowKey={record => record._id} pagable ShowAll
                onTableChange={handleTableChange} onShowAll={handleShowAll} total={total}/>
        </MyPage>
    )
};

export default BatchPage;
