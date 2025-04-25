import type { RefundCreateRequest, RefundItem } from '@/interface/data/refund.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';

export const apiGetRefunds = (params?: Record<string, any>) => request<{data: RefundItem[], total: number}>('get', API_BASE + 'refund', { params });
export const apiCreateRefund = (data: RefundCreateRequest) => request<RefundItem>('post', API_BASE + 'refund/create', data);
