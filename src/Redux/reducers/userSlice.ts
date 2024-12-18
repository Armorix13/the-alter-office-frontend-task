import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  fullName: string;
  profileImage: string;
  coverImage: string;
  boi: string;
  isEmailVerified: boolean;
  socialId: string;
  socialType: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  isAuthenticated: boolean;
  userDetail: User | null;
}

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
