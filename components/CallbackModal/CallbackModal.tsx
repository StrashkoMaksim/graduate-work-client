import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import React, {useEffect, useState} from "react";
import {CallbackDTO, initialCallbackDTO} from "../../types/callback";
import styles from './CallbackModal.module.scss'
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import PolicyInput from "../PolicyInput/PolicyInput";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {Errors} from "../../types/errors";
import {validateCallback} from "../../utils/validation/callback";

const CallbackModal = () => {
    const { isOpen } = useTypedSelector(state => state.callback);
    const { setClosedCallbackModal } = useActions();
    const [callbackDto, setCallbackDto] = useState<CallbackDTO>(initialCallbackDTO);
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState<Errors>({})

    useEffect(() => {
        setCallbackDto(initialCallbackDTO);
        setIsSent(false);
        setErrors({})
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

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateCallback(callbackDto);

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        setIsSent(true);
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
                        helperText={errors.name}
                    />
                    <PolicyInput checked={callbackDto.isAgreed} onChange={changeAcceptedHandler} error={errors.isAgreed as string} />
                    <CustomButton variant={ButtonType.blue} text='Заказать' type='submit' />
                </form> : ''
            }
        </CustomModal>
    );
};

export default CallbackModal;