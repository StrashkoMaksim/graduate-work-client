import {AppThunk} from "../store";
import {Review} from "../../types/review";
import {setSelectedReview} from "../slices/review";

export const changeSelectedReview = (review: Review | null): AppThunk => dispatch => {
    dispatch(setSelectedReview(review));
}