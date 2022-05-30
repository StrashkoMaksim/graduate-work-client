import React, {FC} from 'react';
import {ArticlePreview} from "../../../types/article";
import styles from './ArticleSlide.module.scss'
import Link from "next/link";
import {useRouter} from "next/router";

interface ArticleSlideProps {
    article?: ArticlePreview
}

const ArticleSlide: FC<ArticleSlideProps> = ({ article }) => {
    if (article) {
        const router = useRouter();

        const clickHandler = () => {
          router.push(`/articles/${article.slug}`)
        }

        return (
            <div className={styles.card} onClick={clickHandler}>
                <div className={styles.img}>
                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${article.previewImage}`} alt={article.name} />
                    <div className={styles.mount}>
                        {/*<span className={styles.promotion}>Акция</span>*/}
                    </div>
                </div>
                <div className={styles.info}>
                    <Link href={'/articles/' + article.slug}>
                        <a>{article.name}</a>
                    </Link>
                    <span className={styles.text}>
                        {article.previewText}
                    </span>
                    <span className={styles.date}>{article.createdAt}</span>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
};

export default ArticleSlide;