import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {ArticlePreview} from "../../types/article";
import styles from './ArticleSlide.module.scss'

interface ArticleSlideProps {
    article?: ArticlePreview
}

const ArticleSlide: FC<ArticleSlideProps> = ({ article }) => {
    if (article) {
        return (
            <Link to={'/news/' + article.slug} className={styles.card}>
                <div className={styles.img}>
                    <img src={article.previewImage} alt={article.name} />
                    <div className={styles.mount}>
                        <span className={styles.promotion}>Акция</span>
                    </div>
                </div>
                <div className={styles.info}>
                    <h4>{article.name}</h4>
                    <span className={styles.text}>
                    {article.previewText}
                </span>
                    <span className={styles.date}>{article.createdAt}</span>
                </div>
            </Link>
        );
    } else {
        return (
            <div></div>
        )
    }
};

export default ArticleSlide;