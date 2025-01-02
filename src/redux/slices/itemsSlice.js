import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    wishlist: [],
    orderItems: [],
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        itemsSet: (state, action) => {
            state.value = action.payload
        },
        wishlistSet: (state, action) => {
            state.wishlist = action.payload
        },
        orderItemsSet: (state, action) => {
            state.orderItems = action.payload
        }
    },
});

export const { itemsSet,wishlistSet,orderItemsSet } = itemsSlice.actions
export default itemsSlice.reducer