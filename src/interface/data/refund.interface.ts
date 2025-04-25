import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface RefundItem {
    _id: string;
    created_at: Date;
    refunded_at: Date;
    transaction_id: string;
    customer_name: string;
    phone: string;
    amount: number;
    refund: number;
    store: StoreInfo;
    user: UserInfo;
};

export interface RefundCreateRequest {
    transaction_id: string;
    amount: number;
}