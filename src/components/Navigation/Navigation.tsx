import React, {FC, useState} from 'react';
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";
import LogoImg from "../../assets/img/logo.svg";
import Button, {ButtonType} from "../../ui-kit/Button/Button";
import cn from 'classnames'
import {ClickAwayListener} from "@mui/material";

interface NavigationProps {
    isAdmin?: boolean;
    links?: NavigationLink[];
}

type NavigationLink = {
    name: string,
    link: string
}

const Navigation: FC<NavigationProps> = ({ isAdmin, links }) => {
    const [isOpen, setIsOpen] = useState(false)

    const navToggleHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsOpen(!isOpen)
    }

    const closeNavHandler = () => {
        setIsOpen(false)
    }

    return (
        <div className={styles.Navigation}>
            <Link to={'/'} className={styles.Logo}>
                <img src={LogoImg} alt="Логотип"></img>
            </Link>
            <ClickAwayListener onClickAway={closeNavHandler}>
                <nav className={cn(styles.Nav, {[styles.active]: isOpen})}>
                    {links && links.map(link =>
                        <Link to={link.link} key={link.link} onClick={closeNavHandler}>{link.name}</Link>
                    )}
                </nav>
            </ClickAwayListener>
            <div className={styles.Right}>
                {isAdmin ?
                    <div></div>
                    :
                    <Button type={ButtonType.blue} text={'Заказать звонок'} additionalClass={styles.BlueBtn} />
                }
                <button className={cn(styles.Burger, {[styles.active]: isOpen})} onClick={navToggleHandler}>
                    <div className={styles.BurgerLine}></div>
                    <div className={styles.BurgerLine}></div>
                    <div className={styles.BurgerLine}></div>
                </button>
            </div>
        </div>
    );
};

export default Navigation;