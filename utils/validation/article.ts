import {Errors} from "../../types/errors";
import {ArticleEditing, UpdateArticleDto} from "../../types/article";

export const validateNewArticle = (article: ArticleEditing) => {
    const errors: Errors = {};

    if (!article.name.text) {
        errors.name = 'Заголовок не может быть пустым';
    }

    if (!article.previewText.text) {
        errors.previewText = 'Описание не может быть пустым';
    }

    if (!article.previewImage.fileId) {
        errors.previewImage = 'Отсутствует изображение для превью'
    }

    if (article.content.blocks.length === 0) {
        errors.content = 'Контент не может быть пустым'
    }

    if (!article.category.id) {
        errors.categoryId = 'Не выбрана категория статьи'
    }

    return errors
}

export const validateChangedArticle = (article: ArticleEditing) => {
    const errors: Errors = {};
    const dto: UpdateArticleDto = {};

    if (article.name.isChanged) {
        if (!article.name.text) {
            errors.name = 'Заголовок не может быть пустым';
        } else {
            dto.name = article.name.text;
        }
    }

    if (article.previewText.isChanged) {
        if (!article.previewText.text) {
            errors.previewText = 'Описание не может быть пустым';
        } else {
            dto.previewText = article.previewText.text;
        }
    }

    if (article.previewImage.fileId) {
        dto.previewImage = article.previewImage.fileId;
    }

    if (article.content.isChanged) {
        if (!article.content.blocks.length) {
            errors.content = 'Контент не может быть пустым';
        } else {
            dto.content = article.content.blocks;
        }
    }

    if (article.category.isChanged) {
        if (!article.category.id) {
            errors.categoryId = 'Не выбрана категория статьи';
        } else {
            dto.categoryId = article.category.id;
        }

    }

    return {errors, dto}
}