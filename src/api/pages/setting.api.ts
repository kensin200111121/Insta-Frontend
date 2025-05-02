import type { LocationItem, ReportUserInterface } from '@/interface/data/location.interface';
import type { CreateUserRequest, UserInfoItem } from '@/interface/data/setting.interface';

import { API_BASE } from '@/config/path';

import { request } from '../request';

export const apiGetUsers = () => request<UserInfoItem[]>('get', API_BASE + 'user');
export const apiGetUsersWithPins = (password: string) => request<UserInfoItem[]>('post', API_BASE + 'user', {password});
export const apiAddUser = (data: CreateUserRequest) => request<UserInfoItem>('post', API_BASE + 'user/create', data);
export const apiRemoveUser = (_id: string) => request<string>('post', `${API_BASE}user/remove`, {user_id: _id});
export const apiGetLocation = () => request<LocationItem>('get', API_BASE + 'store/location');
export const apiGetReporters = () => request<ReportUserInterface[]>('get', API_BASE + 'reporter');
export const apiAddReporter = (data: ReportUserInterface) => request<ReportUserInterface>('post', API_BASE + 'reporter/create', data);
export const apiRemoveReporter = (_id: string) => request<string>('post', `${API_BASE}reporter/remove`, {reporter_id: _id});
