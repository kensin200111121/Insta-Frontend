import { FundingReportItem } from "@/interface/data/fundingreport.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface CreateFundingReport {
  created_report: FundingReportItem
}

export interface NoteFundingReport {
  noted_report: NoteFormData
}

export interface FundingReportState {
  funding_report: FundingReportItem[];
}

const initialState: FundingReportState = {
  ...getGlobalState(),
  funding_report: [],
};

const fundingReportSlice = createSlice({
  name: 'funding_report',
  initialState,
  reducers: {
    setFundingReport(state, action: PayloadAction<Partial<FundingReportState>>) {
      Object.assign(state, action.payload);
    },
    createFundingReport(state, action: PayloadAction<CreateFundingReport>) {
      state.funding_report.unshift(action.payload.created_report);
    },
    noteFundingReport(state, action: PayloadAction<NoteFundingReport>) {
      const index = state.funding_report.findIndex(report => report._id == action.payload.noted_report.id);
      state.funding_report[index].note = action.payload.noted_report.notes;
    }
  },
});

export const { setFundingReport, createFundingReport, noteFundingReport } = fundingReportSlice.actions;

export default fundingReportSlice.reducer;
