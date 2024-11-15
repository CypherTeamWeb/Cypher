import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
}

export const valueSlice = createSlice({
    name: 'value',
    initialState,
    reducers: {
        valueSet: (state, action) => {
            state.value = action.payload
        },
    },
});

export const {valueSet} = valueSlice.actions;
export default valueSlice.reducer;