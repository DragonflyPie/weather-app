import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
