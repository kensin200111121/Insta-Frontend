import type { ChargebackItem } from '@/interface/data/chargeback.interface';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface ChargebackState {
  chargebacks: ChargebackItem[];
  total: number;
}

export interface SetChargeback {
  setChargeback: ChargebackItem;
}

const initialState: ChargebackState = {
  ...getGlobalState(),
  chargebacks: [],
  total: 0
};

const chargebackSlice = createSlice({
  name: 'chargeback',
  initialState,
  reducers: {
    setChargebacks(state, action: PayloadAction<Partial<ChargebackState>>) {
      Object.assign(state, action.payload);
    },
    updateChargebackWithEvidence(state, action: PayloadAction<{ id: string; name: string; link: string }>) {
      state.chargebacks.some(e => {
        if (e._id === action.payload.id) {
          e.evidence = {
            name: action.payload.name,
            link: action.payload.link,
          };

          return;
        }
      });
    },
    setChargebackStatus(state, action: PayloadAction<SetChargeback>) {
      const index = state.chargebacks.findIndex(t => t._id == action.payload.setChargeback._id)
      if(index >= 0){
        state.chargebacks[index].status = action.payload.setChargeback.status;
      }
    }
  },
});

export const { setChargebacks, updateChargebackWithEvidence, setChargebackStatus } = chargebackSlice.actions;

export default chargebackSlice.reducer;
