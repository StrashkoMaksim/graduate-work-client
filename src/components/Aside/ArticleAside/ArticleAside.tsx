import React, {useCallback, useRef, useState} from 'react';
import styles from './ArticlesAside.module.scss'
import {ClickAwayListener, Popper, useMediaQuery} from "@mui/material";
import AsideLinks from "../AsideLinks/AsideLinks";

const categories = [
    {
        name: 'Акции',
        slug: 'promotions'
    },
    {
        name: 'Новости',
        slug: 'news'
    },
    {
        name: 'Лазерные станки',
        slug: 'laser'
    },
    {
        name: 'Акции',
        slug: 'promotions'
    },
    {
        name: 'Новости',
        slug: 'news'
    },
    {
        name: 'Лазерные станки',
        slug: 'laser'
    },
    {
        name: 'Акции',
        slug: 'promotions'
    },
    {
        name: 'Новости',
        slug: 'news'
    },
    {
        name: 'Лазерные станки',
        slug: 'laser'
    },
    {
        name: 'Акции',
        slug: 'promotions'
    },
    {
        name: 'Новости',
        slug: 'news'
    },
    {
        name: 'Лазерные станки',
        slug: 'laser'
    }
]

const ArticleAside = () => {
    const isHiddenAside = useMediaQuery('(max-width: 1200px)');
    const [isPopperOpen, setIsPopperOpen] = useState(false)
    const headerRef = useRef(null)

    const headerClickHandler = useCallback(() => {
        setIsPopperOpen(true)
    }, [])

    const closeHandler = useCallback(() => {
        setIsPopperOpen(false)
    }, [])

    return (
        <div className={styles.categories}>
            <span className="asideHeader" onClick={headerClickHandler} ref={headerRef}>Категории</span>
            {isHiddenAside
                ?
                <Popper open={isPopperOpen} anchorEl={headerRef.current}>
                    <ClickAwayListener onClickAway={closeHandler} >
                        <div>
                            <AsideLinks links={categories} />
                        </div>
                    </ClickAwayListener>
                </Popper>
                :
                <AsideLinks links={categories} />
            }
        </div>
    );
};

export default ArticleAside;