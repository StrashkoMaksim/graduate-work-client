import styles from './ErrorParagraph.module.scss'
import {FC} from "react";
import cn from "classnames";

interface ErrorParagraph {
    className?: string
    children: string
}

const ErrorParagraph: FC<ErrorParagraph> = ({ className, children }) => {
    return (
        <p className={cn(styles.error, className)}>{children}</p>
    );
};

export default ErrorParagraph;