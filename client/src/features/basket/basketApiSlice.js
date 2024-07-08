import apiSlice from "../../app/apiSlice"

const productApiSlice2 = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAllCart: build.query({
            query: () => ({
                url: "/api/basket"
            }),
            providesTags:["Basket"]
        }),

        addNewProdToBasket: build.mutation({
            query: (prodToAdd) => ({
                url: "/api/basket",
                method: "POST",
                body: prodToAdd
            }),
            invalidatesTags:["Basket"]
        }),

        changeQuantityOfProd: build.mutation({
            query: (prodToUpdate) => ({
                url: "/api/basket",
                method: "PUT",
                body: prodToUpdate
            }),
            invalidatesTags:["Basket"]
        }),

        deleteProd: build.mutation({
            query: (prodToDelete) => ({
                url: "/api/basket",
                method: "DELETE",
                body: prodToDelete
            }),
            invalidatesTags:["Basket"]
        }),

        deleteAllBasket: build.mutation({
            query: () => ({
                url: "/api/basket/allBasket",
                method: "DELETE"
            }),
            invalidatesTags:["Basket"]
        })
    })
})
export const { useAddNewProdToBasketMutation, useGetAllCartQuery, useChangeQuantityOfProdMutation, useDeleteProdMutation,useDeleteAllBasketMutation } = productApiSlice2