import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface SupportTicketItem {
    _id: string;
    created_at: Date;
    transaction_id: string;
    customer_name: string;
    phone: string;
    amount: number;
    description: string;
    status: number;
    note?: string;
    store?: StoreInfo;
    user?: UserInfo;
};


export interface SetTicketStatusRequest{
  _id: string,
  status: number
}