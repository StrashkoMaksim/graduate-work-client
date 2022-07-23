import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import React, {useEffect, useRef, useState} from "react";
import {CallbackDTO, initialCallbackDTO} from "../../types/callback";
import styles from './CallbackModal.module.scss'
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import PolicyInput from "../PolicyInput/PolicyInput";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {Errors} from "../../types/errors";
import {validateCallback} from "../../utils/validation/callback";
import cn from "classnames";
import ReCAPTCHA from "react-google-recaptcha";
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {Api} from "../../utils/api";

const CallbackModal = () => {
    const { isOpen } = useTypedSelector(state => state.callback);
    const { statuses } = useTypedSelector(state => state.status);
    const { sources } = useTypedSelector(state => state.source);
    const { setClosedCallbackModal, fetchSources, fetchStatuses } = useActions();
    const [callbackDto, setCallbackDto] = useState<CallbackDTO>(initialCallbackDTO);
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState<Errors>({})
    const captchaRef = useRef<ReCAPTCHA>(null)
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    useEffect(() => {
        setCallbackDto(initialCallbackDTO);
        setIsSent(false);
        setErrors({})
        fetchStatuses();
        fetchSources();
    }, [isOpen])

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCallbackDto((prev) => {
            return {...prev, name: event.target.value}
        })
    }

    const changePhoneHandler = (value: string) => {
        setCallbackDto((prev) => { return { ...prev, phone: value } })
    }

    const changeAcceptedHandler = (value: boolean) => {
        setCallbackDto((prev) => { return { ...prev, isAgreed: value } })
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateCallback(callbackDto);

        if (!captchaRef.current?.getValue()) {
            errors.captcha = 'Пройдите проверку';
        }

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        const selectedStatus = statuses.filter(status => status.name === 'Новый');
        const selectedSource = sources.filter(source => source.name === 'Заказ звонка');
        if (!selectedStatus.length || !selectedSource) {
            enqueueSnackbar('Ошибка при отправке заявки, перезагрузите страницу', { variant: 'error' });
            return;
        }

        try {
            await Api().orders.createOrder({
                fio: callbackDto.name,
                phone: callbackDto.phone,
                statusId: selectedStatus[0].id,
                sourceId: selectedSource[0].id,
            })
            setIsSent(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={setClosedCallbackModal}
            title={isSent ? 'Спасибо за ваше обращение! В ближайшее время с вами свяжется наш менеджер!' : 'Заказать звонок'}
        >
            {!isSent ?
                <form className={styles.form} onSubmit={submitHandler}>
                    <CustomTextField
                        label='Ваше имя'
                        value={callbackDto.name}
                        onChange={changeNameHandler}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <MaskedTextField
                        mask="+7 (000) 000-00-00"
                        definitions={{
                            '#': /[1-9]/,
                        }}
                        label='Ваш номер телефона'
                        value={callbackDto.phone}
                        onAccept={changePhoneHandler}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                    <PolicyInput checked={callbackDto.isAgreed} onChange={changeAcceptedHandler} error={errors.isAgreed as string} />
                    <ReCAPTCHA
                        ref={captchaRef}
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY as string}
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                    <CustomButton variant={ButtonType.blue} text='Заказать' type='submit' additionalClass={styles.btn} />
                </form> : ''
            }
        </CustomModal>
    );
};

export default CallbackModal;