import React, {FormEvent, useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {Alert, FormControl, Input, InputLabel, Snackbar} from "@mui/material";
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import styles from './AuthPage.module.scss'
import cn from "classnames";
import H1 from "../../../ui-kit/H1/H1";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

interface AuthData {
    login: string;
    password: string;
}

interface Errors {
    [key: string]: boolean
}

const AuthPage = () => {
    const [authData, setAuthData] = useState<AuthData>({login: '', password: ''})
    const [errors, setErrors] = useState<Errors>({})
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);
    const { error } = useTypedSelector(state => state.user)
    const { loginUser } = useActions()

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        let errorsCount = 0

        if (authData.login.length === 0) {
            errorsCount++
            setErrors(prevState => {
                return ({...prevState, login: true})
            })
        }

        if (authData.password.length === 0) {
            errorsCount++
            setErrors(prevState => {
                return ({...prevState, password: true})
            })
        }

        if (!recaptchaRef.current?.getValue()) {
            errorsCount++
            setErrors(prevState => {
                return ({...prevState, captcha: true})
            })
        }

        if (errorsCount) {
            return
        }

        setErrors({})
        loginUser(authData.login, authData.password)
    }

    useEffect(() => {
        if (error) {
            setIsSnackbarOpen(true)
        }
    }, [error])

    const authDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors(prevState => {
            return ({...prevState, [event.target.name]: false})
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
                    <FormControl variant="standard" className={styles.control}>
                        <InputLabel className={styles.label}>Логин</InputLabel>
                        <Input name="login"
                               className={cn(styles.input, {[styles.error]: errors.login})}
                               value={authData.login}
                               onChange={authDataChangeHandler}
                        />
                    </FormControl>
                    <FormControl variant="standard" className={styles.control}>
                        <InputLabel className={styles.label}>Пароль</InputLabel>
                        <Input
                            name="password"
                            type='password'
                            className={cn(styles.input, {[styles.error]: errors.password})}
                            value={authData.password}
                            onChange={authDataChangeHandler}
                        />
                    </FormControl>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="normal"
                        sitekey="6Lefcf8fAAAAAJd1MbznOyS2F59lv-0VXAOY9iLB"
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                    <Button type={ButtonType.blue} text='Войти' additionalClass={styles.btn} />
                </form>
                <Snackbar open={isSnackbarOpen}
                          autoHideDuration={6000}
                          onClose={closeSnackbar}
                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default AuthPage;