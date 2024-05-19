import apiSlice from "../../app/apiSlice"

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewProd: build.mutation({
            query: (registerUser) => ({
                url: "/api/product",
                method: "POST",
                body: registerUser
            })
        }),

        deleteProd: build.mutation({
            query: (id) => ({
                url: "/api/product/"+id,
                method: "DELETE"
            })
        }),
        
        updateProd: build.mutation({
            query: (product) => ({
                url: "/api/product",
                method: "PUT",
                body: product
            }),
            invalidatesTags:["prods"]
        }),
        getAllProd: build.query({
            query: () => ({
                url: "/api/product",
                method: "GET",
            })
           
        }),
        
        getAllCategories: build.query({
            query: () => ({
                url: "/api/category",
                method: "GET",
            })
        }),
        getProdWithCategoryName: build.query({
            query: () => ({
                url: "/api/product/withCategoryName",
                method: "GET",
            }),
            providesTags:["prods"]
        })
        
    })
})
export const { useGetProdWithCategoryNameQuery,useGetAllCategoriesQuery,useAddNewProdMutation, useGetAllProdQuery ,useDeleteProdMutation,useUpdateProdMutation} = managerApiSlice