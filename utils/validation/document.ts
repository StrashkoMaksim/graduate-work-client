import {Errors} from "../../types/errors";
import {CreateServiceDto, ServiceEdit, UpdateServiceDto} from "../../types/service";
import {CreateDocumentWithFileDto, CreateDocumentWithLinkDto, DocumentEdit} from "../../types/document";

export const validateNewDocument = (type: 'link' | 'file', document: DocumentEdit) => {
    const errors: Errors = {};

    if (type === 'link') {
        const dto: CreateDocumentWithLinkDto = {
            name: document.name.value,
            link: document.link.value,
            categoryId: document.categoryId.value as number,
        }

        if (!document.name.value) {
            errors.name = 'Название не может быть пустым';
        }

        if (!document.link.value) {
            errors.link = 'Ссылка не может быть пустой';
        }

        if (!document.categoryId.value) {
            errors.categoryId = 'Не выбрана категория';
        }

        return {errors, dto};
    } else {
        const dto: CreateDocumentWithFileDto = {
            name: document.name.value,
            fileId: document.file.fileId as number,
            categoryId: document.categoryId.value as number,
        }

        if (!document.name.value) {
            errors.name = 'Название не может быть пустым';
        }

        if (!document.file.fileId) {
            errors.file = 'Отсутствует файл';
        }

        if (!document.categoryId.value) {
            errors.categoryId = 'Не выбрана категория';
        }

        return {errors, dto};
    }
}