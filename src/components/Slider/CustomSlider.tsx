import React, {FC, ReactNode} from 'react';
import Slider, {Settings} from "react-slick";
import styles from './CustomSlider.module.scss'
import cn from "classnames";

interface CustomSliderProps {
    children: ReactNode,
    className: string,
    settings: Settings
}

const CustomSlider: FC<CustomSliderProps> = ({ settings, className, children }) => {
    return (
        <Slider
            {...settings}
            className={cn(styles.slider, className)}
            dotsClass={styles.dots}
        >
            {children}
        </Slider>
    );
};

export default CustomSlider;