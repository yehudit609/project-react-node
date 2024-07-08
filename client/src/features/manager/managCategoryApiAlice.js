import apiSlice from "../../app/apiSlice"

const managCategoryApiAlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAllCategories: build.query({
            query: () => ({
                url: "/api/category"
            }),
            providesTags:["Category"]

        }),


        createNewProduct: build.mutation({
            query: (prodToAdd) => ({
                url: "/api/product",
                method: "POST",
                body: prodToAdd
            }),
            invalidatesTags:["Category"]
        }),


        updateProduct: build.mutation({
            query: (prodToUpdate) => ({
                url: "/api/product/",
                method: "PUT",
                body: prodToUpdate
            }),
            invalidatesTags:["Category"]
        }),

        deleteProduct: build.mutation({
            query: (prodIdToDelete) => ({
                url: "/api/product/"+prodIdToDelete,
                method: "DELETE"
            }),
            invalidatesTags:["Category"]
        })
    })
})
export const {useGetAllCategoriesQuery, useCreateNewProductMutation, useUpdateProductMutation, useDeleteProductMutation} = managCategoryApiAlice