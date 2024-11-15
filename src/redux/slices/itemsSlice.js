import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    wishlist: [],
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
        }
    },
});

export const { itemsSet,wishlistSet } = itemsSlice.actions
export default itemsSlice.reducer