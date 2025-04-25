import type { TransactionItem } from '@/interface/data/transaction.interface';
import { API_BASE } from '@/config/path';

import { request } from '../request';

export const apiGetTransactions = (params?: Record<string, any>) => request<{data: TransactionItem[], total:number}>('get', API_BASE + 'transaction', { params });
export const apiGetTransactionById = (transaction_id?: string) => {
  return request<{data: TransactionItem}>('get', `${API_BASE}transaction/${transaction_id}`);
};
export const apiRefundTransaction = (transaction_id: string) =>
  request<TransactionItem[]>('post', '/page/transaction/refund', transaction_id);
