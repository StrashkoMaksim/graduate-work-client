import {Errors} from "../../types/errors";
import {CallbackDTO} from "../../types/callback";

export const validateCallback = (dto: CallbackDTO) => {
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