import type { UserInfoItem } from '@/interface/data/setting.interface';

import { intercepter, mock } from '../config';

const dataSource: UserInfoItem[] = [
    {
        _id: '123',
        name: 'User 01',
        user: 'User 01',
        email: 'xyz@exmple.com',
        phone: '123 456 789',
        pin: '1234'
    },
];

mock.mock('/page/setting/user', 'get', () => {
  return intercepter<UserInfoItem[]>(dataSource);
});
