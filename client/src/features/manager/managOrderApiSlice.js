import apiSlice from "../../app/apiSlice"

const managOrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAllOrders: build.query({
            query: () => ({
                url: "/api/order"
            }),
            providesTags:["Order"]

        }),

        getNotProvidedOrders: build.query({
            query: () => ({
                url: "/api/order/notProvided"
            }),
            providesTags:["Order"]

        }),

        getProvidedOrders: build.query({
            query: () => ({
                url: "/api/order/Provided"
            }),
            providesTags:["Order"]

        }),

        getOrderById: build.query({
            query: (id) => ({
                url: "/api/order/"+id
            }),
            providesTags:["Order"]

        }),

        createNewOrder: build.mutation({
            query: (ordToAdd) => ({
                url: "/api/order",
                method: "POST",
                body: ordToAdd
            }),
            providesTags:["Order"]
        }),


        updateOrder: build.mutation({
            query: (ordToUpdate) => ({
                url: "/api/product/",
                method: "PUT",
                body: ordToUpdate
            }),
            invalidatesTags:["Order"]
        }),

        deleteOrder: build.mutation({
            query: (ordIdToDelete) => ({
                url: "/api/product/"+ordIdToDelete,
                method: "DELETE"
            }),
            invalidatesTags:["Order"]
        })
    })
})
export const {useGetAllOrdersQuery,useGetNotProvidedOrdersQuery,useGetProvidedOrdersQuery,useCreateNewOrderMutation,useDeleteOrderMutation,useGetOrderByIdQuery,useUpdateOrderMutation} = managOrderApiSlice