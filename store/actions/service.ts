import {AppThunk} from "../store";
import {setSelectedService} from "../slices/service";
import {Service} from "../../types/service";

export const changeSelectedService = (service: Service | null): AppThunk => dispatch => {
    dispatch(setSelectedService(service));
}