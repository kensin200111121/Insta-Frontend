import { StoreInfo } from "./store.interface";

export interface CommissionItem {
  _id: string,
  createdAt: Date,
  fundedAt: Date,
  endedAt: Date,
  store: StoreInfo,
  grossTransactionAmount: number,
  transactionCount: number,
  bankAccount: string,
  commissionAmount: number,
  status: number,
  file: string,
  notes: string
}

export interface SetCommissionStatusRequest{
  _id: string,
  status: number
}
