import apiSlice from "../../app/apiSlice"

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        
        getOrdersById: build.query({
            query: (id) => ({
                url: "/api/order/"+id,
                method: "GET",
            })
        })
    })
})
export const { useGetOrdersByIdQuery} = orderApiSlice