import type { ReportUserInterface } from '@/interface/data/location.interface';
import type { CreateUserRequest } from '@/interface/data/setting.interface';

import { apiAddReporter, apiAddUser, apiGetLocation, apiGetReporters, apiGetUsers, apiGetUsersWithPins, apiRemoveReporter, apiRemoveUser } from '@/api/pages/setting.api';
import { createAsyncAction } from '@/stores/utils';

import { addNewReporter, addNewUser, removeReporter, removeUser, setSettingLocation, setSettingState } from './reducer';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetUsersWithPinsAsync = createAsyncAction<string, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiGetUsersWithPins(data);

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

export const RemoveUserAsync = createAsyncAction<string, boolean>((_id) => {
  return async dispatch => {
    const { result, status } = await apiRemoveUser(_id);

    if (status) {
      dispatch(
        removeUser({
          user_id: result
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

export const GetReportersAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetReporters();

    if (status) {
      dispatch(
        setSettingState({
          reporters: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateNewReporterAsync = createAsyncAction<ReportUserInterface, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiAddReporter(data);

    if (status) {
      dispatch(
        addNewReporter({
          newReporter: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const RemoveReporterAsync = createAsyncAction<string, boolean>((_id) => {
  return async dispatch => {
    const { result, status } = await apiRemoveReporter(_id);

    if (status) {
      dispatch(
        removeReporter({
          reporter_id: result
        }),
      );

      return true;
    }

    return false;
  };
});

