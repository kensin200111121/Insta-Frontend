import { createAsyncAction } from '@/stores/utils';

import { setReports } from './reducer';
import { apiGetReports } from '@/api/pages/report.api';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetReportsAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetReports(params);

    if (status) {
      dispatch(
        setReports({
          reports: result
        }),
      );

      return true;
    }

    return false;
  };
});
