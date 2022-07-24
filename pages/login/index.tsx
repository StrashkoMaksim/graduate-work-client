import React, {FormEvent, ReactElement, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './AuthPage.module.scss'
import cn from "classnames";
import H1 from "../../ui-kit/H1/H1";
import {useActions} from "../../hooks/useActions";
import {AxiosError} from "axios";
import MainLayout from "../../components/MainLayout/MainLayout";
import {useRouter} from "next/router";
import {wrapper} from "../../store/store";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {Errors} from "../../types/errors";
import {useSnackbar} from "notistack";
import {NextPageWithLayout} from "../_app";

interface AuthData {
    email: string;
    password: string;
}

const AuthPage: NextPageWithLayout = () => {
    const [authData, setAuthData] = useState<AuthData>({email: '', password: ''})
    const [errors, setErrors] = useState<Errors>({})
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);
    const { login } = useActions()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar();

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
            router.push('/admin/crm');
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
            // @ts-ignore
            enqueueSnackbar(e.error, { variant: 'error' })
        }
    }

    const authDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData(prevState => {
            return ({...prevState, [event.target.name]: event.target.value})
        })
    }

    return (
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
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY as string}
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                    <CustomButton variant={ButtonType.blue} text='Войти' additionalClass={styles.btn} />
                </form>
            </div>
        </div>
    );
};

AuthPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Авторизация',
            description: 'Страница авторизации',
            type: 'website',
        }}>
            {page}
        </MainLayout>
    )
}

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