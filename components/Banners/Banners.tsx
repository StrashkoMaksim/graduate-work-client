import React from 'react';
import styles from './Banners.module.scss'
import {Skeleton} from "@mui/material";
import cn from "classnames";
import {Banner} from "../../types/banner";
import Slider from "react-slick";
import Link from "next/link";

const banners: Banner[] = [
    {
        id: 1,
        link: '1',
        smallImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
        mediumImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
        bigImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
    },
    {
        id: 2,
        link: '2',
        smallImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
        mediumImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
        bigImage: 'https://lasercut.ru/assets/files/flamingo/akcii/sot5.jpg',
    },
]

const Banners = () => {
    return (
        <div className={cn('section grey-bg', styles.banners)}>
            <div className={cn('container', styles.container)}>
                <div className={styles.wrapper}>
                    <Slider
                        className={styles.slider}
                        dotsClass={styles.dots}
                        arrows={false}
                        dots={true}
                        autoplay={true}
                    >
                        {banners.length ? banners.map(banner =>
                                <Link href={`/${banner.link}`} key={banner.id}>
                                    <a className={styles.link}>
                                        <picture>
                                            <source srcSet={banner.smallImage} media='(max-width: 768px)'/>
                                            <source srcSet={banner.mediumImage} media='(max-width: 1000px)'/>
                                            <img className={styles.image} src={banner.bigImage} alt="Баннер 1"/>
                                        </picture>
                                    </a>
                                </Link>
                            )
                            :
                            <Skeleton
                                variant={"rectangular"}
                                animation={'wave'}
                                className={styles.skeleton} />
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banners;