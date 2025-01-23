import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const applicationApi = createApi({
    
    reducerPath:"applicationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        // mode:'cors',
        credentials:"include"
    }),    
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
            })
        }),
        updateApplicationStatus: builder.mutation({            
            // query: (data)=>({
            //     url:`/application/update/${data.id}/${data.status}`,
            //     method:"PUT",
            // })
        }),
        getUserApplication: builder.query({
            query: ()=>({
                url:"/applications/employerAll",
                method:"GET"
            })
        }),
        getRecuiterApplication: builder.query({
            query: ()=>({
                url:"/applications/recuiterAll",
                method:"GET"
            })
        }),
        getSingleApplication: builder.query({
            query: (id)=>({
                url:`/applications/${id}`,
                method:"GET"
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

export const {useCreateApplicationMutation,useUpdateApplicationStatusMutation,useGetUserApplicationQuery,useGetRecuiterApplicationQuery,useUpdateApplicationMutation,useDelteApplicationMutation,useGetSingleApplicationQuery} = applicationApi