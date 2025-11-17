import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_BACKEND_URL,
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
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/user/updateUserRole/${data.id}/${data.roles}`,
        method: 'PUT',
      }),
       async onQueryStarted({ id, roles }, { dispatch, queryFulfilled }) {
                      try {
                        const { data } = await queryFulfilled;
                  
                        // Manually update the cache for useGetRecuiterApplicationQuery
                        dispatch(
                          authApi.util.updateQueryData(
                            "allUser",
                            undefined,
                            (draft) => {
                              if (draft && draft.user) { // Ensure draft.user exists
                                const user = draft.user.find((app) => app._id === id);
                                if (user) {
                                  user.roles = roles;
                                }
                              } else {
                                console.warn("Cache structure is different than expected!");
                              }
                            }
                          )
                        );
                      } catch (error) {
                        console.error("Error updating status in cache:", error);
                      }
                    },
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
  useUpdateUserRoleMutation,
  useSingleUserQuery,
  useAllUserQuery
  // useGetProfileQuery,
} = authApi;
