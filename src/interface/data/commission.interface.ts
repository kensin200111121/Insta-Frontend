export interface CommissionItem {
  _id: string,
  agentName: string,
  createdAt: Date,
  fundedAt: Date,
  endedAt: Date,
  grossTransactionAmount: number,
  transactionCount: number,
  commissionAmount: number,
  bank: {
    name: string,
    bankName: string,
    street: string,
    suite: string,
    city: string,
    state: string,
    zip: string,
    routingNumber: string,
    accountNumber: string,
  },
  status: number,
  file: string,
  notes: string
}

export interface SetCommissionStatusRequest{
  _id: string,
  status: number
}
