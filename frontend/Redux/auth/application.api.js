import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const applicationApi = createApi({
    
    reducerPath:"applicationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_BACKEND_URL,
        // mode:'cors',
        credentials:"include"
    }),    
    tagTypes: ['Application'],
    endpoints: (builder)=>({
        createApplication: builder.mutation({
            query: (data)=>({
                url:"/application/create",
                method:"POST",
                body: data
            })
        }),
        updateApplication: builder.mutation({
            query: (data)=>({
                url:`/application/update/${data.id}`,
                method:"PUT",
                body: data.values
            }),
            invalidatesTags: ['Application']
        }),
        updateApplicationStatus: builder.mutation({            
            query: (data)=>({
                url:`/application/update/${data.id}/${data.status}`,
                method:"PUT",
            }),
            async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
            
                  // Manually update the cache for useGetRecuiterApplicationQuery
                  dispatch(
                    applicationApi.util.updateQueryData(
                      "getRecuiterApplication",
                      undefined,
                      (draft) => {
                        const application = draft.applications.find(
                          (app) => app._id === id
                        );
                        if (application) {
                          application.status = status; // Update the status directly
                        }
                      }
                    )
                  );
                } catch (error) {
                  console.error("Error updating status in cache:", error);
                }
              },
            invalidatesTags: ['Application']
        }),
        getUserApplication: builder.query({
            query: ()=>({
                url:"/applications/employerAll",
                method:"GET",
                providesTags: ['Application'],
            })
        }),
        getAllApplication: builder.query({
            query: ()=>({
                url:"/applications/all",
                method:"GET",
            })
        }),
        getRecuiterApplication: builder.query({
            query: ()=>({
                url:"/applications/recuiterAll",
                method:"GET",
                providesTags: ['Application'],
            })
        }),
        getSingleApplication: builder.query({
            query: (id)=>({
                url:`/applications/${id}`,
                method:"GET",
            })
        }),
        delteApplication: builder.mutation({
            query: (id)=>({
                url:`/application/delete/${id}`,
                method:'DELETE'
            })
        })
    })
})

export const {useCreateApplicationMutation,useUpdateApplicationStatusMutation,useGetUserApplicationQuery,useGetRecuiterApplicationQuery,useUpdateApplicationMutation,useDelteApplicationMutation,useGetAllApplicationQuery,useGetSingleApplicationQuery} = applicationApi