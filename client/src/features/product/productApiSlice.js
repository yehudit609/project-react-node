import apiSlice from "../../app/apiSlice"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewProd: build.mutation({
            query: (prodToAdd) => ({
                url: "api/basket/addNewProd",
                method: "POST",
                body: prodToAdd
            })
        }),
        
        getAllProduct: build.query({
            query: () => ({
                url: "/api/product/"
            })
        }),


        getProductByCategory: build.query({
            query: (category) => ({
                url: "/api/product/category/"+category
            })
        })
    })
})
export const { useAddNewProdMutation,useGetAllProductQuery,useGetProductByCategoryQuery} = productApiSlice