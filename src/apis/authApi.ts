import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GLOBAL_CONSTANTS } from "../utility/constants";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GLOBAL_CONSTANTS.baseUrl,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: userCredentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } =
  authApi;
export default authApi;
