import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: {},
        isLoggedIn: false,
        error: null
}

const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
                login: (state, action) => {
                        state.user = action.payload;
                        state.isLoggedIn = true;
                },
                logout: (state) => {
                        state.user = {};
                        state.isLoggedIn = false;
                },
        },
});

export const { login, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;