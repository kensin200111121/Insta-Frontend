import { apiGetBatches, apiSetBatchStatus } from '@/api/pages/batch.api';
import { setBatches, setBatchStatus } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { SetBatchStatusRequest } from '@/interface/data/batch.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetBatchesAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetBatches(params);

    if (status) {
      dispatch(
        setBatches({
          batches: result.data,
          total: result.total
        }),
      );

      return true;
    }

    return false;
  };
});

export const SetBatchStatusAsync = createAsyncAction<SetBatchStatusRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiSetBatchStatus(data);

    if (status) {
      dispatch(
        setBatchStatus({
          setBatch: result,
        }),
      );

      return true;
    }

    return false;
  };
});

