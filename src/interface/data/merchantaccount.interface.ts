import { FeeInfo, StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface MerchantAccountItem {
    _id: string;
    iso_name: string;
    acquirer: string;
    monthly_volume: string;
    MID: string;
    descriptor: string;
    binNum: string;
    agentNum: string;
    chainNum: string;
    storeNum: string;
    terminalNum: string;
    terminalId: string;
    note?: string;
    store?: StoreInfo;
    user?: UserInfo
};
