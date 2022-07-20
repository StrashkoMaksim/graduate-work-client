import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import _ from "lodash";
import {Review} from "../../types/review";

interface initialStateType {
    selectedReview: Review | null;
}

const initialState: initialStateType = {
    selectedReview: null
}

const reviewSlice = createSlice({
    name: 'review',
    initialState: initialState,
    reducers: {
        setSelectedReview: (state: initialStateType, action: PayloadAction<Review | null>) => {
            state.selectedReview = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!_.isEqual(action.payload.review.selectedReview, state.selectedReview)) {
                return action.payload.review;
            }
        },
    }
})

export const { setSelectedReview } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;