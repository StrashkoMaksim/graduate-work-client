import React, {useState} from 'react';
import styles from './Banners.module.scss';
import cn from "classnames";
import {Banner} from "../../types/banner";
import Slider from "react-slick";
import BannerCard from "./BannerCard/BannerCard";

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

    const onLinkClickHandler = (event: React.MouseEvent) => {
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
                            <BannerCard banner={banner} onLinkClickHandler={onLinkClickHandler} key={banner.id} />
                            ) : <BannerCard />
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banners;