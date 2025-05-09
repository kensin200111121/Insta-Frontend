import { API_BASE } from '@/config/path';

import { request } from '../request';
import { NotProcessedReportItem, ReportItem } from '@/interface/data/report.interface';

export const apiGetReports = (params?: Record<string, any>) => request<ReportItem[]>('get', API_BASE + 'store/report', { params });
export const apiGetNotProcessedReports = (params?: Record<string, any>) => request<NotProcessedReportItem[]>('get', API_BASE + 'store/not_processed', { params });
