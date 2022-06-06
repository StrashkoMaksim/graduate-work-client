import {Errors} from "../../types/errors";
import {ArticleEditing, UpdateArticleDto} from "../../types/article";
import {CreateProductDTO, ProductEditing} from "../../types/product";
import {CategoryCharacteristicsType} from "../../types/category";

export const validateNewProduct = (product: ProductEditing) => {
    const errors: Errors = {};
    const dto: CreateProductDTO = {
        name: product.name.value,
        description: product.name.value,
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
    product.equipments.forEach((el, index) => {
        if (!el) {
           equipmentsErrors[index] = 'Поле не заполнено';
        } else {
            dto.equipments.push(el);
        }
    })
    if (equipmentsErrors.length) {
        errors.equipments = equipmentsErrors;
    }

    if (product.videos.length) {
        const videosErrors: string[] = []
        dto.videos = [];
        product.videos.forEach((el, index) => {
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

export const validateChangedProduct = (article: ArticleEditing) => {
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
        /([http|https]+:\/\/)?(?:www\.|)zen\.yandex\.ru\/video\/watch\/([a-zA-Z0-9_\-]{24})(?:.*)?/i,
    ) !== -1) return true;

    if (video.search(
        /[http|https]+:\/\/(?:www\.|)rutube\.ru\/video\/([a-zA-Z0-9_\-]{32})\/?/i,
    ) !== -1) return true;

    return false;
}