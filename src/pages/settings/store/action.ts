import type { LocationItem } from '@/interface/data/location.interface';
import type { CreateUserRequest, UserInfoItem } from '@/interface/data/setting.interface';

import { apiAddUser, apiGetLocation, apiGetUsers } from '@/api/pages/setting.api';
import { createAsyncAction } from '@/stores/utils';

import { addNewUser, setSettingLocation, setSettingState } from './reducer';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetUsersAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetUsers();

    if (status) {
      dispatch(
        setSettingState({
          users: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateNewUserAsync = createAsyncAction<CreateUserRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiAddUser(data);

    if (status) {
      dispatch(
        addNewUser({
          newUser: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const GetUserLocation = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetLocation();

    if (status) {
      dispatch(
        setSettingLocation({
          location: result,
        }),
      );

      return true;
    }

    return false;
  };
});
