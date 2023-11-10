import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GLOBAL_CONSTANTS } from "../utility/constants";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GLOBAL_CONSTANTS.baseUrl,
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "menuItem",
      }),
      providesTags: ["MenuItems"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `menuItem/${id}`,
      }),
      providesTags: ["MenuItems"],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: `menuItem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: `menuItem/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `menuItem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
    }),
  }),
});

export const {
  useGetMenuItemByIdQuery,
  useGetMenuItemsQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemApi;
export default menuItemApi;
