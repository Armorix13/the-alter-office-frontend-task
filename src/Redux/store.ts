import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import feedReducer from './reducers/feedSlice';
import { api } from '../api';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
