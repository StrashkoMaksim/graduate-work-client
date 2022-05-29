import React, {FormEvent, useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './AuthPage.module.scss'
import cn from "classnames";
import H1 from "../../ui-kit/H1/H1";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import {AxiosError} from "axios";
import MainLayout from "../../components/MainLayout/MainLayout";
import {useRouter} from "next/router";
import {wrapper} from "../../store/store";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {Errors} from "../../types/errors";

interface AuthData {
    email: string;
    password: string;
}

const AuthPage = () => {
    const [authData, setAuthData] = useState<AuthData>({email: '', password: ''})
    const [errors, setErrors] = useState<Errors>({})
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);
    const { error } = useTypedSelector(state => state.user)
    const { login } = useActions()
    const router = useRouter()

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
            await login(authData)
            router.push('/admin');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 400) {
                setErrors(() => {
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
        <MainLayout meta={{
            title: 'Авторизация',
            description: 'Страница авторизации',
            type: 'website',
        }}>
            <div className={cn('section', styles.section)}>
                <div className={cn('container', styles.container)}>
                    <H1 text='Авторизация' className={styles.h1} />
                    <form onSubmit={submitHandler} className={styles.form}>
                        <CustomTextField
                            label='Электронная почта'
                            name="email"
                            className={styles.input}
                            value={authData.email}
                            onChange={authDataChangeHandler}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <CustomTextField
                            label='Пароль'
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
                        <CustomButton variant={ButtonType.blue} text='Войти' additionalClass={styles.btn} />
                    </form>
                    <CustomSnackbar isOpen={isSnackbarOpen} onClose={closeSnackbar} text={error} severity='error' />
                </div>
            </div>
        </MainLayout>
    );
};

AuthPage.getInitialProps = wrapper.getInitialPageProps(store => async ({pathname, req, res}) => {
    if (store.getState().user.isAuth) {
        if (res) {
            res.writeHead(302, { Location: '/admin' });
            res.end();
        } else {
            window.location.pathname = '/admin';
            await new Promise(() => {});
        }
    }
});

export default AuthPage;