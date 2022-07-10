import {Banner} from "../../../types/banner";
import React, {FC} from "react";
import {Skeleton} from "@mui/material";
import Link from "next/link";
import styles from './BannerCard.module.scss'

interface BannerCardProps {
    banner?: Banner;
    onLinkClickHandler?: (event: React.MouseEvent) => void;
}

const BannerCard: FC<BannerCardProps> = ({ banner, onLinkClickHandler }) => {
    if (banner) {
        return (
            <Link href={banner.link} key={banner.id}>
                <a className={styles.link} onClick={onLinkClickHandler}>
                    <picture>
                        <source srcSet={banner.smallImage} media='(max-width: 768px)'/>
                        <source srcSet={banner.mediumImage} media='(max-width: 1000px)'/>
                        <img className={styles.image} src={banner.bigImage} alt="Баннер 1"/>
                    </picture>
                </a>
            </Link>
        );
    } else {
        return (
            <Skeleton
                variant={"rectangular"}
                animation={'wave'}
                className={styles.skeleton}
            />
        );
    }
};

export default BannerCard;