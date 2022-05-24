import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {UserState} from "../../types/user";

const initialState: UserState = {
    isAuth: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state: UserState) => {
            state.isAuth = true
            state.error = null
        },
        logoutUser: (state: UserState) => {
            state.isAuth = false
            state.error = null
        },
        errorUser: (state: UserState, action: PayloadAction<string>) => {
            state.isAuth = false
            state.error = action.payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.user,
            };
        }
    }
})

export const { loginUser, logoutUser, errorUser } = userSlice.actions;
export const userReducer = userSlice.reducer;