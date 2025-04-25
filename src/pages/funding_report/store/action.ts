import { apiGetFundingReport, apiNoteFundingReport } from '@/api/pages/fundingreport.api';
import { setFundingReport, noteFundingReport } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { NoteFormData } from '@/components/dialogs/note-form';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetFundingReportAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetFundingReport();

    if (status) {
      dispatch(
        setFundingReport({
          funding_report: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteFundingReportAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteFundingReport(data);

    if (status) {
      dispatch(
        noteFundingReport({
          noted_report: result
        }),
      );

      return true;
    }

    return false;
  };
});
