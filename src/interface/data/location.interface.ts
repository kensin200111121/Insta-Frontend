import type { UserPermissionFormData } from '@/components/dialogs/user-permission';

export interface LocationItem {
  _id: string;
  name: string;
  storeId: string,
  dbaName: string;
  storeInfo: {
    address: string,
    suite: string;
    city: string,
    state: string,
    zip: string,
  },
  contactInfo: {
    name: string,
    phone: string,
    email: string,
  },
  bankInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  };
  isAutoBatchTime: boolean;
  cryptoType: string;
  noTip: boolean;
  noConvenienceFee: boolean;
  tipMode: string;
  tipAmounts: number[];
  percentageFeeMode: boolean;
  percentageFeeAmount: number;
  fixedFeeMode: boolean;
  fixedFeeAmount: number;
  percentageProcessingFeeMode: boolean;
  percentageProcessingFeeAmount: number;
  fixedProcessingFeeMode: boolean;
  fixedProcessingFeeAmount: number;
  timezone: string;
  userMembers: UserMembersInterface[];
  reportUsers: ReportUserInterface[];
  terminals: TerminalInterface[];
  merchant: string[];
  mtd_volume?: string;
  avg_daily_volume?: string;
  avg_ticket?: number;
  db?: string;
  cr?: string;
  visa?: string;
  mc?: string;
  discover?: string;
  amex?: string;
  of_terminals?: string;
  notes?: string;  
}

export interface EditLocationItem {
  data: {
    _id: string;
    name: string;
    dbaName: string;
    storeInfo: {
      address: string,
      suite: string;
      city: string,
      state: string,
      zip: string,
    },
    storeId: string,
    contactInfo: {
      name: string,
      phone: string,
      email: string,
    },
    bankInfo: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      bankName: string;
      routingNumber: string;
      accountNumber: string;
    };
    isAutoBatchTime: boolean;
    cryptoType: string;
    noTip: boolean;
    noConvenienceFee: boolean;
    tipMode: string;
    tipAmounts: number[];
    percentageFeeMode: boolean;
    percentageFeeAmount: string;
    fixedFeeMode: boolean;
    fixedFeeAmount: string;
    percentageProcessingFeeMode: boolean;
    percentageProcessingFeeAmount: string;
    fixedProcessingFeeMode: boolean;
    fixedProcessingFeeAmount: string;
    merchants: string[];
    enterprise: string;
    live: boolean;
    timezone: string;
    agents: {
      agent: string;
      commissionRatesAmount: string;
      perTransactionAmount: string;
      type: number;
    }[]
  };
  ownerUser: { name: string; email: string; password: string };
  userMembers: UserMembersInterface[];
  reportUsers: ReportUserInterface[];
  terminals: TerminalInterface[];
}

export interface LocationCreateFormItem {
  _id: string;
  storeId: string;
  name: string;
  dbaName: string;
  address: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  nameOnBankAccount: string;
  addressOnBank: string;
  bankCity: string;
  bankState: string;
  bankZip: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  isAutoBatchTime: boolean;
  cryptoType: string;
  noTip: boolean;
  noConvenienceFee: boolean;
  tipMode: string;
  tipAmounts: number[];
  tipAmount1: string;
  tipAmount2: string;
  tipAmount3: string;
  tipAmount4: string;
  tipAmount5: string;
  tipAmount6: string;
  percentageFeeMode: boolean;
  percentageFeeAmount: string;
  fixedFeeMode: boolean;
  fixedFeeAmount: string;
  percentageProcessingFeeMode: boolean;
  percentageProcessingFeeAmount: string;
  fixedProcessingFeeMode: boolean;
  fixedProcessingFeeAmount: string;
  commissionRatesAmount: string;
  perTransactionAmount: string;
  ownershipProof: {
    name: string;
    link: string;
  };
  userMembers: UserMembersInterface[];
  reportUsers: ReportUserInterface[];
  terminals: TerminalInterface[];
  merchants: string[];
  agent: string;
  enterprise: string;
  secondAgent: string;
  secondCommissionRatesAmount: string;
  secondPerTransactionAmount: string;
  subAgent: string;
  subCommissionRatesAmount: string;
  subPerTransactionAmount: string;
  live: boolean;
  timezone: string;
}

export interface LocationListItem {
  _id: string;
  name: string;
  dbaName: string;
  storeId: string;
  agent_name: string;
  mtd_transaction_count?: number;
  mtd_volume?: number;
  avg_daily_volume?: number;
  avg_ticket?: number;
  db?: number;
  cr?: number;
  visa?: number;
  mc?: number;
  discover?: number;
  amex?: number;
  of_terminals?: number;
  descriptor?: string;
  notes?: string;
  ownershipProof: {
    name: string;
    link: string;
  };
}

export interface UserOwnerInterface {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerPassword: string;
  readOnly: boolean;
}

export interface UserMembersInterface {
  _id: string;
  name: string;
  pin: string;
  readOnly: boolean;
  permissions: UserPermissionFormData;
}

export interface ReportUserInterface {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  readOnly: boolean;
}

export interface TerminalInterface {
  _id: string;
  model: string;
  serialNumber: string;
  description: string;
  readOnly: boolean;
}
