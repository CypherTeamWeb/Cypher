import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk('fetch/fetchItems', async (params) => {
    const {email, url} = params
    
    const {data} = await axios.get(url)
    return [data, email, url]
})

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
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            console.log('Pending...')
        }) 

        builder.addCase(fetchItems.fulfilled, (state,action) => {
            const [data, email, url] = action.payload;
            let cart = data.filter((obj) => obj.email == email);

            url.includes('CypherCartJson') ? state.value = cart : url.includes('Wishlist') ? state.wishlist = cart : state.orderItems = cart
        }) 

        builder.addCase(fetchItems.rejected, (state) => {
            throw new Error(`Error ${state}`)
        }) 
    }
});

export const { itemsSet,wishlistSet,orderItemsSet } = itemsSlice.actions
export default itemsSlice.reducer