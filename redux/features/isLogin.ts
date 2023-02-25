import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IsLoginState {
  value: boolean;
}

const initialState: IsLoginState = {
  value: false,
};

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    changeLoginStatus(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoginStatus } = isLoginSlice.actions;

export default isLoginSlice.reducer;
