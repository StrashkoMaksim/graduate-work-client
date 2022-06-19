import {Errors} from "../../types/errors";
import {CartDTO} from "../../types/cart";

export const validateCartDto = (dto: CartDTO) => {
    const errors: Errors = {};

    if (!dto.name) {
        errors.name = 'Заполните имя';
    }

    if (dto.phone.length !== 18) {
        errors.phone = 'Заполните номер телефона';
    }

    if (!dto.isAgreed) {
        errors.isAgreed = 'Поставьте галочку';
    }

    return errors;
}