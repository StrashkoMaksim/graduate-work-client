import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import styles from './ArticlesAside.module.scss'
import {ClickAwayListener, Popper, useMediaQuery} from "@mui/material";
import AsideLinks from "../AsideLinks/AsideLinks";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {fetchArticlesCategories} from "../../../store/actions/articles-categories";

interface ArticleAside {
    isAdmin?: boolean,
}

const ArticleAside: FC<ArticleAside> = ({ isAdmin}) => {
    const isHiddenAside = useMediaQuery('(max-width: 1200px)');
    const [isPopperOpen, setIsPopperOpen] = useState(false)
    const headerRef = useRef(null)
    const { fetchArticlesCategories } = useActions()
    const {categories, loading, error} = useTypedSelector(state => state.articlesCategories)

    useEffect(() => {
        if (!categories) {
            fetchArticlesCategories()
        }
    }, [])

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
                            <AsideLinks links={categories} isAdmin={isAdmin} closeHandler={closeHandler} isLoading={loading} />
                        </div>
                    </ClickAwayListener>
                </Popper>
                :
                <AsideLinks links={categories} isAdmin={isAdmin} closeHandler={closeHandler} isLoading={loading} />
            }
        </div>
    );
};

export default ArticleAside;