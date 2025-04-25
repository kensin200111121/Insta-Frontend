import type { ChargebackItem } from '@/interface/data/chargeback.interface';

import { intercepter, mock } from '../config';

const dataSource: ChargebackItem[] = [
  {
    _id: '123',
    created_at: new Date('02/01/2024 11:55:32 AM'),
    charged_at: new Date('02/01/2024 11:55:32 AM'),
    transaction_id: '123 456 789 000',
    customer_name: 'John Bill',
    phone: '000 000 000',
    amount: 112122,
    fight_chargeback: true,
    store: {
      _id: `67ab86556a83c56893ec388b`,
      name: `Max Store`,
      storeId: 'abc123',
      dbaName: 'LLM Inc'
    },
    user: {
      _id: `67b36a770a9a2d2198b0dd4c`,
      name: 'User 1',
    },
    status: 'pending',
    notes: 'sample note',
    respond_at: new Date('02/01/2024 11:55:32 AM'),
  },
];

mock.mock('/page/chargeback', 'get', () => {
  return intercepter<ChargebackItem[]>(dataSource);
});

mock.mock('/page/chargeback/evidence', 'post', (req: any) => {
  // Simulate a successful response with Mock.js
  console.log(req);
  const { file } = req;

  return intercepter<ChargebackItem[]>(dataSource);
});
