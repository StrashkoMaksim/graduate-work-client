import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppState} from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector