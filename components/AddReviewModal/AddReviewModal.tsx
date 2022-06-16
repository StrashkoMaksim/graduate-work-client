import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import React, {FC, useEffect, useRef, useState} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {CreateReviewDTO} from "../../types/review";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './AddReviewModal.module.scss'
import {validateReview} from "../../utils/validation/review";
import {Errors} from "../../types/errors";
import ReCAPTCHA from "react-google-recaptcha";
import cn from "classnames";

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
}

const AddReviewModal: FC<ReviewModalProps> = ({ open, onClose }) => {
    const [dto, setDto] = useState<CreateReviewDTO>({ name: '', surname: '', text: ''});
    const captchaRef = useRef<ReCAPTCHA>(null)
    const [errors, setErrors] = useState<Errors>({})
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        setIsSent(false);
        setDto({ name: '', surname: '', text: '' });
        setErrors({});
    }, [open])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDto((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        })
    }

    const submitHandler = () => {
        const errors = validateReview(dto);

        if (!captchaRef.current?.getValue()) {
            errors.captcha = 'Пройдите проверку';
        }

        if (Object.keys(errors).length) {
            setErrors(errors);
            return
        }

        setErrors({});
        setIsSent(true)
    }

    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title={isSent ? 'Спасибо за ваш отзыв, скоро он появится на сайте!' : 'Оставить отзыв'}
        >
            {!isSent ? <div className={styles.form}>
                <CustomTextField
                    label='Фамилия'
                    name='surname'
                    value={dto.surname}
                    onChange={changeHandler}
                    error={Boolean(errors.surname)}
                    helperText={errors.surname}
                />
                <CustomTextField
                    label='Имя и отчество'
                    name='name'
                    value={dto.name}
                    onChange={changeHandler}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                />
                <CustomTextField
                    label='Текст отзыва'
                    name='text'
                    value={dto.text}
                    onChange={changeHandler}
                    error={Boolean(errors.text)}
                    helperText={errors.text}
                    multiline
                />
                <ReCAPTCHA
                    ref={captchaRef}
                    size="normal"
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                    className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                />
                <CustomButton
                    variant={ButtonType.blue}
                    text='Отправить'
                    onClick={submitHandler}
                    additionalClass={styles.btn}
                />
            </div> : ''
            }
        </CustomModal>
    );
};

export default AddReviewModal;