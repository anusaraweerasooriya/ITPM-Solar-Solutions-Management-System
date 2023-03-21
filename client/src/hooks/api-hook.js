import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  reducerPath: "customApi",
  tagTypes: ["AdminRuralProjects", "RuralProjects", "Products", "AdminProducts", "Users"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAdminRuralProjects: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "projects/adminRuralProjects",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
      providesTags: ["AdminRuralProjects"],
    }),
    getRuralProjects: build.query({
      query: () => "projects/ruralProjects",
      providesTags: ["RuralProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
    getAdminProducts: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "products/adminProducts",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
    }),
    getProducts: build.query({
      query: () => "products/viewProducts",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetAdminRuralProjectsQuery, useGetRuralProjectsQuery, useGetAdminProductsQuery, useGetProductsQuery, useGetUsersQuery } = customApi;
