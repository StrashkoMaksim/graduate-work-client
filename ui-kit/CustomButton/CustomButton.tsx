import React, {FC} from 'react';
import cn from "classnames";
import styles from "./CustomButton.module.scss";

interface ButtonProps {
    variant: ButtonType,
    text: string,
    additionalClass: string,
    onClick?: () => void
    type?: 'submit' | 'button'
}

export enum ButtonType {
    blue = 'blue',
    white = 'white',
    transparent = 'transparent',
    grey = 'grey',
    red = 'red',
}

const CustomButton: FC<ButtonProps> = ({variant, text, additionalClass, onClick}) => {
    return (
        <button className={cn(styles.btn, styles[variant], additionalClass)} onClick={onClick}>{text}</button>
    );
};

export default CustomButton;