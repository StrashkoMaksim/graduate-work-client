import React, {FC, useState} from 'react';
import styles from "./Navigation.module.scss";
import LogoImg from "../../public/img/logo.svg";
import Button, {ButtonType} from "../../ui-kit/Button/Button";
import cn from 'classnames'
import {ClickAwayListener} from "@mui/material";
import Link from "next/link";
import Image from 'next/image'

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
            <Link href='/'>
                <a className={styles.Logo}>
                    <Image src={LogoImg} alt="Логотип" />
                </a>
            </Link>
            <ClickAwayListener onClickAway={closeNavHandler}>
                <nav className={cn(styles.Nav, {[styles.active]: isOpen})}>
                    {links && links.map(link =>
                        <Link href={link.link} key={link.link}>
                            <a onClick={closeNavHandler}>{link.name}</a>
                        </Link>
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