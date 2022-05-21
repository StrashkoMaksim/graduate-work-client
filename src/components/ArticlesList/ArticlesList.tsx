import React from 'react';
import styles from './ArticlesList.module.scss';
import {ArticlePreview} from "../../types/article";
import Article from "../Article/Article";

const articles: ArticlePreview[] = [
    {
        id: 1,
        name: 'Название',
        slug: '1',
        previewText: 'Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк',
        previewImage: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg',
        createdAt: '11 мая 2022',
        promotionDate: '25.11.2021 - 26.11.2021',
        sale: '-25 %'
    },
    {
        id: 2,
        name: 'Название',
        slug: '1',
        previewText: 'Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк',
        previewImage: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg',
        createdAt: '11 мая 2022'
    },
    {
        id: 3,
        name: 'Название',
        slug: '1',
        previewText: 'Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк',
        previewImage: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg',
        createdAt: '11 мая 2022'
    },
    {
        id: 4,
        name: 'Название',
        slug: '1',
        previewText: 'Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк',
        previewImage: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg',
        createdAt: '11 мая 2022'
    },
]

const ArticlesList = () => {
    return (
        <div className={styles.list}>
            {articles.length > 0
                ? articles.map(article => <Article article={article} key={article.id} />)
                :
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
        </div>
    );
};

export default ArticlesList;