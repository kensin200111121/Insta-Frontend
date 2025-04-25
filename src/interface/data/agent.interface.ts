export interface AgentItem {
  _id: string;
  agentInfo: {
    agentCompanyName: string;
    agentName: string;
    agentEmail: string;
    agentPhone: string;
  };
  bankInfo: {
    name: string;
    bankName: string;
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    routingNumber: string;
    accountNumber: string;
  };
  notes: string;
  loginInfo: {
    name: string;
    password: string;
  };
  commissionRate: number;
  perTransactionAmount: number;
}
