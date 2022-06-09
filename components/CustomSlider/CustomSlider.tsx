import React, {FC, ForwardedRef} from 'react';
import Slider, {Settings} from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CustomSlider.module.scss'
import cn from "classnames";

const CustomSlider = React.forwardRef((props: Settings, ref: ForwardedRef<any>) => {
    return (
        <Slider
            {...props}
            className={cn(styles.slider, props.className)}
            dotsClass={cn(styles.dots, props.dotsClass)}
            ref={ref}
        >
            {props.children}
        </Slider>
    );
});

export default CustomSlider;