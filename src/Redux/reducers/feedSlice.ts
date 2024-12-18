import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  posts: string[];
  loading: boolean;
}
const initialState: FeedState = {
  posts: [],
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<string[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFeed, setLoading } = feedSlice.actions;
export default feedSlice.reducer;
