import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseUserData } from "../Types";


export const BASE_URL = `http://44.196.8.152:8000`;

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

enum Tags {
  Posts = "Posts",
}

// const LIMIT = 20;
// const INDEX = 0;
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
    getPost: builder.query<ApiResponse<any>, void>({
      query: () => ({
        url: `/post/get`,
        method: "GET",
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
    })
  }),
});

export const {
  useGetPostQuery,
  useGetUserDetailsQuery,
  useCreatePostMutation,
  useUpdateUserMutation
} = api;
