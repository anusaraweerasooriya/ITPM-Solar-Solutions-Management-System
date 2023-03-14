import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
        baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_BASE_URL }),
        reducerPath: "adminApi",
        tagTypes: ["RuralProjects"],
        endpoints: (build) => ({
            getRuralProjects: build.query({
                query: () => "projects/ruralProjects", 
                providesTags: ["RuralProjects"],
            }),
        }),
    });

export const { useGetRuralProjectsQuery } = api;
