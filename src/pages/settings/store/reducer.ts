import type { LocationItem } from '@/interface/data/location.interface';
import type { UserInfoItem } from '@/interface/data/setting.interface';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface SettingState {
  users: UserInfoItem[];
  location: LocationItem;
}

export interface SettingLocation {
  location: LocationItem;
}

export interface AddNewUser {
  newUser: UserInfoItem;
}

export interface RemoveUser {
  user_id: string
}

const initialState: SettingState = {
  ...getGlobalState(),
  users: [],
  location: {} as LocationItem,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSettingState(state, action: PayloadAction<Partial<SettingState>>) {
      Object.assign(state, action.payload);
    },
    addNewUser(state, action: PayloadAction<AddNewUser>) {
      state.users.unshift(action.payload.newUser);
    },
    removeUser(state, action: PayloadAction<RemoveUser>) {
      const index = state.users.findIndex(user => user._id == action.payload.user_id)
      state.users.splice(index, 1);
    },
    setSettingLocation(state, action: PayloadAction<Partial<SettingLocation>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSettingState, addNewUser, setSettingLocation, removeUser } = settingSlice.actions;

export default settingSlice.reducer;
