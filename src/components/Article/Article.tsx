import React, {FC} from 'react';
import styles from './Article.module.scss'
import {ArticlePreview} from "../../types/article";
import {Link} from "react-router-dom";
import cn from "classnames";
import Button, {ButtonType} from "../../ui-kit/Button/Button";

interface ArticleProps {
    article?: ArticlePreview
}

const Article: FC<ArticleProps> = ({ article }) => {
    if (article) {
        return (
            <Link to={`/article/${article.slug}`} className={styles.article}>
                <div className={styles.img}>
                    <img src={article.previewImage} alt={article.name} />
                    {article.sale &&
                        <div className={styles.mount}>
                            <span className={styles.promotion}>{article.sale}</span>
                        </div>
                    }
                    <Button type={ButtonType.white} text='Подробнее' additionalClass={styles.btn} />
                </div>
                <div className={styles.info}>
                    <span className={styles.name}>{article.name}</span>
                    <span className={styles.text}>{article.previewText}</span>
                    {article.promotionDate
                        ? <span className={cn(styles.date, styles.hot)}>{article.promotionDate}</span>
                        : <span className={styles.date}>{article.createdAt}</span>
                    }
                </div>
            </Link>
        )
    } else {
        return (
            <div></div>
        )
    }
};

export default Article;