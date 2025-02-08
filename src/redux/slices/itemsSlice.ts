import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk('fetch/fetchItems', async (params: {email: string, url: string}) => {
    const {email, url} = params
    
    const {data} = await axios.get(url + `?email=${email}`)
    return [data, url]
})

interface itemsState {
    value: object[];
    wishlist: object[];
    orderItems: object[];
}

const initialState: itemsState = {
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
            const [data, url] = action.payload;

            url.includes('CypherCartJson') ? state.value = data : url.includes('Wishlist') ? state.wishlist = data : state.orderItems = data
        }) 

        builder.addCase(fetchItems.rejected, (state) => {
            throw new Error(`Error please try again later. \n ${state}`);
        }) 
    }
});

export const { itemsSet,wishlistSet,orderItemsSet } = itemsSlice.actions
export default itemsSlice.reducer