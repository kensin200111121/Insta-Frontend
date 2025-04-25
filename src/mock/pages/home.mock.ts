import type { NotificationItem } from '@/interface/data/home.interface';

import { intercepter, mock } from '../config';
import { NotificationFormData } from '@/components/dialogs/notification-form';

import { locationsDataSource } from './location.mock';
import { USER_ROLE } from '@/interface/user/login';

const notifications: NotificationItem[] = [
    {
        _id: '123',
        title: 'Title 01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipia elit.',
        store: [{
            _id: `67ab86556a83c56893ec388b`,
            name: `Max Store`,
            storeId: 'abc123',
            dbaName: 'LLM Inc'
        }],
        status: 0,
        created_at: new Date('02/01/2024 11:55:32 AM')
    },
];

const statisticsForAdmin: any[] = [];

const statisticsForUser: any[] = [];

const sales: any[] =[];

mock.mock('/page/home/notifications', 'get', () => {
  return intercepter<NotificationItem[]>(notifications);
});

mock.mock('/page/home/notification/remove', 'post', (config: any) => {
  const notification_id = config.body;
  const index = notifications.findIndex(note => note._id == notification_id);
  if(index >= 0){
    notifications.splice(index, 1);
    return intercepter<string>(notification_id);
  }
  return intercepter<string>((-1).toString());
});

mock.mock('/page/home/notification/create', 'post', (config: any) => {
  const data: NotificationFormData = JSON.parse(config.body);
  const notification: NotificationItem = {
    _id: notifications.length.toString(),
    title: data.title,
    description: data.description,
    created_at: new Date(),
    status: 0
  }

  notifications.push(notification);
  return intercepter<NotificationItem>(notification);
});

mock.mock('/page/home/statistics', 'post', (config: any) => {
    const {role} = JSON.parse(config.body);
    if(role === USER_ROLE.admin){
        return intercepter<any[]>(statisticsForAdmin);
    }else{
        return intercepter<any[]>(statisticsForUser);
    }
});

mock.mock('/page/home/sales_chart', 'get', () => {
  return intercepter<any[]>(sales);
});
