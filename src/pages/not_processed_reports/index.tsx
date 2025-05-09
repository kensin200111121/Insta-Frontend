import type { FC } from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton, MyDatePicker, MyPage } from '@/components/basic';
import MyTable from '@/components/core/table';
import exportToExcel from '@/utils/exportToExcel';
import getFormatedNumber, { getPriceNumber } from '@/utils/getFormatedNumber';
import { UserInfo } from '@/interface/data/user.interface';
import { GetNotProcessedReportsAsync } from './store/action';
import { NotProcessedReportItem } from '@/interface/data/report.interface';

const NotProcessedReportPage: FC = () => {
  const dispatch = useDispatch();
  const { not_processeds } = useSelector(state => state.notProcessed);
  const [ filters, setFilters ] = useState<Record<string, any>>({});
  const [ dateRange, setDateRange ] = useState<string[]>([]);

  const handleChangeDateRange = (range1: any, range2: string[]) => {
    if(range2[0].length && range2[1].length){
      setDateRange(range2);
    }else{
      setDateRange([]);
    }
  }
    
  const handleSearch = () => {
    setFilters({dateFilter: dateRange.map(date => moment.tz(date, 'YYYY-MM-DD', moment.tz.guess()).format())})
  }

  useEffect(() => {
    dispatch(GetNotProcessedReportsAsync({filters}));
  }, [filters]);

  const handleExport = () => {
    exportToExcel(not_processeds, columns, 'Not Processed Yet');
  };

  const columns = [
    {
      title: 'Location Name',
      render: (val: any, record: NotProcessedReportItem) => (<div style={{minWidth: '100px'}}>{record.store?.name}</div>),
      renderExport: (val: any, record: NotProcessedReportItem) => record.store?.name
    },
    {
      title: 'DBA Name',
      render: (val: any, record: NotProcessedReportItem) => (<div style={{minWidth: '70px'}}>{record.store?.dbaName}</div>),
      renderExport: (val: any, record: NotProcessedReportItem) => record.store?.dbaName
    },
    {
      title: 'Location ID',
      render: (val: any, record: NotProcessedReportItem) => (<div style={{minWidth: '80px'}}>{record.store?.storeId}</div>),
      renderExport: (val: any, record: NotProcessedReportItem) => record.store?.storeId
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: number) => val === 0 ? 'NOT YET LIVE' : 'STOPPED PROCESSING'
    }
  ];

  return (
    <MyPage
      title='Not Processed Yet'
      header={
        <>
          <MyDatePicker.RangePicker style={{width: '300px'}} onChange={handleChangeDateRange} />
          <button className="btn-search btn-custom" onClick={handleSearch}><SearchOutlined /></button>
        </>
      }
      headerActions={
        <MyButton className="btn-info" onClick={handleExport}>
          Export <DownloadOutlined />
        </MyButton>
      }
    >
      <MyTable
        dataSource={not_processeds}
        columns={columns}
        rowKey={record => record._id}
        rowClassName={record => (record.status === 0 ? 'highlight-row' : 'highlight-row-red')}
        pagable
      />
    </MyPage>
  );
};

export default NotProcessedReportPage;
