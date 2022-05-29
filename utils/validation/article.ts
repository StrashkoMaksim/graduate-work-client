import {OutputData} from "@editorjs/editorjs";
import {Errors} from "../../types/errors";
import {UploadResponse} from "../api/filesApi";

export const articleValidation = (name: string, previewText: string, previewImage: UploadResponse | string | null, content: OutputData['blocks'], categoryId: number | '') => {
    const errors: Errors = {};

    if (!name) {
        errors.name = 'Заголовок не может быть пустым';
    }

    if (!previewText) {
        errors.previewText = 'Описание не может быть пустым';
    }

    if (!previewImage) {
        errors.previewImage = 'Отсутствует изображение для превью'
    }

    if (content.length === 0) {
        errors.content = 'Контент не может быть пустым'
    }

    if (!categoryId) {
        errors.categoryId = 'Не выбрана категория статьи'
    }

    return errors
}