import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        isLoggedIn: false,
        userId: null,
        userRole: null,
        error: null,
    },
    reducers: {
        loginStart(state) {
        state.isLoading = true;
        state.error = null;
        },
        loginSuccess(state, action) {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userId = action.payload.userId;
        state.userRole = action.payload.userRole;
        },
        loginFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
        },
        logout(state) {
        state.isLoggedIn = false;
        state.userId = null;
        state.userRole = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (formData) => async (dispatch) => {
    console.log(formData)
    try {
        const response = await axios.post(`http://localhost:3000/login`, formData); 
        dispatch(loginSuccess(response.data)); 
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.error;
            dispatch(loginFailure(errorMessage));
        } else {
            dispatch(loginFailure(error.message)); 
        }
    }
};

export const logOutUser = () => async (dispatch) => {
    dispatch(logout())
};

export const googleLoginSuccess = (loginData)=> async (dispatch) => {
    dispatch(loginSuccess(loginData));
};
export default authSlice.reducer;