import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import feedReducer from './reducers/feedSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
