import { useEffect, useRef, FC, useState } from 'react';
import { Row, Card, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import { CraeteNotificationAsync, GetNotificationsAsync, GetSalesAsync, GetStatisticsAsync, RemoveNotificationAsync } from './store/action';
import './index.less';
import SalesChart from './SalesChart';
import { MyButton, MyDatePicker, MySelect } from '@/components/basic';
import MyTable from '@/components/core/table';
import { NotificationItem, statisticsForAdmin, statisticsForStore } from '@/interface/data/home.interface';
import { ColumnType } from 'antd/es/table';
import NotificationFormDialog, { NotificationFormData } from '@/components/dialogs/notification-form';
import RemoveNotificationDialog from '@/components/dialogs/notification-form/RemoveNotification';
import { DialogMethod } from '@/types/props/dialog.type';
import { css } from '@emotion/react';
import { LocationItem } from '@/interface/data/location.interface';
import { GetLocationsAsync } from '../locations/store/action';
import { USER_ROLE } from '@/interface/user/login';
import StatisticsInfoForAdmin from './StatisticsInfoForAdmin';
import StatisticsInfoForStore from './StatisticsInfoForStore';

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const { notifications, statistics } = useSelector(state => state.homepage);
    const { locations } = useSelector(state => state.location);
    const { role, timezone } = useSelector(state => state.user);
    const [ stores, setStores ] = useState<string[]>(['all']);
    const [ mode, setMode ] = useState('');
    const [ dateRange, setDateRange ] = useState<string[]>([]);
    const [ currentRange, setCurrentRange ] = useState<any[]>([]);

    useEffect(() => {
        dispatch(GetLocationsAsync());
        dispatch(GetNotificationsAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<LocationItem[]>>(null);
    const removeDialogRef = useRef<DialogMethod<any>>(null);

    const onCreateOpen = () => {
        createDialogRef.current?.open([...locations]);
    };

    const onCreateClose = (data?: NotificationFormData) => {
        if(data){
            dispatch(CraeteNotificationAsync(data));
        }
    };

    const onRemoveOpen = (_id: string) => {
        removeDialogRef.current?.open(_id);
    };

    const onRemoveClose = async (_id?: string) => {
        if(_id){
            dispatch(RemoveNotificationAsync(_id));
        }
    };

    useEffect(() => {
        if(mode != ''){
            dispatch(GetSalesAsync({mode, dateRange, stores: stores.includes('all') ? [] : stores, timezone}));
            dispatch(GetStatisticsAsync({mode, dateRange, stores: stores.includes('all') ? [] : stores, timezone}));
        }
    }, [stores, mode, dateRange]);

    const handleTabChange = (key: string) => {
        setMode(key);
    }

    const handleChangeStores = (values: string[]) => {
        if(values.includes('all')){
            setStores(['all']);
        }else{
            setStores(values);
        }
    }

    const handleChangeDateRange = (range1: any, range2: string[]) => {
        if(range2?.[0].length && range2?.[1].length){
            setCurrentRange(range1);
            setDateRange(range2);
        }else{
            setCurrentRange([]);
            setDateRange([]);
        }
    }
    const columns : ColumnType<NotificationItem>[] = [
        {
            title: 'Date',
            render: (val:any, record:NotificationItem) => (moment.tz(record.created_at, timezone).format('MM/DD/YYYY'))
        },
        {
            title: 'Time',
            render: (val:any, record:NotificationItem) => (moment.tz(record.created_at, timezone).format('hh:mm:ss A'))
        },
        {
            title: 'Title of Notification',
            dataIndex: 'title',
            key: 'title',
            render: (val: string) => (<div style={{minWidth: '130px'}}>{val}</div>)
        },
        {
            title: 'Description of Notification',
            dataIndex: 'description',
            key: 'description',
            render: (val: string) => (<div style={{minWidth: '170px'}}>{val}</div>)
        },
        ...((role === USER_ROLE.admin ? [{
            title: 'Locations Sent to',
            render: (val:any, record:NotificationItem) => (<div style={{minWidth: '120px'}}>{record.store?.length ? record.store.map(d => d.name).join(', ') : 'All Stores'}</div>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (val: number) => (<div style={{minWidth: '50px'}} className={`text-${val ? 'danger' : 'success'}`}>{val? 'Removed' : 'Sent'}</div>)
        },
        {
            title: '',
            align: 'center',
            render: (val: any, record: NotificationItem) => (record.status == 0 && <div style={{minWidth: '20px'}}>
                <button className='btn-custom' onClick={() => onRemoveOpen(record?._id || '')}>
                    <CloseOutlined className='text-danger' />
                </button>
            </div>)
        }] : []) as ColumnType<NotificationItem>[])
    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card className='main-content home-card'>
                        <div className='card-header collapsable'>
                            <div className='card-title'>
                                Store Sales
                            </div>
                            { (role === USER_ROLE.agent || role === USER_ROLE.enterprise) && <div className='card-actions' style={{width: '350px'}}>
                                <MySelect
                                    mode="multiple"
                                    placeholder="All or select individual stores"
                                    className='w-full'
                                    options={[{label: 'All Stores', value: 'all'}, ...locations.map(d => ({ label: d.name, value: d._id }))]}
                                    onChange={handleChangeStores}
                                    value={stores}
                                />
                            </div>}
                            { mode === 'custom' && <div className='card-actions' style={{width: '350px'}}>
                                <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} value={[currentRange[0], currentRange[1]]} />
                            </div>}
                        </div>
                        <SalesChart onTabChange={handleTabChange} dateRange={dateRange}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[0, 12]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={9}>
                    <Card className='main-content' style={{height: 'calc(100% - 30px)', minHeight: 'calc(50vh - 50px)'}}>
                        <div className='card-title'>{role === USER_ROLE.admin ? 'Location' : 'Store'} Statistics</div>
                        { role === USER_ROLE.admin ? <StatisticsInfoForAdmin info={statistics as statisticsForAdmin} /> : <StatisticsInfoForStore info={statistics as statisticsForStore} />}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={15} >
                    <Card className='main-content' style={{height: 'calc(100% - 30px)'}}>
                        <div className='card-header'>
                            <span className='card-title'>News & Notifications</span>
                            { role === USER_ROLE.admin && (
                                <div className='card-actions'>
                                    <MyButton className='btn-info' style={{width: 180}} onClick={onCreateOpen}>Create New Notification</MyButton>
                                </div>
                            )}
                        </div>
                        <MyTable dataSource={notifications} columns={columns} rowKey={record => record._id}/>
                        <NotificationFormDialog className='title-center' onClose={onCreateClose} ref={createDialogRef} title="Create New Notification" />
                        <RemoveNotificationDialog css={styles} className='title-center' onClose={onRemoveClose} ref={removeDialogRef} title="Remove this notification from the stores?" />
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default HomePage;

const styles = css`
.ant-modal-content{
    width: 381px;
    padding-bottom: 30px;
    margin: auto;
}
`;
