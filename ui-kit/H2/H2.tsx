import React, {FC} from 'react';
import styles from './H2.module.scss'
import {Skeleton} from "@mui/material";
import cn from "classnames";

interface H2Props {
    text?: string
    className?: string
}

const H2: FC<H2Props> = ({ text, className }) => {
    if (text) {
        return (
            <h2 className={cn(styles.h2, className)}>
                {text}
            </h2>
        );
    } else {
        return (
            <Skeleton variant={"text"} animation={"wave"} className={styles.skeleton} />
        )
    }
};

export default H2;