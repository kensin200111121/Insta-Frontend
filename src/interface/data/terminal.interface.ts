import { StoreInfo } from "./store.interface";
import { UserInfo } from "./user.interface";

export interface TerminalItem {
    _id: string;
    serial_number: string;
    model_number: string;
    description: string;
    MID: string;
    TPN: string;
    token: string,
    note: string;
    status: number;
    store?: StoreInfo;
    user?: UserInfo;
};

export interface TerminalUpdateRequest {
    _id: string;
    store_id: string,
    serial_number: string,
    TPN: string,
    model: string,
    token: string,
    description: string,
};

export interface SetTerminalStatusRequest{
    _id: string,
    status: number
}
