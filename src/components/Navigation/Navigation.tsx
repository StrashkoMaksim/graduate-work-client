import React, {FC} from 'react';
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";
import LogoImg from "../../assets/img/logo.svg";
import Button, {ButtonType} from "../Button/Button";

interface NavigationProps {
    isAdmin?: boolean;
    links?: NavigationLink[];
}

type NavigationLink = {
    name: string,
    link: string
}

const Navigation: FC<NavigationProps> = ({ isAdmin, links }) => {
    return (
        <div className={styles.Navigation}>
            <Link to={'/'} className={styles.Logo}>
                <img src={LogoImg} alt="Логотип"></img>
            </Link>
            <nav className={styles.Nav}>
                {links && links.map(link => <Link to={link.link}>{link.name}</Link>)}
            </nav>
            <div className={styles.Right}>
                {isAdmin ?
                    <div></div>
                    :
                    <Button type={ButtonType.blue} text={'Заказать звонок'} additionalClass={styles.BlueBtn} />
                }
                <button className={styles.Burger}>
                    <div className={styles.BurgerLine}></div>
                    <div className={styles.BurgerLine}></div>
                    <div className={styles.BurgerLine}></div>
                </button>
            </div>
        </div>
    );
};

export default Navigation;