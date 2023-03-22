import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  reducerPath: "customApi",
  tagTypes: [
    "AdminRuralProjects",
    "AdminPlanRequests",
    "RuralProjects",
    "Users",
    "UserRequests",
    "AdminDonations",
    "CompletedProjects",
  ],
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
      providesTags: ["AdminPlanRequests"],
    }),
    getRuralProjects: build.query({
      query: () => "projects/ruralProjects",
      providesTags: ["RuralProjects"],
    }),
    getAdminDonations: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "donations/adminDonations",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
      providesTags: ["AdminDonations"],
    }),
    getAdminCompletedProjects: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "recentProjects/completedProjects",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
      providesTags: ["CompletedProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
    getRequestByUserId: build.query({
      query: ({ user }) => ({
        url: "requests/getRequestsByUser",
        method: "GET",
        params: { user },
      }),
      providesTags: ["UserRequests"],
    }),
  }),
});


export const {
  useGetAdminRuralProjectsQuery,
  useGetRuralProjectsQuery,
  useGetUsersQuery,
  useGetAdminPlanRequestsQuery,
  useGetRequestByUserIdQuery,
  useGetAdminDonationsQuery,
   useGetAdminCompletedProjectsQuery,
} = customApi;

