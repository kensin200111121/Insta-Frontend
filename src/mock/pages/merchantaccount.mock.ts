import type { MerchantAccountItem } from '@/interface/data/merchantaccount.interface';

import { intercepter, mock } from '../config';

const dataSource : MerchantAccountItem[] = [
    {
        _id: '123',
        iso_name: 'Store 01',
        acquirer: '000 000 000',
        monthly_volume: '000 000 000',
        MID: '000',
        descriptor: '000',
        binNum: '',
        agentNum: '',
        chainNum: '',
        storeNum: '',
        terminalNum: '',
        terminalId: '',
        note: ''
    },
    {
        _id: '124',
        iso_name: 'Store 02',
        acquirer: '000 000 000',
        monthly_volume: '000 000 000',
        MID: '000',
        descriptor: '000',
        terminalId: '',
        binNum: '',
        agentNum: '',
        chainNum: '',
        storeNum: '',
        terminalNum: '',
        note: 'This is a sample note'
    },
    {
        _id: '125',
        iso_name: 'Store 03',
        acquirer: '000 000 000',
        monthly_volume: '000 000 000',
        MID: '000',
        descriptor: '000',
        terminalId: '',
        binNum: '',
        agentNum: '',
        chainNum: '',
        storeNum: '',
        terminalNum: '',
        note: ''
    },
    {
        _id: '126',
        iso_name: 'Store 04',
        acquirer: '000 000 000',
        monthly_volume: '000 000 000',
        MID: '000',
        descriptor: '000',
        terminalId: '',
        binNum: '',
        agentNum: '',
        chainNum: '',
        storeNum: '',
        terminalNum: '',
        note: 'This is a sample note'
    }
];

mock.mock('/page/merchantaccount', 'get', () => {
  return intercepter<MerchantAccountItem[]>(dataSource);
});
