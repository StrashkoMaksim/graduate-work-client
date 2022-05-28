import React, {FC, useEffect, useState} from 'react';
import styles from './ArticlesList.module.scss';
import {ArticlePreview} from "../../../types/article";
import Article from "../Article/Article";
import {Api} from "../../../utils/api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface ArticlesListProps {
    articlesFromServer: ArticlePreview[] | null
    isAdmin?: boolean
    limit: number
}

const ArticlesList: FC<ArticlesListProps> = ({ isAdmin, articlesFromServer, limit }) => {
    const [articles, setArticles] = useState<ArticlePreview[] | null>(articlesFromServer)
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const { selectedId: selectedCategory } = useTypedSelector(state => state.articlesCategories)

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)
            const newArticles = await Api().articles.getArticles(limit, offset, selectedCategory)
            setOffset(newArticles.length)
            setArticles(newArticles)
            setLoading(false)
        }
        if (!articlesFromServer) {
            fetchArticles()
        }
    }, [])

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)
            setArticles(await Api().articles.getArticles(limit, offset, selectedCategory))
            setLoading(false)
        }
        if (selectedCategory) {
            setOffset(0)
            fetchArticles()
        }
    }, [selectedCategory])


    return (
        <div className={styles.list}>
            {loading
                ? <>
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                </>
                : articles && articles.map(article =>
                    <Article article={article} key={article.id} isAdmin={isAdmin} />
                )
            }
        </div>
    );
};

export default ArticlesList;