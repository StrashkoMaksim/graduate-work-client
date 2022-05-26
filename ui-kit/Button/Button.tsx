import React, {FC} from 'react';
import cn from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
    type: ButtonType,
    text: string,
    additionalClass: string,
    onClick?: () => void
}

export enum ButtonType {
    blue = 'blue',
    white = 'white',
    transparent = 'transparent',
    grey = 'grey'
}

const Button: FC<ButtonProps> = ({type, text, additionalClass, onClick}) => {
    return (
        <button className={cn(styles[type], additionalClass)} onClick={onClick}>{text}</button>
    );
};

export default Button;