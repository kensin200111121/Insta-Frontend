import type { LocationItem } from '@/interface/data/location.interface';
import type { CreateUserRequest, UserInfoItem } from '@/interface/data/setting.interface';

import { API_BASE } from '@/config/path';

import { request } from '../request';

export const apiGetUsers = () => request<UserInfoItem[]>('get', API_BASE + 'user');
export const apiGetUserInfo = (_id: string, password: string) => request<UserInfoItem>('post', API_BASE + 'user', {user_id: _id, password});
export const apiAddUser = (data: CreateUserRequest) => request<UserInfoItem>('post', API_BASE + 'user/create', data);
export const apiRemoveUser = (_id: string) => request<string>('post', `${API_BASE}user/remove`, {user_id: _id});
export const apiGetLocation = () => request<LocationItem>('get', API_BASE + 'store/location');
