import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';
import { ReportItem } from '@/interface/data/report.interface';

export interface ReportState {
  reports: ReportItem[];
}

const initialState: ReportState = {
  ...getGlobalState(),
  reports: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReports(state, action: PayloadAction<Partial<ReportState>>) {
      Object.assign(state, action.payload);
    }
  },
});

export const { setReports } = reportSlice.actions;

export default reportSlice.reducer;
