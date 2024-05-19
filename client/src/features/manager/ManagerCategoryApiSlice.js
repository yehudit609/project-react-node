import apiSlice from "../../app/apiSlice"

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewCategory: build.mutation({
            query: (registerUser) => ({
                url: "/api/category",
                method: "POST",
                body: registerUser
            })
        }),
        getAllCategories: build.query({
            query: () => ({
                url: "/api/category",
                method: "GET",
            })
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: "/api/category/"+id,
                method: "DELETE"
            })
        }),
        updateCategory: build.mutation({
            query: (product) => ({
                url: "/api/category",
                method: "PUT",
                body: product
            })
        }),
        getCategoryById: build.query({
            query: (id) => ({
                url: "/api/category/"+id,
                method: "GET",
            })
        })
    })
})
export const {useAddNewCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useGetAllCategoriesQuery,useGetCategoryByIdQuery} = managerApiSlice