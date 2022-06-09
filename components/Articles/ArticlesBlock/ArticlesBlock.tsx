import React, {FC, useEffect, useState} from 'react';
import styles from './ArticlesBlock.module.scss'
import PreviewBlock from "../../PreviewBlock/PreviewBlock";
import CustomSlider from "../../CustomSlider/CustomSlider";
import {ArticlePreview} from "../../../types/article";
import ArticleSlide from "../ArticleSlide/ArticleSlide";
import {Api} from "../../../utils/api";

interface ArticlesBlockProps {
    articlesFromServer: ArticlePreview[] | null;
}

const ArticlesBlock: FC<ArticlesBlockProps> = ({ articlesFromServer }) => {
    const [articles, setArticles] = useState<ArticlePreview[]>(articlesFromServer || [])

    useEffect(() => {
        const initialFetchArticles = async () => {
            const newArticles = await Api().articles.getArticles(8, 0, null)
            setArticles(newArticles)
        }
        if (!articlesFromServer) {
            initialFetchArticles()
        }
    }, [])

    return (
        <PreviewBlock
            title='Новости и акции'
            allLink={{
                text: 'Все новости и акции',
                link: '/articles'
            }}
            additionalClass={'grey-bg ' + styles.section}
        >
            <CustomSlider
                className={styles.slider}
                arrows={true}
                dots={true}
                variableWidth={true}
                speed={200}
                responsive={[
                    {
                        breakpoint: 960,
                        settings: {
                            arrows: false
                        }
                    }
                ]}
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