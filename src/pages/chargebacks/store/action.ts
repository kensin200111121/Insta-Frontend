import { apiGetChargebacks, apiSetChargebackStatus, apiUploadEvidence } from '@/api/pages/chargeback.api';
import { SetChargebackStatusRequest, UploadEvidenceItem } from '@/interface/data/chargeback.interface';
import { createAsyncAction } from '@/stores/utils';

import { setChargebacks, setChargebackStatus } from './reducer';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetChargebacksAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetChargebacks(params);

    if (status) {
      dispatch(
        setChargebacks({
          chargebacks: result.data,
          total: result.total
        }),
      );

      return true;
    }

    return false;
  };
});

// export const UploadEvidenceAsync = createAsyncAction<FormData, boolean>((data) => {
//   return async dispatch => {
//     const { result, status } = await apiUploadEvidence(data);

//     if (status) {
//       dispatch(
//         setBatches({
//           chargebacks: result
//         }),
//       );

//       return true;
//     }

//     return false;
//   };
// });

export const SetChargebackStatusAsync = createAsyncAction<SetChargebackStatusRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiSetChargebackStatus(data);

    if (status) {
      dispatch(
        setChargebackStatus({
          setChargeback: result,
        }),
      );

      return true;
    }

    return false;
  };
});

