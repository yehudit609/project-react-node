import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "productArr",

    initialState: {
        productArr: localStorage.getItem("productArr") || []
    },

    reducers: {
        setProductArr: (state, action) => {
            state.productArr = productArr
            localStorage.setItem("productArr", productArr)
        },
        removeProductArr: (state) => {
            state.productArr = []
            localStorage.removeItem("productArr")
        },
        updateProductArr: (state, action) => {
            state.productArr = [...ProductArr,action.payload.ProductArr]
            localStorage.setItem("productArr", productArr)
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions