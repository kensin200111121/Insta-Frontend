import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface BatchItem {
    _id: string;
    created_at: Date;
    funded_at: Date;
    batch_id: string;
    bank: string;
    amount: number;
    status: number;
    store?: StoreInfo;
    user?: UserInfo;
};

export interface SetBatchStatusRequest{
    _id: string,
    status: number
}
