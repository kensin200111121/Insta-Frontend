import { createAsyncAction } from '@/stores/utils';

import { setNotProcessedReports } from './reducer';
import { apiGetNotProcessedReports } from '@/api/pages/report.api';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetNotProcessedReportsAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetNotProcessedReports(params);

    if (status) {
      dispatch(
        setNotProcessedReports({
          not_processeds: result
        }),
      );

      return true;
    }

    return false;
  };
});
