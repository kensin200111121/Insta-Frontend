import { apiCreateEnterprise, apiGetEnterprises, apiRemoveEnterprise } from '@/api/pages/enterprise.api';
import { createEnterprise, setEnterprise, removeEnterprise } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { EnterpriseFormData } from '@/components/dialogs/enterprise-form';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetEnterpriseAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetEnterprises();

    if (status) {
      dispatch(
        setEnterprise({
          enterprises: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateEnterpriseAsync = createAsyncAction<EnterpriseFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateEnterprise(data);

    if (status) {
      dispatch(
        createEnterprise({
          created_account: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const GetEnterprisesAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetEnterprises();

    if (status) {
      dispatch(
        setEnterprise({
          enterprises: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const RemoveEnterpriseAsync = createAsyncAction<string, boolean>((_id) => {
  return async dispatch => {
    const { result, status } = await apiRemoveEnterprise(_id);

    if (status) {
      dispatch(
        removeEnterprise({
          enterprise_id: result
        }),
      );

      return true;
    }

    return false;
  };
});
