import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUserInfo, setIsAuthenticated, setUserInfo } from "../Feature/auth.slice";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: "include",
    // mode: "cors",
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
            const {data} = await queryFulfilled            
            // dispatch(authApi.endpoints.getProfile.initiate(null))
            if (data.success) {
              const profileResult = await dispatch(authApi.endpoints.getProfile.initiate(null)).unwrap();
              console.log("Fetched profile:", profileResult);
            } else {
              console.error("Login failed:", data.message);
            }
        } catch (error) {
          console.error("Error during login or fetching profile:", error);
            
        }
      }
    }),
    getProfile: builder.query({
      query: ()=> 'getUserProfile',
      async onQueryStarted(arg,{dispatch,queryFulfilled}){
          try {
              const {data} = await queryFulfilled
              console.log("profile query,,,,,,,,,,,",data);
              
              if(!data.success){
                dispatch(setIsAuthenticated(false))
                return
              }
              dispatch(setUserInfo(data))
              dispatch(setIsAuthenticated(true))
              
          } catch (error) {
            dispatch(setUserInfo(null))
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
  useGetProfileQuery,
} = authApi;
