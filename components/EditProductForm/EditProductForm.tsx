import React, {FC, useEffect, useState} from "react";
import {GalleryImage, ProductEditing} from "../../types/product";
import {Errors} from "../../types/errors";
import cn from "classnames";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {Button, InputAdornment, MenuItem} from "@mui/material";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import styles from './EditProductForm.module.scss'
import {CategoryAside, CategoryCharacteristicsType} from "../../types/category";
import {Api} from "../../utils/api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import _ from "lodash";
import {useSnackbar} from "notistack";
import {useActions} from "../../hooks/useActions";
import AdminProductCharacteristic from "../AdminProductCharacteristic/AdminProductCharacteristic";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import CategorySelect from "../CategorySelect/CategorySelect";

interface EditProductFormProps {
    product: ProductEditing;
    setProduct: (value: ProductEditing) => void;
    errors: Errors;
}

const EditProductForm: FC<EditProductFormProps> = ({ product, setProduct, errors }) => {
    const [categories, setCategories] = useState<CategoryAside[] | null>(null);
    const { loading } = useTypedSelector(state => state.loading)
    const { setEnableLoading, setDisableLoading } = useActions();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchCategories = async () => {
            setEnableLoading()
            const res = await Api().categories.getCategories();
            setCategories(res);
            setDisableLoading()
        }
        fetchCategories();
    }, [])

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct = _.clone(product);
        if (event.target.name === 'name' || event.target.name === 'description') {
            newProduct[event.target.name] = {
                value: event.target.value,
                isChanged: true
            };
        }
        setProduct(newProduct);
    }

    const changePriceHandler = (value: string) => {
        const newProduct = _.clone(product);
        if (value) {
            newProduct.price = {
                value: value,
                isChanged: true
            };
        }
        setProduct(newProduct);
    }

    const addImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                const newProduct = _.clone(product);
                switch (event.target.name) {
                    case 'previewImage':
                        newProduct.previewImage = response;
                        break;
                    case 'images':
                        newProduct.images.push(response);
                        break;
                    case 'examples':
                        newProduct.examples.push(response);
                        break;
                }
                setProduct(newProduct);
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузки изображения', {variant: "error"});
            }
        }
    }

    const deleteImageHandler = (image: GalleryImage, index: number) => () => {
        const newProduct = _.clone(product);
        if (image.id) {
            newProduct.deletedImages.push(image.id);
        }
        newProduct.images.splice(index, 1);
        setProduct(newProduct);
    }

    const changeImageHandler = (image: GalleryImage, index: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                const newProduct = _.clone(product);
                if (image.id) {
                    newProduct.deletedImages.push(image.id);
                }
                newProduct.images[index] = response;
                setProduct(newProduct);
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузки изображения', {variant: "error"});
            }
        }
    }

    const deleteExampleHandler = (image: GalleryImage, index: number) => () => {
        const newProduct = _.clone(product);
        if (image.id) {
            newProduct.deletedExamples.push(image.id);
        }
        newProduct.examples.splice(index, 1);
        setProduct(newProduct);
    }

    const changeExampleHandler = (image: GalleryImage, index: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                const newProduct = _.clone(product);
                if (image.id) {
                    newProduct.deletedExamples.push(image.id);
                }
                newProduct.examples[index] = response;
                setProduct(newProduct);
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузки изображения', {variant: "error"});
            }
        }
    }

    const changeCategoryHandler = async (categoryId: number) => {
        const newProduct = _.clone(product);
        newProduct.category = {
            id: categoryId,
            isChanged: true,
        };
        newProduct.characteristics = {};
        categories?.forEach(category => {
            if (category.id === categoryId) {
                Object.entries(category.characteristics).forEach(characteristic => {
                    newProduct.characteristics[characteristic[0]] = {
                        type: characteristic[1].type,
                        value: characteristic[1].type === CategoryCharacteristicsType.Boolean ? false : null,
                    }
                })
            }
        })
        setProduct(newProduct);
    }

    const changeCharacteristicHandler = (value: string | number | boolean, name: string) => {
        const newProduct = _.clone(product);
        newProduct.characteristics[name].value = value;
        newProduct.isCharacteristicsChanged = true;
        setProduct(newProduct);
    }

    const changeEquipmentHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct = _.clone(product);
        newProduct.equipments.values[index] = event.target.value;
        newProduct.equipments.isChanged = true;
        setProduct(newProduct);
    }

    const deleteEquipmentHandler = (index: number) => () => {
        const newProduct = _.clone(product);
        newProduct.equipments.values.splice(index, 1);
        setProduct(newProduct);
    }

    const addEquipmentHandler = () => {
        const newProduct = _.clone(product);
        newProduct.equipments.values.push('');
        setProduct(newProduct);
    }

    const changeVideoHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct = _.clone(product);
        newProduct.videos.values[index] = event.target.value;
        newProduct.videos.isChanged = true;
        setProduct(newProduct)
    }

    const deleteVideoHandler = (index: number) => () => {
        const newProduct = _.clone(product);
        newProduct.videos.values.splice(index, 1);
        newProduct.videos.isChanged = true;
        setProduct(newProduct);
    }

    const addVideoHandler = () => {
        const newProduct = _.clone(product);
        newProduct.videos.values.push('');
        newProduct.videos.isChanged = true;
        setProduct(newProduct);
    }

    return (
        <div className='section'>
            <div className={cn("container", styles.container)}>
                <CustomTextField
                    name='name'
                    className={styles.input}
                    label='Заголовок'
                    value={product.name.value}
                    onChange={changeTextHandler}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={loading}
                />
                <CustomTextField
                    name='description'
                    className={styles.input}
                    label='Краткое описание'
                    value={product.description.value}
                    onChange={changeTextHandler}
                    error={!!errors.description}
                    helperText={errors.description}
                    disabled={loading}
                    multiline
                />
                <MaskedTextField
                    mask={Number}
                    radix="."
                    label='Цена'
                    value={product.price.value === null ? '' : String(product.price.value)}
                    onAccept={changePriceHandler}
                    disabled={loading}
                    // @ts-ignore
                    InputProps={{
                        endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                    }}
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <div>
                    {product.previewImage.filename &&
                        <div className={styles.previewImage}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${product.previewImage.fileId ? 'tmp' : 'images'}/${product.previewImage.filename}`}
                            />
                        </div>
                    }
                    <Button
                        variant="contained"
                        component="label"
                        className={styles.loadPreviewBtn}
                        disabled={loading}
                    >
                        {product.previewImage.filename ? 'Заменить превью' : 'Загрузить превью'}
                        <input
                            name='previewImage'
                            onChange={addImageHandler}
                            type="file"
                            hidden
                        />
                    </Button>
                    {errors.previewImage &&
                        <ErrorParagraph className={styles.error}>{errors.previewImage as string}</ErrorParagraph>
                    }
                </div>
                <CategorySelect value={product.category.id} changeCategory={changeCategoryHandler} error={errors.category} />
                {product.category.id &&
                    <div className={styles.characteristics}>
                        <h4 className={styles.h4}>Характеристики</h4>
                        {Object.entries(product.characteristics).map((characteristic, index) =>
                            <AdminProductCharacteristic
                                name={characteristic[0]}
                                type={characteristic[1].type}
                                value={characteristic[1].value}
                                disabled={loading}
                                onChange={changeCharacteristicHandler}
                                key={characteristic[0]}
                                error={Boolean(errors.characteristics) && Boolean(errors.characteristics[index])}
                                helperText={errors.characteristics ? errors.characteristics[index] : undefined}
                            />
                        )}
                    </div>
                }
                <div>
                    <h4 className={styles.h4}>Изображения товара</h4>
                    {product.images.length > 0 &&
                        <div className={styles.gallery}>
                            {product.images.map((image, index) =>
                                <div className={styles.galleryImage} key={image.filename}>
                                    <label className={styles.changeImage}>
                                        <input name='images' onChange={changeImageHandler(image, index)} type="file" hidden/>
                                    </label>
                                    <button className={styles.deleteImage} onClick={deleteImageHandler(image, index)} />
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image.fileId ? 'tmp' : 'images'}/${image.filename}`}/>
                                </div>
                            )}
                        </div>
                    }
                    <Button variant="contained" component="label" className={styles.loadPreviewBtn} disabled={loading}>
                        Добавить изображение
                        <input name='images' onChange={addImageHandler} type="file" hidden/>
                    </Button>
                    {errors.images && <ErrorParagraph className={styles.error}>{errors.images as string}</ErrorParagraph>}
                </div>
                <div>
                    <h4 className={styles.h4}>Комплектация</h4>
                    <div className={styles.container}>
                        {product.equipments.values.map((value, index) =>
                            <div className={cn(styles.deletableInput, {[styles.deletable]: product.equipments.values.length > 1})} key={index}>
                                <CustomTextField
                                    name='equipments'
                                    className={styles.input}
                                    label='Элемент комплектации'
                                    value={value}
                                    onChange={changeEquipmentHandler(index)}
                                    error={errors.equipments && errors.equipments[index]}
                                    helperText={errors.equipments ? errors.equipments[index] : undefined}
                                    disabled={loading}
                                />
                                <button className={styles.delete} onClick={deleteEquipmentHandler(index)} />
                            </div>
                        )}
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                        className={styles.loadPreviewBtn}
                        disabled={loading}
                        onClick={addEquipmentHandler}
                    >
                        Добавить пункт
                    </Button>
                </div>
                <div>
                    <h4 className={styles.h4}>Примеры изделий</h4>
                    {product.examples.length > 0 &&
                        <div className={styles.gallery}>
                            {product.examples.map((image, index) =>
                                <div className={styles.galleryImage} key={image.filename}>
                                    <label className={styles.changeImage}>
                                        <input name='images' onChange={changeExampleHandler(image, index)} type="file" hidden/>
                                    </label>
                                    <button className={styles.deleteImage} onClick={deleteExampleHandler(image, index)} />
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image.fileId ? 'tmp' : 'images'}/${image.filename}`}/>
                                </div>
                            )}
                        </div>
                    }
                    <Button variant="contained" component="label" className={styles.loadPreviewBtn} disabled={loading}>
                        Добавить изображение
                        <input name='examples' onChange={addImageHandler} type="file" hidden/>
                    </Button>
                    {errors.images && <ErrorParagraph className={styles.error}>{errors.images as string}</ErrorParagraph>}
                </div>
                <div>
                    <h4 className={styles.h4}>Видео</h4>
                    <div className={styles.container}>
                        {product.videos.values.map((value, index) =>
                            <div className={cn(styles.deletableInput, styles.deletable)} key={index}>
                                <CustomTextField
                                    name='video'
                                    className={styles.input}
                                    label='Ссылка на видео'
                                    value={value}
                                    onChange={changeVideoHandler(index)}
                                    error={errors.videos && errors.videos[index]}
                                    helperText={errors.videos ? errors.videos[index] : undefined}
                                    disabled={loading}
                                />
                                <button className={styles.delete} onClick={deleteVideoHandler(index)} />
                            </div>
                        )}
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                        className={styles.loadPreviewBtn}
                        disabled={loading}
                        onClick={addVideoHandler}
                    >
                        Добавить пункт
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProductForm;