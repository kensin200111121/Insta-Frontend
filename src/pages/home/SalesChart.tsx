import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getPriceNumber } from '@/utils/getFormatedNumber';
import { MyButton } from '@/components/basic';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const monthYear = moment().format('YYYY-MM');
const lastMonthYear = moment().subtract(1, 'months').format('YYYY-MM');

const salesData: string[][] = [
  [ "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM" ],
  [ "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM" ],
  Array.from({ length: moment().date() }, (_, i) => 
    moment(`${monthYear}-${i + 1}`, 'YYYY-MM-D').format('Do')),
  [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
  Array.from({ length: moment().subtract(1, 'months').daysInMonth() }, (_, i) => 
    moment(`${lastMonthYear}-${i + 1}`, 'YYYY-MM-D').format('Do'))
];

type SalesTooltipProps = {
  value: number|undefined;
  label: string;
}

const SalesTooltip:FC<SalesTooltipProps> = ({label, value}) => {
  return (
    <div style={{
      display: 'inline-block',
      width: 'max-content',
      height: 'max-content',
      padding: '0px 10px',
      lineHeight: '12px',
      border: '1px solid #FFB03B',
      backgroundColor: 'white'
    }}>
      <p>{label}</p>
      <p>sales : {getPriceNumber(value)}</p>
    </div>
  )
}

type SalesChartProps = {
  onTabChange?: (curTabKey: string) => void;
};

const SalesChart: FC<SalesChartProps> = ({ onTabChange }) => {

  const [total, setTotal] = useState(0);
  const [curTab, setCurTab] = useState(0);
  const { sales } = useSelector(state => state.homepage);
  const [data, setData] = useState<any[]>([]);

  const tabs = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'mtd', label: 'MTD' },
    { key: 'lastweek', label: 'Last Week' },
    { key: 'lastmonth', label: 'Last Month' },
  ];

  const handleTabClick = (index: number) => {
    setCurTab(index);
    onTabChange && onTabChange(tabs[index].key);
  }
  

  useEffect(() => {
    handleTabClick(0);
  }, []);
  
  useEffect(() => {
    const temp = salesData[curTab].map(label => ({ name: label, sales: 0}))
    let sum = 0;
    for (const sale of sales) {
      temp[sale.time].sales = sale.amount;
      sum += sale.amount;
    }
    setData(temp);
    setTotal(sum);
  }, [ sales ]);

  return (
    <>
      <div css={chartToolbar}>
        <div className='total-amount text-info'>{getPriceNumber(total)}</div>
        <div className='chart-options'>
          {
            tabs.map( (tab, index) => (<MyButton key={index} onClick={() => handleTabClick(index)} className={`${index == curTab ? 'btn-active' : ''}`}>{tab.label}</MyButton>))
          }
        </div>
      </div>
      <div css={chartarea}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(tick) => `$${tick}`} />
            <Tooltip<number, string>
              itemStyle={{color: '#30260B'}}
              content={({label, payload}) => 
                <SalesTooltip label={label} value={ payload?.length ? payload[0].value : 0}/>
              }
            />
            <Bar dataKey="sales" fill="#FEF3D1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
};

export default SalesChart;

const chartToolbar = css`
.total-amount{
  float: left;
  font-family: Inter;
  font-weight: 500;
  font-size: 20px;

  @media(max-width: 1000px){
    float: none;
    margin-bottom: 15px;
  }
}
.chart-options{
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media(max-width: 760px){
    gap: 3px;
  }
    
  .ant-btn{
    width: 80px;
    height: 26px;
    font-family: Poppins;
    font-weight: 300px;
    font-size: 12px;
    margin-bottom: 18px;
    line-height: 26px;
    padding: 0px 0px;
    background-color: #F6B513;
    border-color: #F6B513;
    border-radius: 5px;
    color: white;
  }

  .ant-btn.btn-active{
    background-color: #FFB03B;
  }
}
`;
const chartarea = css`
height: calc(50vh - 150px);
min-height: 185px;

@media(max-width: 1000px){
  height: calc(50vh - 195px);
  min-height: 135px;
}
`;