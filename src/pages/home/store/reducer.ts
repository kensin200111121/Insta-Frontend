import { NotificationItem, chartItem, statisticsForAdmin, statisticsForStore } from "@/interface/data/home.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface RemoveNotification {
  notification_id: string
}

export interface CreateNotification {
  notification: NotificationItem
}

export interface HomePageState {
  notifications: NotificationItem[];
  statistics: statisticsForAdmin | statisticsForStore | undefined;
  sales: chartItem[];
}  

const initialState: HomePageState = {
  ...getGlobalState(),
  notifications: [],
  statistics: undefined,
  sales: [],
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    setHomepageState(state, action: PayloadAction<Partial<HomePageState>>) {
      Object.assign(state, action.payload);
    },
    removeNotification(state, action: PayloadAction<RemoveNotification>) {
      const index = state.notifications.findIndex(note => note._id == action.payload.notification_id)
      state.notifications[index].status = 1;
    },
    createNotification(state, action: PayloadAction<CreateNotification>) {
      state.notifications.unshift(action.payload.notification);
    }
  },
});

export const { setHomepageState, removeNotification, createNotification } = homepageSlice.actions;

export default homepageSlice.reducer;
