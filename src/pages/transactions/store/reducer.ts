import { TransactionItem } from "@/interface/data/transaction.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface TransactionState {
  transactions: TransactionItem[];
  total: number;
}

const initialState: TransactionState = {
  ...getGlobalState(),
  transactions: [],
  total: 0,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Partial<TransactionState>>) {
      Object.assign(state, action.payload);
    },
    updateTransaction(state, action: PayloadAction<{id: string}>) {
      state.transactions.some((e) => {
        if (e._id === action.payload.id) {
          e.isRefunded = true;
          return true;
        }
      })
    }
  },
});

export const { setTransactions, updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
