import type { FundingReportItem } from '@/interface/data/fundingreport.interface';

import { intercepter, mock } from '../config';

const dataSource : FundingReportItem[] = [
    {
        _id: '123',
        created_at: new Date('02/01/2024 11:55:32 AM'),
        funded_at: new Date('03/21/2024 11:55:32 AM'),
        ACH_ID: '000 000 000',
        amount: 112112,
        errorCount: 0,
        status: "funded",
        store: {
            _id: `67ab86556a83c56893ec388b`,
            name: `Max Store`,
            storeId: 'abc123',
            dbaName: 'LLM Inc'
        },
    },
];

mock.mock('/page/fundingreport', 'get', () => {
  return intercepter<FundingReportItem[]>(dataSource);
});
