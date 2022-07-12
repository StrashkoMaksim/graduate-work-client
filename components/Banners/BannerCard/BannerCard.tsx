import {Banner} from "../../../types/banner";
import React, {FC, useCallback} from "react";
import {Skeleton} from "@mui/material";
import Link from "next/link";
import styles from './BannerCard.module.scss'

interface BannerCardProps {
    banner?: Banner;
    onLinkClickHandler?: (event: React.MouseEvent) => void;
    onEditClickHandler?: (banner: Banner) => void;
}

const BannerCard: FC<BannerCardProps> = ({ banner, onLinkClickHandler, onEditClickHandler }) => {
    if (banner) {
        const onEditClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            if (onEditClickHandler) {
                onEditClickHandler(banner);
            }
        }, [banner])

        return (
            <div className={styles.container}>
                <Link href={banner.link} key={banner.id}>
                    <a className={styles.link} onClick={onLinkClickHandler}>
                        <picture>
                            <source srcSet={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${banner.smallImage}`} media='(max-width: 768px)' />
                            <source srcSet={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${banner.mediumImage}`} media='(max-width: 1000px)' />
                            <img className={styles.image} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${banner.bigImage}`} alt={banner.name} />
                        </picture>
                    </a>
                </Link>
                {onEditClickHandler ? <button className={styles.edit} onClick={onEditClick} /> : ''}
            </div>
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