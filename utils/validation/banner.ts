import {Errors} from "../../types/errors";
import {BannerEdit, CreateBannerDto, UpdateBannerDto} from "../../types/banner";

export const validateNewBanner = (banner: BannerEdit) => {
    const errors: Errors = {};
    const dto: CreateBannerDto = {
        name: banner.name.value,
        link: banner.link.value,
        bigBanner: banner.bigImage.fileId || 0,
        mediumBanner: banner.mediumImage.fileId || 0,
        smallBanner: banner.smallImage.fileId || 0,
    }

    if (!banner.name.value) {
        errors.name = 'Название не может быть пустым';
    }

    if (!banner.link.value) {
        errors.link = 'Ссылка не может быть пустой';
    }

    if (!banner.bigImage.fileId) {
        errors.bigImage = 'Отсутствует изображение большого баннера'
    }

    if (!banner.mediumImage.fileId) {
        errors.mediumImage = 'Отсутствует изображение большого баннера'
    }

    if (!banner.smallImage.fileId) {
        errors.smallImage = 'Отсутствует изображение большого баннера'
    }

    return { errors, dto }
}

export const validateChangedBanner = (banner: BannerEdit) => {
    const errors: Errors = {};
    const dto: UpdateBannerDto = {};

    if (banner.name.isChanged) {
        if (!banner.name.value) {
            errors.name = 'Название не может быть пустым';
        } else {
            dto.name = banner.name.value;
        }
    }

    if (banner.link.isChanged) {
        if (!banner.link.value) {
            errors.previewText = 'Ссылка не может быть пустой';
        } else {
            dto.link = banner.link.value;
        }
    }

    if (banner.bigImage.fileId) {
        dto.bigBanner = banner.bigImage.fileId;
    }

    if (banner.mediumImage.fileId) {
        dto.mediumBanner = banner.mediumImage.fileId;
    }

    if (banner.smallImage.fileId) {
        dto.smallBanner = banner.smallImage.fileId;
    }

    return {errors, dto}
}