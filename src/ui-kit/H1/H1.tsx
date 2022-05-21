import React, {FC} from 'react';
import styles from './H1.module.scss'
import {Skeleton} from "@mui/material";

interface H1Props {
    text?: string
}

const H1: FC<H1Props> = ({ text }) => {
    if (text) {
        return (
            <h1 className={styles.h1}>
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