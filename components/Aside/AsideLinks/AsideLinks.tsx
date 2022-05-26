import React, {FC} from 'react';
import cn from "classnames";
import styles from './AsideLinks.module.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import Link from "next/link";
import {useRouter} from "next/router";
import {Skeleton} from "@mui/material";
import {ArticleCategory} from "../../../types/article";

interface AsideLinksProps {
    isLoading: boolean;
    links: ArticleCategory[] | null;
    isAdmin?: boolean;
    closeHandler: () => void;
}

const AsideLinks: FC<AsideLinksProps> = ({ isLoading, links, isAdmin, closeHandler }) => {
    const router = useRouter()
    const { category } = router.query

    const clickHandler = () => {
        closeHandler()
    }

    return (
        <div className={styles.block}>
            <Scrollbars className={styles.scroll} universal autoHeight autoHeightMax={300}>
                {isLoading
                    ? <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                    : <>
                        <Link href={`${isAdmin ? '/admin' : ''}/articles`}>
                            <a className={cn(styles.link, {[styles.active]: !category})} onClick={clickHandler}>Все</a>
                        </Link>
                        {links && links.map(el =>
                            <Link
                                href={`${isAdmin ? '/admin' : ''}/articles?category=${el.slug}`}
                                key={el.slug}
                            >
                                <a
                                    className={cn(
                                        styles.link,
                                        {[styles.hot]: el.slug === 'akcii'},
                                        {[styles.active]: category === el.slug})}
                                    onClick={clickHandler}
                                >
                                    {el.name}
                                </a>
                            </Link>
                        )}
                    </>
                }
            </Scrollbars>
        </div>
    );
};

export default AsideLinks;