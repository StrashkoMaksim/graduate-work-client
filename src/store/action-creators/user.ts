import { Dispatch } from "redux"
import axios from "axios"
import { UserAction, UserActionTypes } from "../../types/user"
import $api from "../../hooks/useProtectedAxios"

export const loginUser = (login: String, password: String) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
                login, password
            })
            localStorage.setItem('token', response.data.token)
            dispatch({ type: UserActionTypes.LOGIN_USER, payload: response.data.token })
            return response.status
        } catch (e) {
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: 'Произошла ошибка при авторизации'
            })
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
                payload: 'Произошла ошибка при проверке авторизации'
            })
            localStorage.removeItem('token')
            console.log(e)
        }
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.LOGOUT_USER })
        localStorage.removeItem('token')
    }
}