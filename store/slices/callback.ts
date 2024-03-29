import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

interface initialStateType {
    isOpen: boolean
}

const initialState: initialStateType = {
    isOpen: false
}

const loadingSlice = createSlice({
    name: 'callback',
    initialState: initialState,
    reducers: {
        openCallbackModal: (state: initialStateType) => {
            state.isOpen = true;
        },
        closeCallbackModal: (state: initialStateType) => {
            state.isOpen = false;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (action.payload.callback.isOpen !== state.isOpen) {
                return action.payload.callback;
            }
        },
    }
})

export const { openCallbackModal, closeCallbackModal } = loadingSlice.actions;
export const callbackReducer = loadingSlice.reducer;