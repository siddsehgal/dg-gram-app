import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelfProfileState {
  value: boolean;
}

const initialState: SelfProfileState = {
  value: false,
};

export const SelfProfileSlice = createSlice({
  name: "selfProfile",
  initialState,
  reducers: {
    changeSelfProfileStatus(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSelfProfileStatus } = SelfProfileSlice.actions;

export default SelfProfileSlice.reducer;
