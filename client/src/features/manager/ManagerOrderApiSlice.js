import apiSlice from "../../app/apiSlice"

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewOrder: build.mutation({
            query: (registerUser) => ({
                url: "/api/order",
                method: "POST",
                body: registerUser
            })
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: "/api/order/"+id,
                method: "DELETE"
            })
        }),
        updateOrder: build.mutation({
            query: (product) => ({
                url: "/api/order",
                method: "PUT",
                body: product
            }),
            invalidatesTags:["Order"]
        }),
        getAllOrder: build.query({
            query: () => ({
                url: "/api/order",
                method: "GET",
            }),
           providesTags:["Order"]
        }),
        getOrderById: build.query({
            query: (id) => ({
                url: "/api/order/category/"+id,
                method: "GET",
            })
        })
        
        
    })
})
export const { useAddNewOrderMutation,useDeleteOrderMutation,useGetAllOrderQuery,useGetOrderByIdQuery,useUpdateOrderMutation} = managerApiSlice