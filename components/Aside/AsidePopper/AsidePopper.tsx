import {ClickAwayListener, Popper, useMediaQuery} from "@mui/material";
import {FC, ReactNode, useCallback, useRef, useState} from "react";
import styles from './AsidePopper.module.scss';

interface AsidePopper {
    children: ReactNode;
    title?: string;
}

const AsidePopper: FC<AsidePopper> = ({ children, title }) => {
    const isHiddenAside = useMediaQuery('(max-width: 1200px)');
    const [isPopperOpen, setIsPopperOpen] = useState(false)
    const headerRef = useRef(null)

    const headerClickHandler = useCallback(() => {
        setIsPopperOpen(true)
    }, [])

    const closePopper = useCallback(() => {
        setIsPopperOpen(false)
    }, [])

    return (
        <div>
            {title && <span className="asideHeader" onClick={headerClickHandler} ref={headerRef}>{title}</span>}
            {isHiddenAside
                ?
                <Popper open={isPopperOpen} anchorEl={headerRef.current}>
                    <ClickAwayListener onClickAway={closePopper} >
                        <div className={styles.content}>
                            {children}
                        </div>
                    </ClickAwayListener>
                </Popper>
                : children
            }
        </div>
    );
};

export default AsidePopper;