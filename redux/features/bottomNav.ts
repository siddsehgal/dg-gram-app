import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum BottomNavEnum {
  Hidden = "Hidden",
  Home = "Home",
  Search = "Search",
  Chat = "Chat",
  Profile = "Profile",
  Create = "Create",
}
export interface BottomNavState {
  value: string;
}

const initialState: BottomNavState = {
  value: BottomNavEnum.Home,
};

export const BottomNavSlice = createSlice({
  name: "bottomNav",
  initialState,
  reducers: {
    changeBottomNav(state, action: PayloadAction<BottomNavEnum>) {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeBottomNav } = BottomNavSlice.actions;

export default BottomNavSlice.reducer;
