import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface FundingReportItem {
    _id: string;
    created_at: Date;
    funded_at?: Date;
    ACH_ID: string;
    amount: number;
    errorCount: number;
    status: number;
    note?: string;
    report?: {
        name?: string;
        link?: string;
    };
    store?: StoreInfo;
    user?: UserInfo
};
