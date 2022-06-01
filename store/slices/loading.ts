import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

interface initialStateType {
    loading: boolean
}

const initialState: initialStateType = {
    loading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        enableLoading: (state: initialStateType) => {
            state.loading = true;
        },
        disableLoading: (state: initialStateType) => {
            state.loading = false;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (action.payload.loading.loading !== state.loading) {
                return action.payload.loading;
            }
        },
    }
})

export const { enableLoading, disableLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;