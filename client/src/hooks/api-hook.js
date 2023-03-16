import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  reducerPath: "customApi",
  tagTypes: ["RuralProjects", "Users"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getRuralProjects: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "projects/ruralProjects",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
      providesTags: ["RuralProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetRuralProjectsQuery, useGetUsersQuery } = customApi;
