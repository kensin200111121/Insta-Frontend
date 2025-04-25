import { MerchantAccountItem } from "@/interface/data/merchantaccount.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface CreateMerchantAccount {
  created_account: MerchantAccountItem
}

export interface UpdateMerchantAccount {
  updated_account: MerchantAccountItem
}

export interface NoteMerchantAccount {
  noted_account: NoteFormData
}

export interface MerchantAccountState {
  merchant_accounts: MerchantAccountItem[];
}

const initialState: MerchantAccountState = {
  ...getGlobalState(),
  merchant_accounts: [],
};

const merchantAccountSlice = createSlice({
  name: 'merchant_account',
  initialState,
  reducers: {
    setMerchantAccount(state, action: PayloadAction<Partial<MerchantAccountState>>) {
      Object.assign(state, action.payload);
    },
    createMerchantAccount(state, action: PayloadAction<CreateMerchantAccount>) {
      state.merchant_accounts.unshift(action.payload.created_account);
    },
    updateMerchantAccount(state, action: PayloadAction<UpdateMerchantAccount>) {
      const index = state.merchant_accounts.findIndex(account => account._id == action.payload.updated_account._id);
      state.merchant_accounts.splice(index, 1, action.payload.updated_account);
    },
    noteMerchantAccount(state, action: PayloadAction<NoteMerchantAccount>) {
      const index = state.merchant_accounts.findIndex(account => account._id == action.payload.noted_account.id);
      state.merchant_accounts[index].note = action.payload.noted_account.notes;
    }
  },
});

export const { setMerchantAccount, createMerchantAccount, updateMerchantAccount, noteMerchantAccount } = merchantAccountSlice.actions;

export default merchantAccountSlice.reducer;
