import React, {FormEvent, useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {TextField} from "@mui/material";
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import styles from './AuthPage.module.scss'
import cn from "classnames";
import H1 from "../../../ui-kit/H1/H1";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import CustomSnackbar from "../../../components/CustomSnackbar/CustomSnackbar";
import {AxiosError} from "axios";

interface AuthData {
    email: string;
    password: string;
}

interface Errors {
    [key: string]: string | null
}

const AuthPage = () => {
    const [authData, setAuthData] = useState<AuthData>({email: '', password: ''})
    const [errors, setErrors] = useState<Errors>({})
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);
    const { error } = useTypedSelector(state => state.user)
    const { loginUser } = useActions()

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        let hasErrors = false

        if (authData.email.length === 0) {
            hasErrors= true
            setErrors(prevState => {
                return ({...prevState, email: 'Обязательно для заполнения'})
            })
        }

        if (authData.password.length === 0) {
            hasErrors= true
            setErrors(prevState => {
                return ({...prevState, password: 'Обязательно для заполнения'})
            })
        }

        if (!recaptchaRef.current?.getValue()) {
            hasErrors= true
            setErrors(prevState => {
                return ({...prevState, captcha: 'Пройдите проверку'})
            })
        }

        if (hasErrors) {
            return
        }

        setErrors({})
        try {
            await loginUser(authData.email, authData.password)
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 400) {
                setErrors(prevState => {
                    const newErrors: Errors = {}
                    // @ts-ignore
                    e.response.data.forEach(el => {
                        const error = el.split(' - ')
                        newErrors[error[0]] = error[1]
                    })
                    return newErrors
                })
            }
            setIsSnackbarOpen(true)
        }
    }

    useEffect(() => {
        if (error) {
            setIsSnackbarOpen(true)
        }
    }, [error])

    const authDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors(prevState => {
            return ({...prevState, [event.target.name]: null})
        })
        setAuthData(prevState => {
            return ({...prevState, [event.target.name]: event.target.value})
        })
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    return (
        <div className={cn('section', styles.section)}>
            <div className={cn('container', styles.container)}>
                <H1 text='Авторизация' className={styles.h1} />
                <form onSubmit={submitHandler} className={styles.form}>
                    <TextField
                        label='Электронная почта'
                        variant={"standard"}
                        name="email"
                        className={styles.input}
                        value={authData.email}
                        onChange={authDataChangeHandler}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        label='Пароль'
                        variant={"standard"}
                        name="password"
                        type='password'
                        className={styles.input}
                        value={authData.password}
                        onChange={authDataChangeHandler}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="normal"
                        sitekey="6Lefcf8fAAAAAJd1MbznOyS2F59lv-0VXAOY9iLB"
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                    <Button type={ButtonType.blue} text='Войти' additionalClass={styles.btn} />
                </form>
                <CustomSnackbar isOpen={isSnackbarOpen} onClose={closeSnackbar} text={error} severity='error' />
            </div>
        </div>
    );
};

export default AuthPage;