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
        terminalId: '',
        debit_rate: 10,
        credit_rate: 10,
        transaction_fee: 0,
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
        debit_rate: 20,
        credit_rate: 20,
        transaction_fee: 0,
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
        debit_rate: 30,
        credit_rate: 30,
        transaction_fee: 10,
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
        debit_rate: 40,
        credit_rate: 40,
        transaction_fee: 10,
        note: 'This is a sample note'
    }
];

mock.mock('/page/merchantaccount', 'get', () => {
  return intercepter<MerchantAccountItem[]>(dataSource);
});
