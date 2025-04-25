import { CommissionItem } from "@/interface/data/commission.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface CommissionState {
  commissions: CommissionItem[];
  total: number;
}

export interface NoteCommission {
  noted_commission: NoteFormData
}

export interface SetCommission {
  setCommission: CommissionItem;
}

const initialState: CommissionState = {
  ...getGlobalState(),
  commissions: [],
  total: 0
};

const commissionAccountSlice = createSlice({
  name: 'commission',
  initialState,
  reducers: {
    setCommission(state, action: PayloadAction<Partial<CommissionState>>) {
      Object.assign(state, action.payload);
    },
    noteCommission(state, action: PayloadAction<NoteCommission>) {
      const index = state.commissions.findIndex(commission => commission._id == action.payload.noted_commission.id);
      state.commissions[index].notes = action.payload.noted_commission.notes;
    },
    setCommissionStatus(state, action: PayloadAction<SetCommission>) {
      const index = state.commissions.findIndex(t => t._id == action.payload.setCommission._id)
      if(index >= 0){
        state.commissions[index].status = action.payload.setCommission.status;
      }
    }
  },
});

export const { setCommission, noteCommission, setCommissionStatus } = commissionAccountSlice.actions;

export default commissionAccountSlice.reducer;
