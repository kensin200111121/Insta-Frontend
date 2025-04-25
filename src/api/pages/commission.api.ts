import type { CommissionItem, SetCommissionStatusRequest } from '@/interface/data/commission.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';
import { NoteFormData } from '@/components/dialogs/note-form';

export const apiGetCommissions = (params?: Record<string, any>) => request<{data: CommissionItem[], total:number}>('get', `${API_BASE}commission`, { params });
export const apiNoteCommission = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}commission/notes`, data);
export const apiSetCommissionStatus = (data : SetCommissionStatusRequest) => 
  request<CommissionItem>('post', API_BASE + 'commission/setstatus', data);
