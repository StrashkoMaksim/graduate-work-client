import React, {useEffect, useRef, useState} from 'react';
import styles from './QuestionModal.module.scss'
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import PolicyInput from "../PolicyInput/PolicyInput";
import ReCAPTCHA from "react-google-recaptcha";
import cn from "classnames";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {Errors} from "../../types/errors";
import {initialQuestionDTO, QuestionDTO} from "../../types/question";
import {validateQuestion} from "../../utils/validation/question";

const QuestionModal = () => {
    const { isOpen } = useTypedSelector(state => state.question);
    const { setClosedQuestionModal } = useActions();
    const [questionDto, setQuestionDto] = useState<QuestionDTO>(initialQuestionDTO);
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState<Errors>({})
    const captchaRef = useRef<ReCAPTCHA>(null)

    useEffect(() => {
        setQuestionDto(initialQuestionDTO);
        setIsSent(false);
        setErrors({})
    }, [isOpen])

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionDto((prev) => {
            return {...prev, name: event.target.value}
        })
    }

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionDto((prev) => {
            return {...prev, text: event.target.value}
        })
    }

    const changePhoneHandler = (value: string) => {
        setQuestionDto((prev) => { return { ...prev, phone: value } })
    }

    const changeAcceptedHandler = (value: boolean) => {
        setQuestionDto((prev) => { return { ...prev, isAgreed: value } })
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateQuestion(questionDto);

        if (!captchaRef.current?.getValue()) {
            errors.captcha = 'Пройдите проверку';
        }

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        setIsSent(true);
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={setClosedQuestionModal}
            title={isSent ? 'Спасибо за ваше обращение! В ближайшее время с вами свяжется наш менеджер!' : 'Задать вопрос'}
        >
            {!isSent ?
                <form className={styles.form} onSubmit={submitHandler}>
                    <CustomTextField
                        label='Ваше имя'
                        value={questionDto.name}
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
                        value={questionDto.phone}
                        onAccept={changePhoneHandler}
                        error={Boolean(errors.phone)}
                        helperText={errors.name}
                    />
                    <CustomTextField
                        label='Ваш вопрос'
                        value={questionDto.text}
                        onChange={changeTextHandler}
                        error={Boolean(errors.text)}
                        helperText={errors.text}
                        multiline
                    />
                    <PolicyInput checked={questionDto.isAgreed} onChange={changeAcceptedHandler} error={errors.isAgreed as string} />
                    <ReCAPTCHA
                        ref={captchaRef}
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                    <CustomButton variant={ButtonType.blue} text='Заказать' type='submit' additionalClass={styles.btn} />
                </form> : ''
            }
        </CustomModal>
    );
};

export default QuestionModal;