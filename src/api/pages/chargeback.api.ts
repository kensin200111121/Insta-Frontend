import type { NewChargebackFormData } from '@/components/dialogs/new-chargeback';
import type { NoteChargebackFormData } from '@/components/dialogs/note-chargeback';
import type { ChargebackItem, SetChargebackStatusRequest, UploadEvidenceItem } from '@/interface/data/chargeback.interface';

import { API_BASE } from '@/config/path';

import { request } from '../request';

export const apiGetChargebacks = (params?: Record<string, any>) => request<{data: ChargebackItem[], total: number}>('get', API_BASE + 'chargeback', { params });
export const apiUploadEvidence = (data: FormData) =>
  request<{ name: string; link: string }>('post', API_BASE + 'chargeback/upload', data);
export const apiCreateChargeback = (data: NewChargebackFormData) =>
  request<NewChargebackFormData>('post', API_BASE + 'chargeback/create', data);
export const apiNoteChargeback = (data: NoteChargebackFormData) =>
  request<NoteChargebackFormData>('post', API_BASE + 'chargeback/notes', data);
export const apiSetChargebackStatus = (data : SetChargebackStatusRequest) => 
  request<ChargebackItem>('post', API_BASE + 'chargeback/setstatus', data);
