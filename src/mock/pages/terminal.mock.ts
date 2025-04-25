import type { TerminalItem } from '@/interface/data/terminal.interface';

import { intercepter, mock } from '../config';

const dataSource : TerminalItem[] = [
    {
        _id: '123',
        serial_number: '000 000 000',
        model_number: '000 000 000',
        description: 'F3',
        MID: '000',
        TPN: '',
        token: '',
        note: '',
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

mock.mock('/page/terminal', 'get', () => {
  return intercepter<TerminalItem[]>(dataSource);
});
