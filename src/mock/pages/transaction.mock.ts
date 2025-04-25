import type { TransactionItem } from '@/interface/data/transaction.interface';

import { intercepter, mock } from '../config';

const dataSource : TransactionItem[] = [
    {
        _id: '123',
        created_at: new Date('02/01/2024 11:55:32 AM'),
        transaction_id: 'TXN-9A7B6C5D4E1',
        customer_name: 'John Bill',
        phone: '+1 (202) 555-0147',
        amount: 500,
        fee: 15,
        net_amount: 485,
        isRefunded: false,
        card_number: '',
        card_brand: 0,
        card_type: 0,
        response_code: '',
        tip: 13,
        convenience_fee: 12,
        processing_fee: 3,
        status: 0,
        type: 0,
        batchId: '',
        terminal_sn: '',
        terminal_tpn: '',
        store: {
            _id: `67ab86556a83c56893ec388b`,
            name: `Max Store`,
            storeId: 'abc123',
            dbaName: 'LLM Inc'
        },
        user: {
            _id: `67b36a770a9a2d2198b0dd4c`,
            name: 'User 1'
        },
    },
];

mock.mock('/page/transaction', 'get', () => {
  return intercepter<TransactionItem[]>(dataSource);
});

mock.mock('/page/transaction/refund', 'post', (config: any) => {
  const transaction_id: string = config.body;

  const index = dataSource.findIndex(d => d.transaction_id == transaction_id);
  if(index >= 0){
    dataSource[index].isRefunded = true;
  }

  return intercepter<TransactionItem[]>(dataSource);
});
