import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from './ArticlesList.module.scss';
import {ArticlePreview} from "../../../types/article";
import Article from "../Article/Article";
import {Api} from "../../../utils/api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useObserver} from "../../../hooks/useObserver";

interface ArticlesListProps {
    articlesFromServer: ArticlePreview[] | null
    isAdmin?: boolean
    limit: number
    search?: string
}

const ArticlesList: FC<ArticlesListProps> = ({ isAdmin, articlesFromServer, limit, search }) => {
    const [articles, setArticles] = useState<ArticlePreview[] | null>(articlesFromServer)
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const { selectedId: selectedCategory } = useTypedSelector(state => state.articlesCategories)
    const [firstRender, setFirstRender] = useState(false)
    const lastArticleRef = useRef<HTMLDivElement | null>(null);

    const fetchArticles = async (offset: number, isNewCategory?: boolean) => {
        setLoading(true)
        const oldArticles = isNewCategory ? [] : articles || []
        const newArticles = await Api().articles.getArticles(limit, offset, selectedCategory, search)
        setArticles([...oldArticles as ArticlePreview[], ...newArticles]);
        setLoading(false)
    }

    useEffect(() => {
        const initialFetchArticles = async () => {
            setLoading(true)
            const newArticles = await Api().articles.getArticles(limit, offset, selectedCategory, search)
            setArticles(newArticles)
            setLoading(false)
        }
        if (!articlesFromServer) {
            initialFetchArticles()
        } else {
            setFirstRender(true)
        }
    }, [])

    useObserver(lastArticleRef as MutableRefObject<Element>, true, loading, () => {
        if (articles) {
            setOffset(articles.length)
        }
    })

    useEffect(() => {
        if (!articlesFromServer || (articlesFromServer && firstRender)) {
            fetchArticles(offset)
        }
    }, [offset])

    useEffect(() => {
        if (!articlesFromServer || (articlesFromServer && firstRender)) {
            setArticles([])
            fetchArticles(0, true)
        }
    }, [selectedCategory, search])

    return (
        <>
            <div className={styles.list}>
                {articles && articles.map(article =>
                    <Article article={article} key={article.id} isAdmin={isAdmin} />
                )}
            </div>
            {articles && !articles.length && <p>Статей с указанными параметрами не найдено</p>}
            <div ref={lastArticleRef} />
            {loading &&
                <>
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                </>
            }
        </>
    );
};

export default ArticlesList;