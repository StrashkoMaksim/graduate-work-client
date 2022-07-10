import React, {FC, useState} from "react";
import {Banner, BannerEdit} from "../../../types/banner";
import styles from './BannerModal.module.scss'
import {Errors} from "../../../types/errors";
import {Api} from "../../../utils/api";
import _ from "lodash";
import {useSnackbar} from "notistack";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import ImageInput from "../../ImageInput/ImageInput";

interface BannerModalProps {
    bannerForEditing?: Banner;
}

const BannerModal: FC<BannerModalProps> = ({ bannerForEditing }) => {
    const [banner, setBanner] = useState<BannerEdit>({
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
    const { enqueueSnackbar } = useSnackbar();

    const changeLinkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBanner = _.clone(banner);
        newBanner.link = {
            value: event.target.value,
            isChanged: true
        };
        setBanner(newBanner);
    }

    const changeImageHandler = (type: 'bigImage' | 'mediumImage' | 'smallImage') => async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className={styles.container}>
            <CustomTextField
                className={styles.input}
                label='Ссылка'
                value={banner.link.value}
                onChange={changeLinkHandler}
                error={!!errors.name}
                helperText={errors.name}
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
                        <CustomButton variant={ButtonType.blue} text='Сохранить' onClick={() => {}} />
                        <CustomButton variant={ButtonType.red} text='Удалить' onClick={() => {}} />
                    </>
                    : <CustomButton variant={ButtonType.blue} text='Добавить баннер' onClick={() => {}} />
                }
            </div>
        </div>
    );
};

export default BannerModal;