import React, {FC} from 'react';
import styles from './Breadcrumbs.module.scss'
import cn from "classnames";
import {Link} from "react-router-dom";
import {Skeleton} from "@mui/material";

interface BreadcrumbsProps {
    links: [{
        link: string,
        text: string
    }],
    current?: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links, current }) => {
    return (
        <div className={cn("section", styles.block)}>
            <div className={cn("container", styles.container)}>
                {links.map(el => <Link to={el.link} key={el.link}>{el.text}</Link>)}
                {current
                    ? <span>Статьи</span>
                    : <Skeleton variant={"text"} animation={"wave"} className={styles.skeleton} />
                }
            </div>
        </div>
    );
};

export default Breadcrumbs;