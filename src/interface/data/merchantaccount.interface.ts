import { FeeInfo, StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface MerchantAccountItem {
    _id: string;
    iso_name: string;
    acquirer: string;
    monthly_volume: string;
    MID: string;
    descriptor: string;
    terminalId: string;
    debit_rate: number;
    credit_rate: number;
    transaction_fee?: number;
    note?: string;
    store?: StoreInfo;
    user?: UserInfo
};
