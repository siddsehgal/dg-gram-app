import { configureStore } from "@reduxjs/toolkit";
import isLogin, { isLoginSlice } from "./features/isLogin";
import selfProfile, { SelfProfileSlice } from "./features/selfProfile";
import bottomNav, { BottomNavSlice } from "./features/bottomNav";

export const store = configureStore({
  reducer: {
    isLogin: isLogin,
    selfProfile: selfProfile,
    bottomNav: bottomNav,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
