import React, {FC, useCallback, useState} from "react";
import {Banner, BannerEdit} from "../../../types/banner";
import styles from './BannerModal.module.scss'
import {Errors} from "../../../types/errors";
import {Api} from "../../../utils/api";
import _ from "lodash";
import {useSnackbar} from "notistack";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import ImageInput from "../../ImageInput/ImageInput";
import {validateNewProduct} from "../../../utils/validation/product";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import {useRouter} from "next/router";
import {validateChangedBanner, validateNewBanner} from "../../../utils/validation/banner";
import {exceptionsHandler} from "../../../utils/api/exceptions/exceptions";
import {hasErrors} from "../../../utils/validation/hasErrors";

interface BannerModalProps {
    bannerForEditing?: Banner;
    hideModal: (reload: boolean) => void;
}

const BannerModal: FC<BannerModalProps> = ({ bannerForEditing, hideModal }) => {
    const [banner, setBanner] = useState<BannerEdit>({
        id: bannerForEditing?.id,
        name: {
            value: bannerForEditing?.name || '',
            isChanged: false,
        },
        link: {
            value: bannerForEditing?.link || '',
            isChanged: false,
        },
        bigImage: {
            filename: bannerForEditing?.bigImage || '',
        },
        mediumImage: {
            filename: bannerForEditing?.mediumImage ||  '',
        },
        smallImage: {
            filename: bannerForEditing?.smallImage ||  '',
        },
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({})
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBanner = _.clone(banner);
        // @ts-ignore
        newBanner[event.currentTarget.name] = {
            value: event.currentTarget.value,
            isChanged: true
        };
        setBanner(newBanner);
    }

    const changeImageHandler = (type: 'bigImage' | 'mediumImage' | 'smallImage') =>
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                const formData = new FormData();
                formData.set('file', event.target.files[0]);
                try {
                    const response = await Api().files.uploadImage(formData);
                    const newBanner = _.clone(banner);
                    newBanner[type] = response;
                    setBanner(newBanner);
                } catch (e) {
                    enqueueSnackbar('Ошибка при загрузки изображения', {variant: "error"});
                }
            }
        }

    const createBanner = async () => {
        const {errors, dto} = validateNewBanner(banner);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            return;
        }

        try {
            await Api().banners.createBanner(dto);
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    const updateBanner = async () => {
        const {errors, dto} = validateChangedBanner(banner);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            return;
        }

        try {
            if (banner.id) {
                await Api().banners.updateBanner(banner.id, dto);
            }
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    const deleteBanner = async () => {
        try {
            if (banner.id) {
                await Api().banners.deleteBanner(banner.id);
            }
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <div className={styles.container}>
            <CustomTextField
                name='name'
                className={styles.input}
                label='Название'
                value={banner.name.value}
                onChange={changeTextHandler}
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading}
            />
            <CustomTextField
                name='link'
                className={styles.input}
                label='Ссылка'
                value={banner.link.value}
                onChange={changeTextHandler}
                error={!!errors.link}
                helperText={errors.link}
                disabled={loading}
            />
            <ImageInput
                filename={banner.bigImage.filename}
                fileId={banner.bigImage.fileId}
                loading={loading}
                changeImageHandler={changeImageHandler('bigImage')}
                error={errors.bigImage}
                loadText='Загрузить большой баннер'
                replaceText='Заменить большой баннер'
            />
            <ImageInput
                filename={banner.mediumImage.filename}
                fileId={banner.mediumImage.fileId}
                loading={loading}
                changeImageHandler={changeImageHandler('mediumImage')}
                error={errors.mediumImage}
                loadText='Загрузить средний баннер'
                replaceText='Заменить средний баннер'
            />
            <ImageInput
                filename={banner.smallImage.filename}
                fileId={banner.smallImage.fileId}
                loading={loading}
                changeImageHandler={changeImageHandler('smallImage')}
                error={errors.smallImage}
                loadText='Загрузить маленький баннер'
                replaceText='Заменить маленький баннер'
            />
            <div className={styles.btns}>
                {bannerForEditing ?
                    <>
                        <CustomButton variant={ButtonType.blue} text='Сохранить' onClick={updateBanner} />
                        <CustomButton variant={ButtonType.red} text='Удалить' onClick={deleteBanner} />
                    </>
                    : <CustomButton variant={ButtonType.blue} text='Добавить баннер' onClick={createBanner} />
                }
            </div>
        </div>
    );
};

export default BannerModal;