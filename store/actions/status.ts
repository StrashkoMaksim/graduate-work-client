import {AppThunk} from "../store";
import {Api} from "../../utils/api";
import {endFetchStatuses, errorStatuses, startFetchStatuses} from "../slices/status";

export const fetchStatuses = (): AppThunk => async dispatch => {
    try {
        dispatch(startFetchStatuses());
        const statuses = await Api().statuses.getStatuses();
        dispatch(endFetchStatuses(statuses));
    } catch (e) {
        dispatch(errorStatuses('Непредвиденная ошибка при получении статусов'));
    }
}