import React, {FC} from 'react';
import styles from './H1.module.scss'
import {Skeleton} from "@mui/material";
import cn from "classnames";

interface H1Props {
    text?: string
    className?: string
}

const H1: FC<H1Props> = ({ text, className }) => {
    if (text) {
        return (
            <h1 className={cn(styles.h1, className)}>
                {text}
            </h1>
        );
    } else {
        return (
            <Skeleton variant={"text"} animation={"wave"} className={styles.skeleton} />
        )
    }
};

export default H1;