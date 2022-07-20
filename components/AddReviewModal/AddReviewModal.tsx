import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import React, {FC, useEffect, useRef, useState} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {initialReviewEdit, Review, ReviewEdit} from "../../types/review";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './AddReviewModal.module.scss'
import {validateChangedReview, validateNewReview} from "../../utils/validation/review";
import {Errors} from "../../types/errors";
import ReCAPTCHA from "react-google-recaptcha";
import cn from "classnames";
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";
import {Api} from "../../utils/api";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Checkbox, FormControlLabel} from "@mui/material";

interface ReviewModalProps {
    open: boolean;
    onClose: (reload?: boolean) => void;
}

const AddReviewModal: FC<ReviewModalProps> = ({ open, onClose }) => {
    const [review, setReview] = useState<ReviewEdit>(initialReviewEdit);
    const captchaRef = useRef<ReCAPTCHA>(null)
    const [errors, setErrors] = useState<Errors>({})
    const [isSent, setIsSent] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { selectedReview } = useTypedSelector(state => state.review)

    useEffect(() => {
        setIsSent(false);
        if (selectedReview) {
            setReview({
                id: selectedReview.id,
                firstName: {
                    value: selectedReview.firstName,
                    isChanged: false,
                },
                secondName: {
                    value: selectedReview.secondName,
                    isChanged: false,
                },
                text: {
                    value: selectedReview.text,
                    isChanged: false,
                },
                isAccepted: {
                    value: selectedReview.isAccepted,
                    isChanged: false,
                },
            })
        } else {
            setReview(initialReviewEdit)
        }
        setErrors({});
    }, [open])

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReview((prev) => {
            return {...prev, [event.target.name as 'firstName']: {
                value: event.target.value,
                isChanged: true
            }};
        })
    }

    const changeCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReview((prev) => {
            return {...prev, isAccepted: {
                    value: event.target.checked,
                    isChanged: true
                }};
        })
    }

    const submitCreateHandler = async () => {
        const { errors, dto } = validateNewReview(review);

        if (!captchaRef.current?.getValue()) {
            errors.captcha = 'Пройдите проверку';
        }

        if (Object.keys(errors).length) {
            setErrors(errors);
            return
        }
        setErrors({});

        try {
            await Api().reviews.createReview(dto);
            setIsSent(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    const submitUpdateHandler = async () => {
        const { errors, dto } = validateChangedReview(review);

        if (Object.keys(errors).length) {
            setErrors(errors);
            return
        }
        setErrors({});

        try {
            await Api().reviews.updateReview(review.id as number, dto);
            onClose(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    const submitDeleteHandler = async () => {
        try {
            await Api().reviews.deleteReview(review.id as number);
            onClose(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
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
                    name='secondName'
                    value={review.secondName.value}
                    onChange={changeTextHandler}
                    error={Boolean(errors.secondName)}
                    helperText={errors.secondName}
                />
                <CustomTextField
                    label='Имя и отчество'
                    name='firstName'
                    value={review.firstName.value}
                    onChange={changeTextHandler}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <CustomTextField
                    label='Текст отзыва'
                    name='text'
                    value={review.text.value}
                    onChange={changeTextHandler}
                    error={Boolean(errors.text)}
                    helperText={errors.text}
                    multiline
                />
                {selectedReview
                    ? <FormControlLabel
                        control={<Checkbox checked={review.isAccepted.value} onChange={changeCheckboxHandler} />}
                        label="Проверенный"
                    />
                    : <ReCAPTCHA
                        ref={captchaRef}
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY as string}
                        className={cn(styles.captcha, {[styles.error]: errors.captcha})}
                    />
                }
                {selectedReview
                    ? <div className={styles.btns}>
                        <CustomButton
                            variant={ButtonType.blue}
                            text='Сохранить'
                            onClick={submitUpdateHandler}
                            additionalClass={styles.btn}
                        />
                        <CustomButton
                            variant={ButtonType.red}
                            text='Удалить'
                            onClick={submitDeleteHandler}
                            additionalClass={styles.btnDelete}
                        />
                    </div>
                    : <CustomButton
                        variant={ButtonType.blue}
                        text='Отправить'
                        onClick={submitCreateHandler}
                        additionalClass={styles.btn}
                    />
                }
            </div> : ''
            }
        </CustomModal>
    );
};

export default AddReviewModal;