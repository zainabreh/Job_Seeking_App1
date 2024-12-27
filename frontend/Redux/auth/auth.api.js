import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUserInfo, setIsAuthenticated, setUserInfo } from "../Feature/auth.slice";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg,{dispatch,queryFulfilled}){
        try {
            await queryFulfilled
            dispatch(authApi.endpoints.getprofile.initiate(null))
        } catch (error) {
            console.log("qqqqqqqqqqqqqqqqqqqqq");
            
        }
      }
    }),
    getprofile: builder.query({
      query: ()=> 'getUserProfile',
      async onQueryStarted(arg,{dispatch,queryFulfilled}){
          try {
              const {data} = await queryFulfilled
              if(!data.success){
                dispatch(setIsAuthenticated(false))
                return
              }
              dispatch(setUserInfo(data))
              dispatch(setIsAuthenticated(true))
              
          } catch (error) {
            dispatch(setUserInfo(''))
            dispatch(setIsAuthenticated(false))
          }
      }
    }),
    logoutUser: builder.query({
      query: ()=>'/auth/logout',
      async onQueryStarted(arg,{dispatch,queryFulfilled}){
          try {
              await queryFulfilled;
              dispatch(setUserInfo(''))
              dispatch(setIsAuthenticated(false))
          } catch (error) {
            dispatch(setUserInfo(''))
            dispatch(setIsAuthenticated(false))
          }
      }
    })
  }),

});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogoutUserQuery,
  useGetprofileQuery,
} = authApi;
