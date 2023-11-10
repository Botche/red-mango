import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GLOBAL_CONSTANTS } from "../utility/constants";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GLOBAL_CONSTANTS.baseUrl,
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: "payment",
        method: "POST",
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
export default paymentApi;
