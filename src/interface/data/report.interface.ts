import type { StoreInfo } from './store.interface';
import type { UserInfo } from './user.interface';

export interface ReportItem {
  _id: string;
  date: Date;
  amount: Number;
  store?: StoreInfo;
  user?: UserInfo;
  tip: Number;
  fee: Number;
  baseAmount: Number;
}

export interface NotProcessedReportItem {
  _id: string;
  status: number;
  store?: StoreInfo;
  user?: UserInfo;
}
