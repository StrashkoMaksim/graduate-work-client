import {AppThunk} from "../store";
import {disableLoading, enableLoading} from "../slices/loading";

export const setEnableLoading = (): AppThunk => async dispatch => {
    await dispatch(enableLoading())
}

export const setDisableLoading = (): AppThunk => async dispatch => {
    await dispatch(disableLoading())
}