import type { SupportTicketItem } from '@/interface/data/supportticket.interface';

import { intercepter, mock } from '../config';

const dataSource : SupportTicketItem[] = [
    {
        _id: '123',
        created_at: new Date('02/01/2024 11:55:32 AM'),
        transaction_id: '123 456 7890',
        customer_name: 'John Bill',
        phone: '000 000 000',
        amount: 112122,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing dlit.',
        status: 1,
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

mock.mock('/page/supportticket', 'get', () => {
  return intercepter<SupportTicketItem[]>(dataSource);
});

mock.mock('/page/supportticket', 'post', (config: any) => {
  const data: SupportTicketItem = JSON.parse(config?.body);
  dataSource.push(data);
  return intercepter<SupportTicketItem[]>(dataSource);
});
