import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'English',
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        valueSetSettings: (state, action) => {
            state.value = action.payload
        },
    },
});

export const {valueSetSettings} = settingSlice.actions;
export default settingSlice.reducer;