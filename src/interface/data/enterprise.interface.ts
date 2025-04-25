import { StoreInfo } from "./store.interface";

export interface EnterpriseItem {
  _id: string;
  name: string;
  email: string;
  loginInfo: {
    name: string;
    password: string;
  };
  stores?: StoreInfo[];
}

export interface EnterpriseFormRequest {  
  enterpriseId: string;
  enterpriseName: string;
  enterpriseEmail: string;
  enterpriseUserName: string;
  enterprisePassword: string;
  selectedLocations: string[];
}
