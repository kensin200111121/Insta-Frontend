import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface TransactionItem {
    _id: string;
    created_at: Date;
    transaction_id: string;
    customer_name: string;
    terminal_sn: string;
    terminal_tpn: string;
    phone: string;
    amount: number;
    fee: number;
    net_amount: number;
    isRefunded: boolean;
    card_number: string;
    card_brand: number;
    card_type: number;
    response_code: string;
    tip: number;
    convenience_fee: number;
    processing_fee: number;
    status: number;
    type: number;
    batchId: string;
    store?: StoreInfo;
    user?: UserInfo;
};