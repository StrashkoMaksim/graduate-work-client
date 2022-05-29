import React, {FC} from 'react';
import styles from './Breadcrumbs.module.scss'
import cn from "classnames";
import {Skeleton} from "@mui/material";
import Link from "next/link";

interface BreadcrumbsProps {
    links: {
        link: string,
        text: string
    }[],
    current?: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links, current }) => {
    return (
        <div className={cn("section", styles.block)}>
            <div className={cn("container", styles.container)}>
                {links.map(el => <Link href={el.link} key={el.link}><a>{el.text}</a></Link>)}
                {current
                    ? <span>{current}</span>
                    : <Skeleton variant={"text"} animation={"wave"} className={styles.skeleton} />
                }
            </div>
        </div>
    );
};

export default Breadcrumbs;