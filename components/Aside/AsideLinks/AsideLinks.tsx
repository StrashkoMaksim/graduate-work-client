import React, {FC} from 'react';
import cn from "classnames";
import styles from './AsideLinks.module.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import Link from "next/link";

interface AsideLinksProps {
    links: {
        name: string,
        slug: string
    }[]
}

const AsideLinks: FC<AsideLinksProps> = ({ links }) => {
    return (
        <div className={styles.block}>
            <Scrollbars className={styles.scroll} universal autoHeight autoHeightMax={300}>
                <Link href='/articles'><a className={styles.link}>Все</a></Link>
                {links.map(el =>
                    <Link
                        href={el.slug}
                        key={el.slug}
                    >
                        <a className={cn(styles.link, {[styles.hot]: el.slug === 'promotions'})}>{el.name}</a>
                    </Link>
                )}
            </Scrollbars>
        </div>
    );
};

export default AsideLinks;