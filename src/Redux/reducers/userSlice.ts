import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  isAuthenticated: false,
  userDetail: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<User>) => {
      state.userDetail = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserDetail, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
