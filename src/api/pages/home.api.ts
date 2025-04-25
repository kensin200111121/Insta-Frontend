import type { NotificationItem, chartItem, chartRequest, statisticsForAdmin, statisticsForStore } from '@/interface/data/home.interface';

import { request } from '../request';
import { NotificationFormData } from '@/components/dialogs/notification-form';
import { API_BASE } from '@/config/path';

export const apiGetNotifications = () => request<NotificationItem[]>('get', `${API_BASE}notification`);
export const apiCreateNotification = (data: NotificationFormData) => request<NotificationItem>('post', `${API_BASE}notification/create`, data);
export const apiRemoveNotification = (_id: string) => request<string>('post', `${API_BASE}notification/remove`, {notification_id: _id});
export const apiGetStatistics = (data: chartRequest) => request<statisticsForAdmin|statisticsForStore>('post', `${API_BASE}dashboard/statistics`, data);
export const apiGetSales = (data: chartRequest) => request<chartItem[]>('post', `${API_BASE}dashboard/sales`, data);
