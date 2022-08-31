import React, {FC} from 'react';
import cn from "classnames";
import styles from './AsideLinks.module.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import {Skeleton} from "@mui/material";
import {useRouter} from "next/router";
import _ from "lodash";

interface AsideLinksProps {
    isLoading: boolean
    links: {id: number, name: string, slug: string}[] | null
    isAdmin?: boolean
    entity: string
    isNewRoute?: boolean
    slugName?: string
    selectedLinkId?: string | null
    withoutAll?: boolean
}

const AsideLinks: FC<AsideLinksProps> = ({ isLoading, links, isAdmin, entity, isNewRoute, selectedLinkId, withoutAll, slugName }) => {
    const router = useRouter();

    const clickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const slug = event.currentTarget.getAttribute('data-slug');
        const query = _.clone(router.query);
        delete query.slug;

        if (!isNewRoute && slugName) {
            query[slugName] = slug as string;
        }

        router.push(
            {
                pathname: `${isAdmin ? '/admin' : ''}/${entity}${isNewRoute && slug ? `/${slug}` : ''}`,
                query
            },
            undefined,
            { shallow: true }
        )
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
                        {!withoutAll &&
                            <a
                                role='button'
                                tabIndex={0}
                                className={cn(styles.link, {[styles.active]: !selectedLinkId})}
                                onClick={clickHandler}
                            >
                                Все
                            </a>
                        }
                        {links && links.map((el, index) =>
                            <a
                                role='button'
                                tabIndex={index + 1}
                                data-slug={el.slug}
                                className={cn(
                                    styles.link,
                                    {[styles.hot]: el.slug === 'akcii'},
                                    {[styles.active]: selectedLinkId === el.slug}
                                )}
                                onClick={clickHandler}
                                key={el.id}
                            >
                                {el.name}
                            </a>
                        )}
                    </>
                }
            </Scrollbars>
        </div>
    );
};

export default AsideLinks;