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
      query: () => "projects/ruralProjects",
      providesTags: ["RuralProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetRuralProjectsQuery, useGetUsersQuery } = customApi;
