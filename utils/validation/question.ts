import {Errors} from "../../types/errors";
import {QuestionDTO} from "../../types/question";

export const validateQuestion = (dto: QuestionDTO) => {
    const errors: Errors = {};

    if (!dto.name) {
        errors.name = 'Заполните имя';
    }

    if (dto.phone.length !== 18) {
        errors.phone = 'Заполните номер телефона';
    }

    if (!dto.text) {
        errors.text = 'Напишите ваш вопрос';
    }

    if (!dto.isAgreed) {
        errors.isAgreed = 'Поставьте галочку';
    }

    return errors;
}