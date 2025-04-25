import type { BatchItem } from '@/interface/data/batch.interface';

import { intercepter, mock } from '../config';

const dataSource : BatchItem[] = [
    {
        _id: '123',
        created_at: new Date('02/01/2024 11:55:32 AM'),
        funded_at: new Date('02/01/2024 11:55:32 AM'),
        batch_id: '123 456 789 000',
        bank: 'XXXX XXXX XXXX 4242',
        amount: 112122,
        status: 0,
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

mock.mock('/page/batch', 'get', () => {
  return intercepter<BatchItem[]>(dataSource);
});
