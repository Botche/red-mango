import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GLOBAL_CONSTANTS } from "../utility/constants";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GLOBAL_CONSTANTS.baseUrl,
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ userId, searchString, status, pageNumber, pageSize }) => ({
        url: "order",
        params: {
          ...(userId && { userId }),
          ...(searchString && { searchString }),
          ...(status && { status }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize }),
        },
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get("X-Pagination"),
        };
      },
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrderDetails: builder.mutation({
      query: (orderDetails) => ({
        url: `order/${orderDetails.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderDetailsMutation,
} = orderApi;
export default orderApi;
