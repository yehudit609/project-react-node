import apiSlice from "../../app/apiSlice"

const managProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAllProductWithCategoryName: build.query({
            query: () => ({
                url: "/api/product/withCategoryName"
            }),
            providesTags:["ManagerProducts"]

        }),


        createNewProduct: build.mutation({
            query: (prodToAdd) => ({
                url: "/api/product",
                method: "POST",
                body: prodToAdd
            }),
            invalidatesTags:["ManagerProducts"]
        }),


        updateProduct: build.mutation({
            query: (prodToUpdate) => ({
                url: "/api/product/",
                method: "PUT",
                body: prodToUpdate
            }),
            invalidatesTags:["ManagerProducts"]
        }),

        deleteProduct: build.mutation({
            query: (prodIdToDelete) => ({
                url: "/api/product/"+prodIdToDelete,
                method: "DELETE"
            }),
            invalidatesTags:["ManagerProducts"]
        })
    })
})
export const { useCreateNewProductMutation, useUpdateProductMutation, useDeleteProductMutation,useGetAllProductWithCategoryNameQuery } = managProductApiSlice