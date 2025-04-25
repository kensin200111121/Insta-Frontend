import type { EnterpriseFormRequest, EnterpriseItem } from '@/interface/data/enterprise.interface';

import { request } from '../request';
import { EnterpriseFormData } from '@/components/dialogs/enterprise-form';
import { API_BASE } from '@/config/path';

export const apiGetEnterprises = () => request<EnterpriseItem[]>('get', `${API_BASE}enterprise`);
export const apiGetEnterpriseById = (_id: string) => request<EnterpriseItem>('get', `${API_BASE}enterprise/${_id}`);
export const apiCreateEnterprise = (data: EnterpriseFormData) => request<EnterpriseItem>('post', `${API_BASE}enterprise/create`, data);
export const apiUpdateEnterprise = (data: EnterpriseFormRequest) => request<EnterpriseItem>('post', `${API_BASE}enterprise/edit`, data);
export const apiRemoveEnterprise = (_id: string) => request<string>('post', `${API_BASE}enterprise/remove`, {enterprise_id: _id});
