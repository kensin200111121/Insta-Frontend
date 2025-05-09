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
import { GetReportsAsync } from './store/action';

const ReportPage: FC = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector(state => state.report);
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
    dispatch(GetReportsAsync({filters}));
  }, [filters]);

  const handleExport = () => {
    exportToExcel(reports, columns, 'Reports');
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (val: Date) => (<div style={{minWidth: '130px'}}>{moment(val).format('MM/DD/YYYY')}</div>),
      renderExport: (val: Date) => moment(val).format('MM/DD/YYYY')
    },
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: (val: UserInfo) => (<div style={{minWidth: '70px'}}>{val?.name}</div>),
      renderExport: (val: UserInfo) => val?.name
    },
    {
      title: "Base Volume",
      dataIndex: 'baseAmount',
      key: 'baseAmount',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: "Tip",
      dataIndex: 'tip',
      key: 'tip',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: "Convenience Fee",
      dataIndex: 'fee',
      key: 'fee',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    },
    {
      title: "Gross Volume",
      dataIndex: 'amount',
      key: 'amount',
      render: (val: number) => (<div style={{minWidth: '70px'}}>{getPriceNumber(val)}</div>),
      renderExport: (val: number) => getFormatedNumber(val)
    }
  ];

  return (
    <MyPage
      title='User Reports'
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
        dataSource={reports}
        columns={columns}
        rowKey={record => record._id}
        pagable
      />
    </MyPage>
  );
};

export default ReportPage;
