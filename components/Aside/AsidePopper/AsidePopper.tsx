import {ClickAwayListener, Popper, useMediaQuery} from "@mui/material";
import {FC, ReactNode, useCallback, useRef, useState} from "react";

interface AsidePopper {
    children: ReactNode;
}

const AsidePopper: FC<AsidePopper> = ({ children }) => {
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
            <span className="asideHeader" onClick={headerClickHandler} ref={headerRef}>Категории</span>
            {isHiddenAside
                ?
                <Popper open={isPopperOpen} anchorEl={headerRef.current}>
                    <ClickAwayListener onClickAway={closePopper} >
                        <div>
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