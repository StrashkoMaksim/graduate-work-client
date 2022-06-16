import {Errors} from "../../types/errors";
import {CreateReviewDTO} from "../../types/review";

export const validateReview = (dto: CreateReviewDTO) => {
    const errors: Errors = {};

    if (!dto.surname) {
        errors.surname = 'Заполните фамилию';
    }

    if (!dto.name) {
        errors.name = 'Заполните имя и отчество';
    }

    if (!dto.text) {
        errors.text = 'Напишите ваш отзыв';
    }

    return errors;
}