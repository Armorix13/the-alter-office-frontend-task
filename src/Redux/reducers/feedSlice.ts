import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  posts: any[];
  hasMore: boolean;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
}
const initialState: FeedState = {
  posts: [],
  hasMore: true,
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload;
    },
    appendPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setPagination: (
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) => {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { appendPosts, setHasMore, setLoading, setPagination, setPosts } =
  feedSlice.actions;
export default feedSlice.reducer;
