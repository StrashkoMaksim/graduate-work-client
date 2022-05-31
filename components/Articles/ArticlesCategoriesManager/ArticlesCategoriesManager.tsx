import React, {useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import styles from './ArticlesCategoriesManager.module.scss'
import {CircularProgress} from "@mui/material";
import {useActions} from "../../../hooks/useActions";
import ArticlesCategoriesAddForm from "./ArticlesCategoriesAddForm/ArticlesCategoriesAddForm";
import {useSnackbar} from "notistack";

const ArticlesCategoriesManager = () => {
    const {categories, loading, error} = useTypedSelector(state => state.articlesCategories)
    const {fetchArticlesCategories, deleteArticleCategory} = useActions()
    const {enqueueSnackbar} = useSnackbar();

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
            enqueueSnackbar(error, {variant: "error"})
        }
    }, [error])

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
        </>
    );
};

export default ArticlesCategoriesManager;