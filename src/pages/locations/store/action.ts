import { apiGetLocations, apiGetstatistics } from '@/api/pages/location.api';
import { createAsyncAction } from '@/stores/utils';

import { setLocations, setLocationStatistics } from './reducer';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetLocationStatisticsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetstatistics();

    if (status) {
      dispatch(
        setLocationStatistics({
          locationStatistics: result,
        }),
      );

      return true;
    }

    return false;
  };
});


// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetLocationsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetLocations();

    if (status) {
      dispatch(
        setLocations({
          locations: result,
        }),
      );

      return true;
    }

    return false;
  };
});

