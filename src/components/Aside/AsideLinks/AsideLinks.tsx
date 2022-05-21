import React, {FC} from 'react';
import cn from "classnames";
import styles from './AsideLinks.module.scss'
import {Link} from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

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
                <Link className={styles.link} to='/articles'>Все</Link>
                {links.map(el =>
                    <Link
                        to={el.slug}
                        className={cn(styles.link, {[styles.hot]: el.slug === 'promotions'})}
                        key={el.slug}
                    >
                        {el.name}
                    </Link>
                )}
            </Scrollbars>
        </div>
    );
};

export default AsideLinks;