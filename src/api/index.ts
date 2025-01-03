import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = `https://44.196.8.152:8000`;

enum Tags {
  Posts = "Posts"
}

export const LIMIT = 20;
// Base query function for making requests
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/v1`,
  prepareHeaders: (headers) => {
    const auth = localStorage.getItem("token");
    if (auth) {
      headers.set("Authorization", `Bearer ${auth}`);
    }
    return headers;
  },
});

// const queryWithRefreshToken = fetchBaseQuery({
//   baseUrl: `${BASE_URL}`,
//   prepareHeaders: (headers) => {
//     const auth = localStorage.getItem("userauth");
//     if (auth) {
//       const { refreshToken } = JSON.parse(auth);
//       headers.set("Authorization", `Bearer ${refreshToken}`);
//     }
//     return headers;
//   },
// });

type ApiArgs = {
  url: string;
  method: string;
  body?: any;
};

const baseQueryWithReauth = async (
  args: ApiArgs,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [...Object.values(Tags)],
  endpoints: (builder) => ({
    createPost: builder.mutation<ApiResponse<any>, any>({
      query: (body) => ({
        url: `/post/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Posts]
    }),
    getPosts: builder.query<ApiResponse<any>, { page: number, limit: number }>({
      query: ({ page, limit }) => ({
        url: `/post/get`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [Tags.Posts],
    }),
    getUserDetails: builder.query<ApiResponseUserData<any>, void>({
      query: () => ({
        url: `/user/userdata`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<ApiResponseUserData<any>, any>({
      query: (body) => ({
        url: `/user/updateUserData`,
        method: "PUT",
        body,
      }),
    }),
    getMyPost: builder.query<ApiResponse<any>, void>({
      query: () => ({
        url: `/post/mypost`,
        method: "GET"
      }),
    }),
    makeLikeDislike: builder.mutation<LikeApiResponse, string>({
      query: (postId) => ({
        url: `/post/likDislike/${postId}`,
        method: "PUT",
      })
    }),
    socialLogin: builder.mutation<LoginResponse, any>({
      query: (body) => ({
        url: `/user/social_login`,
        method: "POST",
        body
      })
    }),
    getPostById: builder.query<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/post/get/${id}`,
        method: "GET"
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserDetailsQuery,
  useCreatePostMutation,
  useUpdateUserMutation,
  useGetMyPostQuery,
  useMakeLikeDislikeMutation,
  useSocialLoginMutation,
  useGetPostByIdQuery
} = api;
