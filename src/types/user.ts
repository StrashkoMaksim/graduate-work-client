export interface UserState {
    isAuth: boolean,
    token: null | string,
    error: null | string
}

export enum UserActionTypes {
    LOGIN_USER = 'LOGIN_USER',
    LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
    LOGOUT_USER = 'LOGOUT_USER'
}

interface LoginUserAction {
    type: UserActionTypes.LOGIN_USER
    payload: string
}

interface LoginUserErrorAction {
    type: UserActionTypes.LOGIN_USER_ERROR
    payload: string
}

interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER
}

export type UserAction = LoginUserAction | LoginUserErrorAction | LogoutUserAction