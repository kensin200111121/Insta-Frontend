import type { MerchantAccountItem } from '@/interface/data/merchantaccount.interface';

import { request } from '../request';
import { MerchantAccountFormData } from '@/components/dialogs/merchant-account';
import { NoteFormData } from '@/components/dialogs/note-form';
import { API_BASE } from '@/config/path';

export const apiGetMerchantAccounts = () => request<MerchantAccountItem[]>('get', `${API_BASE}merchantaccount`);
export const apiCreateMerchantAccount = (data: MerchantAccountFormData) => request<MerchantAccountItem>('post', `${API_BASE}merchantaccount/create`, data);
export const apiUpdateMerchantAccount = (data: MerchantAccountItem) => request<MerchantAccountItem>('post', `${API_BASE}merchantaccount/edit`, data);
export const apiNoteMerchantAccount = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}merchantaccount/note`, data);
