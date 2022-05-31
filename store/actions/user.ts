import {AxiosError} from "axios"
import {LoginUserDto} from "../../types/user"
import {AppThunk} from "../store";
import {Api} from "../../utils/api";
import {destroyCookie, setCookie} from "nookies";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {errorUser, loginUser, logoutUser} from "../slices/user";
import {useSnackbar} from "notistack";

export const login = (dto: LoginUserDto): AppThunk => async dispatch => {
    try {
        const {token} = await Api().user.login(dto)
        setCookie(null, 'token', token, {
            maxAge: 2 * 60 * 60,
        })
        dispatch(loginUser())
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
        // @ts-ignore
        e.error = error;
        await dispatch(errorUser(error))
        throw e;
    }
}

export const logout = () => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        destroyCookie({}, 'token', {path: '/'})
        destroyCookie({}, 'token', {path: '/admin'})
        await dispatch(logoutUser())
    }
}