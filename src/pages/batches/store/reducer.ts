import { BatchItem } from "@/interface/data/batch.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface BatchState {
  batches: BatchItem[];
  total: number;
}

export interface SetBatch {
  setBatch: BatchItem;
}

const initialState: BatchState = {
  ...getGlobalState(),
  batches: [],
  total: 0
};

const batchSlice = createSlice({
  name: 'batch',
  initialState,
  reducers: {
    setBatches(state, action: PayloadAction<Partial<BatchState>>) {
      Object.assign(state, action.payload);
    },
    setBatchStatus(state, action: PayloadAction<SetBatch>) {
      const index = state.batches.findIndex(t => t._id == action.payload.setBatch._id)
      if(index >= 0){
        state.batches[index].status = action.payload.setBatch.status;
      }
    }
  },
});

export const { setBatches, setBatchStatus } = batchSlice.actions;

export default batchSlice.reducer;
