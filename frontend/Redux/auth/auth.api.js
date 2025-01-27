import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
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
   
    }),
    // getProfile: builder.query({
    //   query: ()=> 'getUserProfile',
    //   async onQueryStarted(arg,{dispatch,queryFulfilled}){
    //       try {
    //           const {data} = await queryFulfilled
    //           console.log("profile query,,,,,,,,,,,",data.user);
              
    //           if(!data.success){
    //             dispatch(setIsAuthenticated(false))
    //             return
    //           }
    //           dispatch(setUserInfo(data.user))
    //           dispatch(setIsAuthenticated(true))
              
    //       } catch (error) {
    //         dispatch(setUserInfo(null))
    //         dispatch(setIsAuthenticated(false))
    //       }
    //   }
    // }),
    logoutUser: builder.query({
      query: ()=>'/auth/logout',
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/updateuser/${data._id}`,
        method: 'PUT',
        body: data.formData
      })
    }),
    singleUser: builder.query({
      query: (id)=>({
        url: `/user/singleuser/${id}`,
        method: 'GET'
      })
    }),
    allUser: builder.query({
      query: ()=>({
        url:"/user/all",
        method:'GET'
      })
    })
  }),

});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogoutUserQuery,
  useUpdateUserMutation,
  useSingleUserQuery,
  useAllUserQuery
  // useGetProfileQuery,
} = authApi;
