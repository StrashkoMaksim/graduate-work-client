import {Errors} from "../../types/errors";
import {ArticleEditing, UpdateArticleDto} from "../../types/article";
import {CreateProductDTO, ProductEditing, UpdateProductDTO} from "../../types/product";
import {CategoryCharacteristicsType} from "../../types/category";

export const validateNewProduct = (product: ProductEditing) => {
    const errors: Errors = {};
    const dto: CreateProductDTO = {
        name: product.name.value,
        description: product.description.value,
        price: Number.parseFloat(product.price.value),
        previewImage: 0,
        categoryId: 0,
        characteristics: {},
        equipments: [],
        images: [],
    }

    if (!product.name.value) {
        errors.name = 'Название не может быть пустым';
    }

    if (!product.description.value) {
        errors.description = 'Описание не может быть пустым';
    }

    if (!product.previewImage.fileId) {
        errors.previewImage = 'Отсутствует изображение для превью';
    } else {
        dto.previewImage = product.previewImage.fileId;
    }

    if (!product.price.value) {
        errors.price = 'Цена не может быть пустой';
    }

    if (!product.category.id) {
        errors.categoryId = 'Не выбрана категория товара';
    } else {
        dto.categoryId = product.category.id;

        const characteristicsErrors: string[] = [];
        Object.entries(product.characteristics).forEach((entry, index) => {
            if (!entry[1].value) {
                if (entry[1].type === CategoryCharacteristicsType.Boolean) {
                    dto.characteristics[entry[0]] = entry[1].value as boolean;
                } else {
                    characteristicsErrors[index] = 'Характеристика не заполнена';
                }
            } else {
                dto.characteristics[entry[0]] =
                    entry[1].type === CategoryCharacteristicsType.Double
                        ? Number.parseFloat(entry[1].value as string)
                        : entry[1].value
            }
        })
        if (characteristicsErrors.length) {
            errors.characteristics = characteristicsErrors;
        }
    }

    if (product.images.length === 0) {
        errors.images = 'Изображения товара отсутствуют';
    } else {
        product.images.forEach(image => dto.images.push(image.fileId as number));
    }

    const equipmentsErrors: string[] = []
    product.equipments.values.forEach((el, index) => {
        if (!el) {
           equipmentsErrors[index] = 'Поле не заполнено';
        } else {
            dto.equipments.push(el);
        }
    })
    if (equipmentsErrors.length) {
        errors.equipments = equipmentsErrors;
    }

    if (product.videos.values.length) {
        const videosErrors: string[] = []
        dto.videos = [];
        product.videos.values.forEach((el, index) => {
            if (!el) {
                videosErrors[index] = 'Поле не заполнено';
            } else if (!validateVideo(el)) {
                videosErrors[index] = 'Некорректная ссылка на видео';
            } else {
                dto.videos?.push(el);
            }
        })
        if (videosErrors.length) {
            errors.videos = videosErrors;
        }
    }

    if (product.examples.length > 0) {
        dto.examples = [];
        product.examples.forEach(image => dto.examples?.push(image.fileId as number));
    }

    return {errors, dto};
}

export const validateChangedProduct = (product: ProductEditing) => {
    const errors: Errors = {};
    const dto: UpdateProductDTO = {}

    if (product.name.isChanged) {
        if (!product.name.value) {
            errors.name = 'Название не может быть пустым';
        } else {
            dto.name = product.name.value;
        }
    }

    if (product.description.isChanged) {
        if (!product.description.value) {
            errors.description = 'Описание не может быть пустым';
        } else {
            dto.description = product.description.value;
        }
    }

    if (product.previewImage.fileId) {
        dto.previewImage = product.previewImage.fileId;
    }

    if (product.price.isChanged) {
        if (!product.price.value) {
            errors.price = 'Цена не может быть пустой';
        } else {
            dto.price = Number.parseFloat(product.price.value);
        }
    }

    if (product.category.isChanged) {
        dto.categoryId = product.category.id as number;
    }

    if (product.isCharacteristicsChanged) {
        dto.characteristics = {};
        const characteristicsErrors: string[] = [];
        Object.entries(product.characteristics).forEach((entry, index) => {
            if (!entry[1].value) {
                if (entry[1].type === CategoryCharacteristicsType.Boolean) {
                    // @ts-ignore
                    dto.characteristics[entry[0]] = entry[1].value as boolean;
                } else {
                    characteristicsErrors[index] = 'Характеристика не заполнена';
                }
            } else {
                // @ts-ignore
                dto.characteristics[entry[0]] =
                    entry[1].type === CategoryCharacteristicsType.Double
                        ? Number.parseFloat(entry[1].value as string)
                        : entry[1].value
            }
        })
        if (characteristicsErrors.length) {
            errors.characteristics = characteristicsErrors;
        }
    }

    const newImages = product.images.filter(image => image.fileId)
    if (product.images.length === 0) {
        errors.images = 'Изображения товара отсутствуют';
    } else if (newImages.length > 0) {
        dto.images = [];
        newImages.forEach(image => {
            dto.images?.push(image.fileId as number);
        });
    }

    if (product.deletedImages.length) {
        dto.deletedImages = product.deletedImages;
    }

    const newExamples = product.examples.filter(image => image.fileId)
    if (newExamples.length !== 0) {
        dto.examples = [];
        newExamples.forEach(image => {
            dto.examples?.push(image.fileId as number);
        });
    }

    if (product.deletedExamples.length) {
        dto.deletedExamples = product.deletedExamples;
    }

    if (product.equipments.isChanged) {
        dto.equipments = [];
        const equipmentsErrors: string[] = []
        product.equipments.values.forEach((el, index) => {
            if (!el) {
                equipmentsErrors[index] = 'Поле не заполнено';
            } else {
                dto.equipments?.push(el);
            }
        })
        if (equipmentsErrors.length) {
            errors.equipments = equipmentsErrors;
        }
    }

    if (product.videos.isChanged) {
        dto.videos = [];
        if (product.videos.values.length) {
            const videosErrors: string[] = []
            dto.videos = [];
            product.videos.values.forEach((el, index) => {
                if (!el) {
                    videosErrors[index] = 'Поле не заполнено';
                } else if (!validateVideo(el)) {
                    videosErrors[index] = 'Некорректная ссылка на видео';
                } else {
                    dto.videos?.push(el);
                }
            })
            if (videosErrors.length) {
                errors.videos = videosErrors;
            }
        }
    }

    return {errors, dto};
}

const validateVideo = (video: string) => {
    if (video.search(
        /([http|https]+:\/\/)?(?:www\.|)youtube\.com\/watch\?(?:.*)?v=([a-zA-Z0-9_\-]+)/i,
    ) !== -1) return true;

    if (video.search(
        /([http|https]+:\/\/)?(?:www\.|)youtu\.be\/([a-zA-Z0-9_\-]+)/i,
    ) !== -1) return true;

    if (video.search(
        /([http|https]+:\/\/)?(?:www\.|)youtube\.com\/embed\/([a-zA-Z0-9_\-]+)/i,
    ) !== -1) return true;

    if (video.search(
        /https:\/\/frontend.vh.yandex.ru\/player\/([a-zA-Z0-9_\-]{12})(?:.*)?/i,
    ) !== -1) return true;

    if (video.search(
        /[http|https]+:\/\/(?:www\.|)rutube\.ru\/video\/([a-zA-Z0-9_\-]{32})\/?/i,
    ) !== -1) return true;

    return false;
}