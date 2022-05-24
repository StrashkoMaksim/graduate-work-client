import { Dispatch } from "redux"
import axios, {AxiosError} from "axios"
import { UserAction, UserActionTypes } from "../../types/user"
import $api from "../../hooks/useProtectedAxios"

export const loginUser = (email: String, password: String) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
                email, password
            })
            localStorage.setItem('token', response.data.token)
            dispatch({ type: UserActionTypes.LOGIN_USER, payload: response.data.token })
            return response.status
        } catch (e) {
            let error = ''
            if (e instanceof AxiosError) {
                switch (e.response?.status) {
                    case 400:
                        error = 'Некорректные данные при авторизации';
                        break;
                    case 401:
                        error = e.response.data.message;
                        break;
                    default:
                        error = 'Непредвиденная ошибка при авторизации'
                }
            } else {
                error = 'Непредвиденная ошибка при авторизации'
            }
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: error
            })
            throw e;
        }
    }
}

export const checkAuthUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await $api.get('/auth/check-auth')
            dispatch({ type: UserActionTypes.LOGIN_USER, payload: response.data.token })
        } catch (e) {
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: ''
            })
            localStorage.removeItem('token')
        }
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.LOGOUT_USER })
        localStorage.removeItem('token')
    }
}