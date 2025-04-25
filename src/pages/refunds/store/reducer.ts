import { RefundItem } from "@/interface/data/refund.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface CreateRefund {
  created_refund: RefundItem
}

export interface RefundState {
  refunds: RefundItem[];
  total: number;
}

const initialState: RefundState = {
  ...getGlobalState(),
  refunds: [],
  total: 0
};

const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    setRefunds(state, action: PayloadAction<Partial<RefundState>>) {
      Object.assign(state, action.payload);
    },
    createRefund(state, action: PayloadAction<CreateRefund>) {
      state.refunds.unshift(action.payload.created_refund);
    }
  },
});

export const { setRefunds, createRefund } = refundSlice.actions;

export default refundSlice.reducer;
