import React, {FC} from 'react';
import styles from './Article.module.scss'
import {ArticlePreview} from "../../types/article";
import cn from "classnames";
import Button, {ButtonType} from "../../ui-kit/Button/Button";
import Link from "next/link";

interface ArticleProps {
    article?: ArticlePreview;
    isAdmin?: boolean
}

const Article: FC<ArticleProps> = ({ article, isAdmin }) => {
    if (article) {
        return (
            <Link href={`${isAdmin ? '/admin' : ''}/article/${article.slug}`}>
                <a className={styles.article}>
                    <div className={styles.img}>
                        <img src={article.previewImage} alt={article.name} />
                        {article.sale &&
                            <div className={styles.mount}>
                                <span className={styles.promotion}>{article.sale}</span>
                            </div>
                        }
                            <Button type={ButtonType.white}
                                    text={isAdmin ? 'Редактировать' : 'Подробнее'}
                                    additionalClass={styles.btn}
                            />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.name}>{article.name}</span>
                        <span className={styles.text}>{article.previewText}</span>
                        {article.promotionDate
                            ? <span className={cn(styles.date, styles.hot)}>{article.promotionDate}</span>
                            : <span className={styles.date}>{article.createdAt}</span>
                        }
                    </div>
                </a>
            </Link>
        )
    } else {
        return (
            <div></div>
        )
    }
};

export default Article;