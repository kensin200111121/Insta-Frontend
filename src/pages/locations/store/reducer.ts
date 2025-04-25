import { LocationItem, LocationListItem } from "@/interface/data/location.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface LocationState {
  locationStatistics: LocationListItem[];
  locations: LocationItem[],
}

const initialState: LocationState = {
  ...getGlobalState(),
  locations: [],
  locationStatistics: []
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations(state, action: PayloadAction<Partial<LocationState>>) {
      Object.assign(state, action.payload);
    },
    setLocationStatistics(state, action: PayloadAction<Partial<LocationState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setLocations, setLocationStatistics } = locationSlice.actions;

export default locationSlice.reducer;
