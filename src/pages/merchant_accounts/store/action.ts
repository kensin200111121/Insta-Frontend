import { apiGetMerchantAccounts, apiCreateMerchantAccount, apiNoteMerchantAccount, apiUpdateMerchantAccount } from '@/api/pages/merchantaccount.api';
import { setMerchantAccount, createMerchantAccount, noteMerchantAccount, updateMerchantAccount } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { MerchantAccountFormData } from '@/components/dialogs/merchant-account';
import { NoteFormData } from '@/components/dialogs/note-form';
import { MerchantAccountItem } from '@/interface/data/merchantaccount.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetMerchantAccountAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetMerchantAccounts();

    if (status) {
      dispatch(
        setMerchantAccount({
          merchant_accounts: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateMerchantAccountAsync = createAsyncAction<MerchantAccountFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateMerchantAccount(data);

    if (status) {
      dispatch(
        createMerchantAccount({
          created_account: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const UpdateMerchantAccountAsync = createAsyncAction<MerchantAccountItem, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiUpdateMerchantAccount(data);

    if (status) {
      dispatch(
        updateMerchantAccount({
          updated_account: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteMerchantAccountAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteMerchantAccount(data);

    if (status) {
      dispatch(
        noteMerchantAccount({
          noted_account: result
        }),
      );

      return true;
    }

    return false;
  };
});
