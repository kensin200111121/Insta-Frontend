import { apiCreateRefund, apiGetRefunds } from '@/api/pages/refund.api';
import { createAsyncAction } from '@/stores/utils';

import { createRefund, setRefunds } from './reducer';
import { RefundCreateRequest } from '@/interface/data/refund.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetRefundsAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetRefunds(params);

    if (status) {
      dispatch(
        setRefunds({
          refunds: result.data,
          total: result.total
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateRefundAsync = createAsyncAction<RefundCreateRequest, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateRefund(data);

    if (status) {
      dispatch(
        createRefund({
          created_refund: result
        }),
      );

      return true;
    }

    return false;
  };
});

