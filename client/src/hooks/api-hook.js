import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  reducerPath: "customApi",
  tagTypes: ["AdminRuralProjects", "RuralProjects", "Users"],
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
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["AdminRuralProjects"],
    }),
    getAdminPlanRequests: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "requests/adminGetPlanRequests",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
    }),
    getRuralProjects: build.query({
      query: () => "projects/ruralProjects",
      providesTags: ["RuralProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAdminRuralProjectsQuery,
  useGetRuralProjectsQuery,
  useGetUsersQuery,
  useGetAdminPlanRequestsQuery,
} = customApi;
