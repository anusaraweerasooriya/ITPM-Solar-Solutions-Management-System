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
    "PendingRequestById",
    "AdminDonations",
    "CompletedProjects",
    "Products",
    "AdminProducts",
    "RuralProjectById",
    "DonationById",
    "UserDonations",
    "ProductById",
    "ServicePackById",
    "ServicePackByRequest",
    "AdminProjectPlans",
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
    getAdminProjectPlans: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "plans/getAdminProjectPlans",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["AdminProjectPlans"],
    }),
    getRuralProjects: build.query({
      query: () => "projects/ruralProjects",
      providesTags: ["RuralProjects"],
    }),
    getAdminDonations: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "donations/adminDonations",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["AdminDonations"],
    }),
    getAdminCompletedProjects: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "recentProjects/completedProjects",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["CompletedProjects"],
    }),
    getUsers: build.query({
      query: () => "auth/users",
      providesTags: ["Users"],
    }),
    getAdminProducts: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "products/adminProducts",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
    }),
    getProducts: build.query({
      query: () => "products/viewProducts",
      providesTags: ["Products"],
    }),
    getRequestByUserId: build.query({
      query: ({ user }) => ({
        url: "requests/getRequestsByUser",
        method: "GET",
        params: { user },
      }),
      providesTags: ["UserRequests"],
    }),
    getPendingRequestById: build.query({
      query: ({ reqId }) => ({
        url: "requests/getPendingRequestById",
        method: "GET",
        params: { reqId },
      }),
      providesTags: ["PendingRequestById"],
    }),
    getServicePackById: build.query({
      query: ({ servicePack }) => ({
        url: `plans/getServicePackById/${servicePack}`,
        method: "GET",
      }),
      providesTags: ["ServicePackById"],
    }),
    getServicePackByRequest: build.query({
      query: ({ reqId }) => ({
        url: `plans/getServicePackByRequest/${reqId}`,
        method: "GET",
      }),
      providesTags: ["ServicePackByRequest"],
    }),
    getRuralProjectById: build.query({
      query: ({ projId }) => ({
        url: "projects/getRuralProjectById",
        method: "GET",
        params: { projId },
      }),
      providesTags: ["RuralProjectById"],
    }),
    getDonationById: build.query({
      query: ({ donateId }) => ({
        url: "donations/getDonationById",
        method: "GET",
        params: { donateId },
      }),
      providesTags: ["DonationById"],
    }),
    getDonationsByUserEmail: build.query({
      query: ({ userEmail }) => ({
        url: "donations/getDonationsByUserEmail",
        method: "GET",
        params: { userEmail },
      }),
      providesTags: ["UserDonations"],
    }),
    getProductById: build.query({
      query: ({ prodId }) => ({
        url: "products/getProductById",
        method: "GET",
        params: { prodId },
      }),
      providesTags: ["ProductById"],
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
  useGetAdminProductsQuery,
  useGetProductsQuery,
  useGetPendingRequestByIdQuery,
  useGetServicePackByIdQuery,
  useGetServicePackByRequestQuery,
  useGetAdminProjectPlansQuery,
  useGetRuralProjectByIdQuery,
  useGetDonationByIdQuery,
  useGetDonationsByUserEmailQuery,
  useGetProductByIdQuery,
} = customApi;
