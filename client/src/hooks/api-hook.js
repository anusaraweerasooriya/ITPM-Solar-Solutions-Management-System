// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_BASE_URL }),
//   reducerPath: "clientApi",
//   tagTypes: ["UserRegister"],
//   endpoints: (build) => ({
//     registerUser: build.query({
//       query: ({ formData }) => ({
//         url: "auth/register",
//         method: "POST",
//         body: formData,
//       }),
//       providesTags: ["UserRegister"],
//     }),
//   }),
// });

// export const { useRegisterUserQuery } = api;
