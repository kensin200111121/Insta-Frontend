import type { StoreInfo } from './store.interface';
import type { UserInfo } from './user.interface';

export interface ChargebackItem {
  _id: string;
  created_at: Date;
  charged_at: Date;
  respond_at: Date;
  transaction_id: string;
  customer_name: string;
  phone: string;
  amount: number;
  evidence?: {
    name?: string;
    link?: string;
  };
  fight_chargeback: boolean;
  store?: StoreInfo;
  user?: UserInfo;
  status?: 'pending' | 'lost' | 'won';
  notes?: string;
}

export interface UploadEvidenceItem {
  transaction_id: string;
  file: File;
}

export interface SetChargebackStatusRequest{
  _id: string,
  status: string
}