import styles from './ArticleEditForm.module.scss'
import React, {FC, useEffect, useState} from "react";
import {Button, MenuItem} from "@mui/material";
import {OutputData} from "@editorjs/editorjs";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import cn from "classnames";
import dynamic from "next/dynamic";
import {Api} from "../../../utils/api";
import CustomSelect from "../../../ui-kit/CustomSelect/CustomSelect";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {Errors} from "../../../types/errors";
import ErrorParagraph from "../../../ui-kit/ErrorParagraph/ErrorParagraph";
import {ArticleEditing} from "../../../types/article";
import _ from "lodash";

const Editor = dynamic(() => {
    return import("../../Editor/Editor")
}, {ssr: false})

interface ArticleEditFormProps {
    article: ArticleEditing;
    setArticle: (value: ArticleEditing) => void;
    loading: boolean;
    errors: Errors;
}

const ArticleEditForm: FC<ArticleEditFormProps> = ({ article, setArticle, loading, errors }) => {
    const [blocks, setBlocks] = useState<OutputData['blocks']>([])
    const {categories} = useTypedSelector(state => state.articlesCategories);
    const {fetchArticlesCategories} = useActions();

    useEffect(() => {
        if (!categories) {
            fetchArticlesCategories()
        }
    }, [])

    const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newArticle = _.clone(article);
        newArticle.name = {
            text: event.target.value,
            isChanged: true
        };
        setArticle(newArticle);
    }

    const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newArticle = _.clone(article);
        newArticle.previewText = {
            text: event.target.value,
            isChanged: true
        };
        setArticle(newArticle);
    }

    const changePreviewImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadImage(formData);
                const newArticle = _.clone(article);
                newArticle.previewImage = response;
                setArticle(newArticle);
            } catch (e) {
                // TODO: обработать ошибку
            }
        }
    }

    const changeCategoryHandler = (categoryId: number) => {
        const newArticle = _.clone(article);
        newArticle.category = {
            id: categoryId,
            isChanged: true
        };
        setArticle(newArticle);
    }

    const changeContentHandler = (blocks: OutputData['blocks']) => {
        setBlocks(blocks);
    }

    useEffect(() => {
        const newArticle = _.clone(article);
        newArticle.content = {
            blocks,
            isChanged: true
        };
        setArticle(newArticle);
    }, [blocks])

    return (
        <>
            <div className='section'>
                <div className={cn("container", styles.container)}>
                    <CustomTextField
                        className={styles.input}
                        label='Заголовок'
                        value={article.name.text}
                        onChange={changeTitleHandler}
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={loading}
                    />
                    <CustomTextField
                        className={styles.input}
                        label='Краткое описание'
                        value={article.previewText.text}
                        onChange={changeDescriptionHandler}
                        error={!!errors.previewText}
                        helperText={errors.previewText}
                        disabled={loading}
                        multiline
                    />
                    <div>
                        {article.previewImage.filename &&
                            <div className={styles.previewImage}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${article.previewImage.fileId ? 'tmp' : 'images'}/${article.previewImage.filename}`}
                                />
                            </div>
                        }
                        <Button
                            variant="contained"
                            component="label"
                            className={styles.loadPreviewBtn}
                            disabled={loading}
                        >
                            {article.previewImage.filename ? 'Заменить превью' : 'Загрузить превью'}
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
                        value={article.category.id}
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
            {!loading && <Editor blocks={article.content.blocks} onChange={changeContentHandler} error={errors.content} />}
        </>
    );
};

export default ArticleEditForm;