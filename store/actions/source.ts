import {AppThunk} from "../store";
import {Api} from "../../utils/api";
import {endFetchSources, errorSources, startFetchSources} from "../slices/source";

export const fetchSources = (): AppThunk => async dispatch => {
    try {
        dispatch(startFetchSources());
        const sources = await Api().sources.getSources();
        dispatch(endFetchSources(sources));
    } catch (e) {
        dispatch(errorSources('Непредвиденная ошибка при получении источников'));
    }
}