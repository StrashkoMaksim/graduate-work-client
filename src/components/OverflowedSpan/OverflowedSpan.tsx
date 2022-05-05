import React, {FC, useState} from 'react';
import {Tooltip} from "@mui/material";

interface OverflowedSpanProps {
    text: string
}

const OverflowedSpan: FC<OverflowedSpanProps> = ({ text }) => {
    const [isTooltipOpened, setIsTooltipOpened] = useState(false)

    const addressClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        const el = event.currentTarget

        if (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
            setIsTooltipOpened(true)

            setTimeout(() => {
                setIsTooltipOpened(false)
            }, 1500)
        }
    }

    return (
        <Tooltip open={isTooltipOpened} title={text}>
            <span onClick={addressClickHandler}>{text}</span>
        </Tooltip>
    );
};

export default OverflowedSpan;