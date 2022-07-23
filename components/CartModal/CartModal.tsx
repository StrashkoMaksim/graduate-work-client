import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import PolicyInput from "../PolicyInput/PolicyInput";
import ReCAPTCHA from "react-google-recaptcha";
import cn from "classnames";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import React, {FC, useEffect, useRef, useState} from "react";
import {Errors} from "../../types/errors";
import styles from './CartModal.module.scss';
import {CartDTO, CartEntities, initialCartDTO} from "../../types/cart";
import {validateCartDto} from "../../utils/validation/cart";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {Api} from "../../utils/api";
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartEntities;
}

const CartModal: FC<CartModalProps> = ({ isOpen, onClose, cart }) => {
    const [isSent, setIsSent] = useState(false);
    const [cartDto, setCartDto] = useState<CartDTO>(initialCartDTO(cart));
    const [errors, setErrors] = useState<Errors>({})
    const captchaRef = useRef<ReCAPTCHA>(null)
    const { dispatchProductsCart, fetchSources, fetchStatuses } = useActions();
    const { statuses } = useTypedSelector(state => state.status);
    const { sources } = useTypedSelector(state => state.source);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    useEffect(() => {
        setIsSent(false);
        fetchSources();
        fetchStatuses();
    }, [])

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCartDto((prev) => {
            return {...prev, name: event.target.value}
        })
    }

    const changePhoneHandler = (value: string) => {
        setCartDto((prev) => { return { ...prev, phone: value } })
    }

    const changeAcceptedHandler = (value: boolean) => {
        setCartDto((prev) => { return { ...prev, isAgreed: value } })
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateCartDto(cartDto);

        if (!captchaRef.current?.getValue()) {
            errors.captcha = 'Пройдите проверку';
        }

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        const selectedStatus = statuses.filter(status => status.name === 'Новый');
        const selectedSource = sources.filter(source => source.name === 'Корзина');
        if (!selectedStatus.length || !selectedSource) {
            enqueueSnackbar('Ошибка при отправке заявки, перезагрузите страницу', { variant: 'error' });
            return;
        }

        try {
            await Api().orders.createOrderFromCart({
                fio: cartDto.name,
                phone: cartDto.phone,
                sourceId: selectedSource[0].id,
                statusId: selectedStatus[0].id,
                cart,
            })
            setIsSent(true);
            dispatchProductsCart({});
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={isSent ? 'Спасибо за ваше обращение! В ближайшее время с вами свяжется наш менеджер!' : 'Оформить заказ'}
        >
            {!isSent ?
                <form className={styles.form} onSubmit={submitHandler}>
                    <CustomTextField
                        label='Ваше имя'
                        value={cartDto.name}
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
                        value={cartDto.phone}
                        onAccept={changePhoneHandler}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone as string}
                    />
                    <PolicyInput checked={cartDto.isAgreed} onChange={changeAcceptedHandler} error={errors.isAgreed as string} />
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

export default CartModal;