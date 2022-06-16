import {AppThunk} from "../store";
import {closeQuestionModal, openQuestionModal} from "../slices/question";

export const setOpenedQuestionModal = (): AppThunk => async dispatch => {
    await dispatch(openQuestionModal())
}

export const setClosedQuestionModal = (): AppThunk => async dispatch => {
    await dispatch(closeQuestionModal())
}