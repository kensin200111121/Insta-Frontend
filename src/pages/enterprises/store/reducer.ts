import { EnterpriseItem } from "@/interface/data/enterprise.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';

export interface CreateEnterprise {
  created_account: EnterpriseItem
}

export interface RemoveEnterprise {
  enterprise_id: string
}

export interface EnterpriseState {
  enterprises: EnterpriseItem[];
}

const initialState: EnterpriseState = {
  ...getGlobalState(),
  enterprises: [],
};

const enterpriseAccountSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {
    setEnterprise(state, action: PayloadAction<Partial<EnterpriseState>>) {
      Object.assign(state, action.payload);
    },
    createEnterprise(state, action: PayloadAction<CreateEnterprise>) {
      state.enterprises.unshift(action.payload.created_account);
    },
    removeEnterprise(state, action: PayloadAction<RemoveEnterprise>) {
      const index = state.enterprises.findIndex(enterprise => enterprise._id == action.payload.enterprise_id)
      if (index !== -1)
        state.enterprises = state.enterprises.filter((_, i) => i !== index);
    }
  },
});

export const { setEnterprise, createEnterprise, removeEnterprise } = enterpriseAccountSlice.actions;

export default enterpriseAccountSlice.reducer;
