import styles from './ArticleSubline.module.scss'
import cn from "classnames";
import {FC} from "react";

interface ArticleSublineProps {
    type: 'warning' | 'danger';
    title: string;
    text: string;
}

const ArticleSubline: FC<ArticleSublineProps> = ({ title, type, text }) => {
    return (
        <div className={cn(styles.subline, [styles[type]])}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.text}>{text}</p>
        </div>
    );
};

export default ArticleSubline;