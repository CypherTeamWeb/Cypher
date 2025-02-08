import { createSlice } from "@reduxjs/toolkit";

interface ValueState {
    value: string;
}

const initialState: ValueState = {
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