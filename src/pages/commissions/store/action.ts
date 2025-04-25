import { apiGetCommissions, apiNoteCommission, apiSetCommissionStatus } from '@/api/pages/commission.api';
import { noteCommission, setCommission, setCommissionStatus } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { NoteFormData } from '@/components/dialogs/note-form';
import { SetCommissionStatusRequest } from '@/interface/data/commission.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetCommissionsAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetCommissions(params);

    if (status) {
      dispatch(
        setCommission({
          commissions: result.data,
          total: result.total
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteCommissionAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteCommission(data);

    if (status) {
      dispatch(
        noteCommission({
          noted_commission: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const SetCommissionStatusAsync = createAsyncAction<SetCommissionStatusRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiSetCommissionStatus(data);

    if (status) {
      dispatch(
        setCommissionStatus({
          setCommission: result,
        }),
      );

      return true;
    }

    return false;
  };
});

