import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    isAuth: false,
    token: null,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return { isAuth: true, error: null, token: action.payload }
        case UserActionTypes.LOGIN_USER_ERROR:
            return { isAuth: false, error: action.payload, token: null }
        case UserActionTypes.LOGOUT_USER:
            return { isAuth: false, error: null, token: null }
        default:
            return state
    }
}