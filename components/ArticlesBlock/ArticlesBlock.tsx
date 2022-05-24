import React from 'react';
import styles from './ArticlesBlock.module.scss'
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import CustomSlider from "../CustomSlider/CustomSlider";
import {ArticlePreview} from "../../types/article";
import ArticleSlide from "../ArticleSlide/ArticleSlide";

const articles: ArticlePreview[] = [
    {
        id: 1,
        name: 'Название',
        slug: '1',
        previewText: 'Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк Описание на несколько строк',
        previewImage: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg',
        createdAt: '11 мая 2022'
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

const ArticlesBlock = () => {
    return (
        <PreviewBlock
            title='Новости и акции'
            allLink={{
                text: 'Все новости и акции',
                link: '/news'
            }}
            additionalClass={'grey-bg ' + styles.section}
        >
            <CustomSlider
                className={styles.slider}
                settings={{
                    arrows: true,
                    dots: true,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                }}
            >
                {articles.length ? articles.map(article =>
                    <ArticleSlide article={article} key={article.id} />
                )
                :
                    <>
                        <ArticleSlide/>
                        <ArticleSlide/>
                        <ArticleSlide/>
                    </>
                }
            </CustomSlider>
        </PreviewBlock>
    );
};

export default ArticlesBlock;