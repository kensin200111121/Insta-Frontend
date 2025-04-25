import { apiGetNotifications, apiGetStatistics, apiGetSales, apiRemoveNotification, apiCreateNotification } from '@/api/pages/home.api';
import { setHomepageState, removeNotification, createNotification } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { NotificationFormData } from '@/components/dialogs/notification-form';
import { chartRequest } from '@/interface/data/home.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetNotificationsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetNotifications();

    if (status) {
      dispatch(
        setHomepageState({
          notifications: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const RemoveNotificationAsync = createAsyncAction<string, boolean>((_id) => {
  return async dispatch => {
    const { result, status } = await apiRemoveNotification(_id);

    if (status) {
      dispatch(
        removeNotification({
          notification_id: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const CraeteNotificationAsync = createAsyncAction<NotificationFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateNotification(data);

    if (status) {
      dispatch(
        createNotification({
          notification: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const GetStatisticsAsync = createAsyncAction<chartRequest, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiGetStatistics(data);

    if (status) {
      dispatch(
        setHomepageState({
          statistics: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const GetSalesAsync = createAsyncAction<chartRequest, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiGetSales(data);

    if (status) {
      dispatch(
        setHomepageState({
          sales: result
        }),
      );

      return true;
    }

    return false;
  };
});
