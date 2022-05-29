import styles from './ArticleEditForm.module.scss'
import React, {FC, useEffect, useState} from "react";
import {Button, MenuItem} from "@mui/material";
import {OutputData} from "@editorjs/editorjs";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import cn from "classnames";
import dynamic from "next/dynamic";
import {Api} from "../../../utils/api";
import {UploadResponse} from "../../../utils/api/filesApi";
import CustomSelect from "../../../ui-kit/CustomSelect/CustomSelect";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeader from "../../PageHeader/PageHeader";
import {Errors} from "../../../types/errors";
import {articleValidation} from "../../../utils/validation/article";
import ErrorParagraph from "../../../ui-kit/ErrorParagraph/ErrorParagraph";

const Editor = dynamic(() => {
    return import("../../Editor/Editor")
}, {ssr: false})

interface ArticleEditFormProps {
    pageTitle: string;
    onSubmit: (name: string, previewText: string, previewImage: number, content: OutputData['blocks'], categoryId: number) => void;
}

const ArticleEditForm: FC<ArticleEditFormProps> = ({ pageTitle, onSubmit }) => {
    const [name, setName] = useState('');
    const [previewText, setPreviewText] = useState('');
    const [previewImage, setPreviewImage] = useState<UploadResponse | string | null>(null);
    const [categoryId, setCategoryId] = useState<number | ''>('')
    const [content, setContent] = useState<OutputData['blocks']>([])
    const [errors, setErrors] = useState<Errors>({})

    const {categories} = useTypedSelector(state => state.articlesCategories);
    const {fetchArticlesCategories} = useActions();

    useEffect(() => {
        if (!categories) {
            fetchArticlesCategories()
        }
    }, [])

    const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewText(event.target.value)
    }

    const changePreviewImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                setPreviewImage(response);
            } catch (e) {

            }
        }
    }

    const changeCategoryHandler = (categoryId: number) => {
        setCategoryId(categoryId);
    }

    const changeContentHandler = (blocks: OutputData['blocks']) => {
        setContent(blocks);
    }

    const submitHandler = async () => {
        const validationResult = articleValidation(name, previewText, previewImage, content, categoryId)

        if (Object.keys(validationResult).length) {
            setErrors(validationResult);
            return;
        }

        // Валидация уже проведена
        // @ts-ignore
        await onSubmit(name, previewText, previewImage.fileId, content, categoryId);
    }

    return (
        <>
            <PageHeader h1={pageTitle}>
                <div className={styles.btns}>
                    <CustomButton variant={ButtonType.blue} text='Опубликовать' additionalClass={styles.blueBtn} onClick={submitHandler} />
                </div>
            </PageHeader>
            <div className='section'>
                <div className={cn("container", styles.container)}>
                    <CustomTextField
                        className={styles.input}
                        label='Заголовок'
                        value={name}
                        onChange={changeTitleHandler}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <CustomTextField
                        className={styles.input}
                        label='Краткое описание'
                        value={previewText}
                        onChange={changeDescriptionHandler}
                        error={!!errors.previewText}
                        helperText={errors.previewText}
                        multiline
                    />
                    <div>
                        {previewImage &&
                            <div className={styles.previewImage}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${typeof previewImage === 'string'
                                    ? previewImage
                                    : previewImage.filename}`}
                                />
                            </div>
                        }
                        <Button
                            variant="contained"
                            component="label"
                            className={styles.loadPreviewBtn}
                        >
                            {previewImage ? 'Заменить превью' : 'Загрузить превью'}
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
                        value={categoryId}
                        // @ts-ignore
                        onChange={changeCategoryHandler}
                        error={!!errors.categoryId}
                        helperText={errors.categoryId}
                    >
                        {categories && categories.map(category =>
                            <MenuItem value={category.id}>{category.name}</MenuItem>
                        )}
                    </CustomSelect>
                </div>
            </div>
            <Editor blocks={content} onChange={changeContentHandler} error={errors.content} />
        </>
    );
};

export default ArticleEditForm;