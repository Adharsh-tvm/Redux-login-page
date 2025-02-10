import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
        return null;
    }
};

const initialState = {
    user: getUserFromStorage(),  
    isAuthenticated: !!getUserFromStorage(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));  // Store in localStorage
            document.cookie = `user=${JSON.stringify(action.payload)}; path=/; secure`; // Store in cookies
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");  // Remove from localStorage
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove cookie
        },
    },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
