import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    isVendor: false,  // ✅ New state to track if user is a vendor
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isVendor = action.payload.role === "vendor";  // ✅ Set vendor status

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("isVendor", state.isVendor);  // ✅ Store vendor status
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isVendor = false;

            localStorage.removeItem("token");
            localStorage.removeItem("isVendor");  // ✅ Clear vendor status on logout
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
