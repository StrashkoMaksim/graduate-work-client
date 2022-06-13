import {AppThunk} from "../store";
import {closeCallbackModal, openCallbackModal} from "../slices/callback";

export const setOpenedCallbackModal = (): AppThunk => async dispatch => {
    await dispatch(openCallbackModal())
}

export const setClosedCallbackModal = (): AppThunk => async dispatch => {
    await dispatch(closeCallbackModal())
}