import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

interface initialStateType {
    isOpen: boolean
}

const initialState: initialStateType = {
    isOpen: false
}

const loadingSlice = createSlice({
    name: 'question',
    initialState: initialState,
    reducers: {
        openQuestionModal: (state: initialStateType) => {
            state.isOpen = true;
        },
        closeQuestionModal: (state: initialStateType) => {
            state.isOpen = false;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (action.payload.question.isOpen !== state.isOpen) {
                return action.payload.question;
            }
        },
    }
})

export const { openQuestionModal, closeQuestionModal } = loadingSlice.actions;
export const questionReducer = loadingSlice.reducer;