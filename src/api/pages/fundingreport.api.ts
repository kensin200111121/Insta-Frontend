import type { FundingReportItem } from '@/interface/data/fundingreport.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';
import { NoteFormData } from '@/components/dialogs/note-form';

export const apiGetFundingReport = () => request<FundingReportItem[]>('get', `${API_BASE}report`);
export const apiCreateFundingReport = (data: FormData) => request<FundingReportItem>('post', `${API_BASE}report/create`, data);
export const apiNoteFundingReport = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}report/note`, data);
