import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.VITE_BACKEND_URL,
        credentials: 'include',
        mode:"cors"
    }),
    endpoints: (builder)=>({
        getAllCategory: builder.query({
            query: ()=>({
                url: "/category/all",
                method: "GET"
            })
        }),
        getSingleCategory: builder.query({
            query: (id)=>({
                url:`/category/single/${id}`,
                method:"GET"
            }),
        }),
        createCategory: builder.mutation({
            query: (data)=>({
                url:"/category/new",
                method:"POST",
                body: data
            })
        }),
        deleteCategory: builder.mutation({
            query: ()=>({
                url:"/category/delete",
                method:"DELETE"
            })
        })
        })
    })


export const {
    useGetAllCategoryQuery,
    useGetSingleCategoryQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation
} = categoryApi