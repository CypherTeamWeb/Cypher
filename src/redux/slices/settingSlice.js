import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'English',
    name: 'Guest User',
    email: 'guest@example.com',
    isLogin: false,
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        valueSetSettings: (state, action) => {
            state.value = action.payload
        },
        nameSetSettings: (state, action) => {
            state.name = action.payload
        },
        emailSetSettings: (state, action) => {
            state.email = action.payload
        },
        isLoginset: (state, action) => {
            state.isLogin = action.payload
        },
    },
});

export const {valueSetSettings, nameSetSettings, emailSetSettings, isLoginset} = settingSlice.actions;
export default settingSlice.reducer;