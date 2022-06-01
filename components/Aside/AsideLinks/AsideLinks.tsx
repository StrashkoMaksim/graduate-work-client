import React, {FC} from 'react';
import cn from "classnames";
import styles from './AsideLinks.module.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import Link from "next/link";
import {Skeleton} from "@mui/material";

interface AsideLinksProps {
    isLoading: boolean;
    links: {id: number, name: string, slug: string}[] | null;
    isAdmin?: boolean;
    entity: string
    isNewRoute?: boolean;
    selectedLinkId?: string | null;
}

const AsideLinks: FC<AsideLinksProps> = ({ isLoading, links, isAdmin, entity, isNewRoute, selectedLinkId }) => {
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
                        <Link href={`${isAdmin ? '/admin' : ''}/${entity}`}>
                            <a className={cn(styles.link, {[styles.active]: !selectedLinkId})}>Все</a>
                        </Link>
                        {links && links.map(el =>
                            <Link
                                href={`${isAdmin ? '/admin' : ''}/${entity}${isNewRoute ? `/${el.slug}` : `?category=${el.slug}`}`}
                                key={el.slug}
                            >
                                <a
                                    className={cn(
                                        styles.link,
                                        {[styles.hot]: el.slug === 'akcii'},
                                        {[styles.active]: selectedLinkId === el.slug})}
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