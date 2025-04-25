import type { BatchItem, SetBatchStatusRequest } from '@/interface/data/batch.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';

export const apiGetBatches = (params?: Record<string, any>) => request<{data: BatchItem[], total:number}>('get', `${API_BASE}batch`, { params });
export const apiSetBatchStatus = (data : SetBatchStatusRequest) => 
  request<BatchItem>('post', API_BASE + 'batch/setstatus', data);
