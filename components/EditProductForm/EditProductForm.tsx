import React, {FC, useEffect, useState} from "react";
import {ProductEditing} from "../../types/product";
import {Errors} from "../../types/errors";
import cn from "classnames";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {Button, MenuItem} from "@mui/material";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import styles from './EditProductForm.module.scss'
import {CategoryAside} from "../../types/category";
import {Api} from "../../utils/api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import _ from "lodash";
import {useSnackbar} from "notistack";

interface EditProductFormProps {
    product: ProductEditing;
    setProduct: (value: ProductEditing) => void;
    errors: Errors;
}

const EditProductForm: FC<EditProductFormProps> = ({ product, setProduct, errors }) => {
    const [categories, setCategories] = useState<CategoryAside[] | null>(null);
    const { loading } = useTypedSelector(state => state.loading)
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await Api().categories.getCategories();
            setCategories(res);
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

    const changePreviewImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                const newProduct = _.clone(product);
                newProduct.previewImage = response;
                setProduct(newProduct);
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузки изображения', {variant: "error"});
            }
        }
    }

    const changeCategoryHandler = (categoryId: number) => {
        const newProduct = _.clone(product);
        newProduct.category = {
            id: categoryId,
            isChanged: true,
        };
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
                    error={!!errors.previewText}
                    helperText={errors.previewText}
                    disabled={loading}
                    multiline
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
                            onChange={changePreviewImageHandler}
                            type="file"
                            hidden
                        />
                    </Button>
                    {errors.previewImage &&
                        <ErrorParagraph className={styles.error}>{errors.previewImage}</ErrorParagraph>
                    }
                </div>
                <CustomSelect
                    label='Категория'
                    value={product.category.id}
                    // @ts-ignore
                    onChange={changeCategoryHandler}
                    error={!!errors.categoryId}
                    helperText={errors.categoryId}
                    disabled={loading}
                >
                    {categories && categories.map(category =>
                        <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                    )}
                </CustomSelect>
            </div>
        </div>
    );
};

export default EditProductForm;