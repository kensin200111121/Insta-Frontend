import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { MyPage, MyButton, MyInput } from '@/components/basic';
import MyTable from '@/components/core/table';
import { useDispatch, useSelector } from 'react-redux';
import { GetFundingReportAsync, NoteFundingReportAsync } from './store/action';
import { getPriceNumber } from '@/utils/getFormatedNumber';
import { FundingReportItem } from '@/interface/data/fundingreport.interface';
import moment from 'moment';
import 'moment-timezone';
import ReportFormDialog, { ReportFormData } from '@/components/dialogs/fund-report';
import NoteFormDialog, { NoteFormData } from '@/components/dialogs/note-form';
import SeeNoteFormDialog, { SeeNoteFormData } from '@/components/dialogs/note-form/see-note';
import { DialogMethod } from '@/types/props/dialog.type';
import { GetLocationsAsync } from '../locations/store/action';
import { LocationItem } from '@/interface/data/location.interface';
import { fundingReportStatusList } from '@/patterns/selectOptions';

const FundingReportPage: FC = () => {

    const dispatch = useDispatch();
    const { timezone } = useSelector(state => state.user);
    const { funding_report } = useSelector(state => state.fundingreport);
    const { locations } = useSelector(state => state.location);

    useEffect(() => {
        if( !locations || locations.length == 0 ){
            dispatch(GetLocationsAsync());
        }
        dispatch(GetFundingReportAsync());
    }, []);

    const createDialogRef = useRef<DialogMethod<LocationItem[]>>(null);
    const noteDialogRef = useRef<DialogMethod<string>>(null);
    const seeNoteDialogRef = useRef<DialogMethod<SeeNoteFormData>>(null);
    
    const onCreateOpen = () => {
        dispatch(GetLocationsAsync());
        createDialogRef.current?.open([...locations]);
    };

    const onCreateClose = (data?: ReportFormData) => {
        dispatch(GetFundingReportAsync());
    };

    const onNoteOpen = (_id: string) => {
        noteDialogRef.current?.open(_id);
    };

    const onNoteClose = (data?: NoteFormData) => {
        if(data){
            dispatch(NoteFundingReportAsync(data));
        }
    };

    const onSeeNoteOpen = (note: string) => {
        seeNoteDialogRef.current?.open({note});
    };

    const columns = [
        {
            title: 'Batch Date',
            render: (_:any, record:FundingReportItem) => (moment.tz(record.created_at, timezone).format('MM/DD/YYYY'))
        },
        {
            title: 'Time',
            render: (_:any, record:FundingReportItem) => (moment.tz(record.created_at, timezone).format('hh:mm:ss A'))
        },
        {
            title: 'ACH ID',
            dataIndex: 'ACH_ID',
            key: 'ACH_ID',
            render: (val: string) => (<div style={{minWidth: '60px'}}>{val}</div>)
        },
        {
            title: 'Location Name',
            render: (_: any, record: FundingReportItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>)
        },
        {
            title: 'DBA Name',
            render: (_: any, record: FundingReportItem) => (<div style={{minWidth: '100px'}}>{record.store?.dbaName}</div>)
        },
        {
            title: 'Location ID',
            render: (_: any, record: FundingReportItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>)
        },
        {
            title: 'Amount Funded',
            dataIndex: 'amount',
            key: 'amount',
            render: (val:number) => (<div style={{minWidth: '100px'}}>{getPriceNumber(val, 0)}</div>)
        },
        {
            title: 'Funding Date',
            dataIndex: 'funded_at',
            key: 'funded_at',
            render: (val:Date) => (<div style={{minWidth: '90px'}}>{moment.tz(val, timezone).format('MM/DD/YYYY')}</div>)
        },
        {
            title: 'Report Uploaded',
            dataIndex: 'report',
            key: 'report',
            render: (val: {name: string, link: string}) => (val?.link ? <a className='link' href={val.link} target='_blank'>{val.name}</a> : (<div style={{minWidth: '100px'}}></div>))
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (val:string, record:FundingReportItem) => (val?.length ? (<a onClick={() => onSeeNoteOpen(val)}>See Notes</a>) : (<MyButton onClick={() => {onNoteOpen(record._id)}}>Add Notes</MyButton>))
        }
    ];

    return (
        <MyPage
            title="Funding Report"
            header={<>
                    <MyInput placeholder="Enter Store Name or Transaction ID"></MyInput>
                    <button className='btn-search'><SearchOutlined/></button>
                </>}
            headerActions={<>
                    <MyButton className='btn-info' style={{width: '168px'}} onClick={onCreateOpen}>New Funding Entry</MyButton>
                </>}
        >
            <MyTable dataSource={funding_report} columns={columns} rowKey={record => record._id} pagable ShowAll/>
            <ReportFormDialog className='title-center' onClose={onCreateClose} ref={createDialogRef} title="New Funding Entry" />
            <NoteFormDialog className='title-center' onClose={onNoteClose} ref={noteDialogRef} title="Enter Notes for this funding report" />
            <SeeNoteFormDialog onClose={() => {}} ref={seeNoteDialogRef} title="Notes Description" />
        </MyPage>
    )
};

export default FundingReportPage;
