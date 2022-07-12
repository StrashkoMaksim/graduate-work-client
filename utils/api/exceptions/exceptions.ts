import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import {Errors} from "../../../types/errors";
import {NextRouter, useRouter} from "next/router";
import {OptionsObject, SnackbarKey, SnackbarMessage} from "notistack";

export const exceptionsHandler = (
    e: any,
    router: NextRouter,
    setErrors: React.Dispatch<React.SetStateAction<Errors>>,
    enqueueSnackbar: (message: SnackbarMessage, options?: (OptionsObject | undefined)) => SnackbarKey
) => {
    let error = ''
    if (e instanceof AxiosError) {
        switch (e.response?.status) {
            case 401:
                error = 'Вы не авторизованы';
                logout();
                router.push('/login');
                break;
            case 400:
                setErrors(() => {
                    const newErrors: Errors = {}
                    // @ts-ignore
                    e.response.data.forEach(el => {
                        const error = el.split(' - ')
                        newErrors[error[0]] = error[1]
                    })
                    return newErrors
                })
                error = 'Проверьте правильность введенных данных';
                break;
            case 500:
                console.log(e.response.data)
                // @ts-ignore
                error = e.response.data.message;
                break;
            default:
                error = 'Непредвиденная ошибка сервера';
        }
    } else {
        error = 'Непредвиденная ошибка сервера';
    }
    enqueueSnackbar(error, { variant: "error" });
}