import {Errors} from "../../types/errors";
import {CreateReviewDto, ReviewEdit, UpdateReviewDto} from "../../types/review";

export const validateNewReview = (review: ReviewEdit) => {
    const errors: Errors = {};
    const dto: CreateReviewDto = {
        firstName: review.firstName.value,
        secondName: review.secondName.value,
        text: review.text.value,
    }

    if (!review.secondName.value) {
        errors.secondName = 'Заполните фамилию';
    }

    if (!review.firstName.value) {
        errors.firstName = 'Заполните имя и отчество';
    }

    if (!review.text.value) {
        errors.text = 'Напишите ваш отзыв';
    }

    return { errors, dto };
}

export const validateChangedReview = (review: ReviewEdit) => {
    const errors: Errors = {};
    const dto: UpdateReviewDto = {};

    if (review.firstName.isChanged) {
        if (!review.firstName.value) {
            errors.name = 'Имя и отчество не могут быть пустыми';
        } else {
            dto.firstName = review.firstName.value;
        }
    }

    if (review.secondName.isChanged) {
        if (!review.secondName.value) {
            errors.name = 'Фамилия не может быть пустой';
        } else {
            dto.secondName = review.secondName.value;
        }
    }

    if (review.text.isChanged) {
        if (!review.text.value) {
            errors.name = 'Текст не может быть пустым';
        } else {
            dto.text = review.text.value;
        }
    }

    if (review.isAccepted.isChanged) {
        dto.isAccepted = review.isAccepted.value;
    }

    return { errors, dto };
}