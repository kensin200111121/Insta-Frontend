import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';
import { NotProcessedReportItem } from '@/interface/data/report.interface';

export interface NotProcessedReportState {
  not_processeds: NotProcessedReportItem[];
}

const initialState: NotProcessedReportState = {
  ...getGlobalState(),
  not_processeds: [],
};

const notProcessedReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setNotProcessedReports(state, action: PayloadAction<Partial<NotProcessedReportState>>) {
      Object.assign(state, action.payload);
    }
  },
});

export const { setNotProcessedReports } = notProcessedReportSlice.actions;

export default notProcessedReportSlice.reducer;
