import React, {useState} from 'react';
import styles from './Banners.module.scss'
import {Skeleton} from "@mui/material";
import cn from "classnames";
import {Banner} from "../../types/banner";
import Slider from "react-slick";
import Link from "next/link";

const banners: Banner[] = [
    {
        id: 1,
        link: 'http://cnc-solutions.ru/articles/sajt-zapustilsya',
        smallImage: '/img/banner_2_small.jpg',
        mediumImage: '/img/banner_2_middle.jpg',
        bigImage: '/img/banner_2.jpg',
    },
    {
        id: 2,
        link: 'http://cnc-solutions.ru/articles/sajt-zapustilsya',
        smallImage: '/img/banner_1_small.jpg',
        mediumImage: '/img/banner_1_middle.jpg',
        bigImage: '/img/banner_1.jpg',
    },
]

const Banners = () => {
    const [clickable, setClickable] = useState(true);
    const onSliderChange = () => {
        setClickable(true);
    };

    const onLinkClickHandler = (event: MouseEvent) => {
        if (!clickable) {
            event.preventDefault();
        }
    }

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
                        afterChange={onSliderChange}
                        beforeChange={() => setClickable(false)}
                    >
                        {banners.length ? banners.map(banner =>
                                <Link href={banner.link} key={banner.id}>
                                    <a className={styles.link} onClick={onLinkClickHandler}>
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