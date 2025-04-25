import { StoreInfo } from "./store.interface";

export interface NotificationItem {
    _id: string;
    title: string;
    description: string;
    status: number;
    created_at: Date;
    store?: StoreInfo[];
}

export interface chartRequest {
    mode: string,
    timezone: string,
    stores: string[]|undefined,
}

export interface chartItem {
    time: number,
    amount: number
}

export interface statisticsForAdmin {
    totalCount: number,
    termianlCount: number,
    cardTypeTransactionsInfo: Record<string, any>,
    cardBrandTransactionsInfo: Record<string, any>,
    totalAmount: number
}

export interface statisticsForStore {
    totalTransactionCount: number,
    totalTransactionAmount: number,
    todayTransactionInfo: number,
    yesterdayTransactionInfo: number,
    lastWeekTransactionInfo: number,
    refundAmount: number,
    chargebackAmount: number
}
