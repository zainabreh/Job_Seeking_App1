import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    mode: "cors"
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (data={}) => ({
        url: `/job/all?search=${data.search?data.search:""}&limit=${data.limit}&status=${data.status?data.status:""}&location=${data.location?data.location:""}&page=${data.page}&category=${data.category?data.category:""}`,
        method: "GET",
      })
    }),
    getSingleJob: builder.query({
      query: (id) => ({
        url: `/job/singleJob/${id}`,
        method: "GET",
      }),
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: "/job/newJob",
        method: "POST",
        body: data,
      }),      
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/job/deleteJob/${id}`,
        method: "DELETE",
      }),
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: `/job/updateJob/${data._id}`,
        method: "PUT",
        body: data.formData,
      }),
    }),
    getMyJobs: builder.query({
      query: () => ({
        url: "/job/getmyJobs",
        method: "GET"
      })
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetMyJobsQuery,
  useGetSingleJobQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobApi;
