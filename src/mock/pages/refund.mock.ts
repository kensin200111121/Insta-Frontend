import type { RefundItem } from '@/interface/data/refund.interface';

import { intercepter, mock } from '../config';

const dataSource : RefundItem[] = [
    {
        _id: '123',
        created_at: new Date('02/01/2024 11:55:32 AM'),
        refunded_at: new Date('02/01/2024 11:55:32 AM'),
        transaction_id: '123 456 789 000',
        customer_name: 'John Bill',
        phone: '000 000 000',
        amount: 112122,
        refund: 112122,
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

mock.mock('/page/refund', 'get', () => {
  return intercepter<RefundItem[]>(dataSource);
});

mock.mock('/page/refund/create', 'post', (config: any) => {
  const data: RefundItem = JSON.parse(config.body);
  dataSource.push(data);
  return intercepter<RefundItem[]>(dataSource);
});
