import React, {useCallback, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './ArticlesCategoriesManager.module.scss'
import {CircularProgress} from "@mui/material";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import {useActions} from "../../hooks/useActions";
import ArticlesCategoriesAddForm from "./ArticlesCategoriesAddForm/ArticlesCategoriesAddForm";

const ArticlesCategoriesManager = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const {categories, loading, error} = useTypedSelector(state => state.articlesCategories)
    const {fetchArticlesCategories, deleteArticleCategory} = useActions()

    useEffect(() => {
        if (!categories) {
            fetchArticlesCategories();
        }
    }, [])

    const deleteHandler = (id: number) => async () => {
        await deleteArticleCategory(id);
    }

    useEffect(() => {
        if (error) {
            setIsSnackbarOpen(true);
        }
    }, [error])

    const closeSnackbar = useCallback(() => {
        setIsSnackbarOpen(false);
    }, [])

    return (
        <>
            {loading
                ? <CircularProgress className={styles.loading} />
                :
                <>
                    <div className={styles.table}>
                        {categories && categories.map(category =>
                            <div className={styles.category} key={category.id}>
                                <span className={styles.name}>{category.name}</span>
                                <button className={styles.delete} onClick={deleteHandler(category.id)} />
                            </div>
                        )}
                    </div>
                    <ArticlesCategoriesAddForm />
                </>
            }
            <CustomSnackbar isOpen={isSnackbarOpen} onClose={closeSnackbar} text={error} severity='error' />
        </>
    );
};

export default ArticlesCategoriesManager;