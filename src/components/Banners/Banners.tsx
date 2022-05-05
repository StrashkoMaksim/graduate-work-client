import React, {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import styles from './Banners.module.scss'
import {MobileStepper, Skeleton} from "@mui/material";
import {Link} from "react-router-dom";
import cn from "classnames";
import {Banner} from "../../types/banner";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
    const [activeBanner, setActiveBanner] = useState(0)

    const bannerChangeHandler = (step: number) => {
        setActiveBanner(step);
    }

    return (
        <div className={cn('section grey-bg', styles.banners)}>
            <div className={cn('container', styles.container)}>
                <div className={styles.wrapper}>
                    <AutoPlaySwipeableViews
                        index={activeBanner}
                        onChangeIndex={bannerChangeHandler}
                        enableMouseEvents
                        className={styles.slider}
                    >
                        {banners.length ? banners.map(banner =>
                                <Link className={styles.link} to={banner.link} key={banner.id}>
                                    <picture>
                                        <source srcSet={banner.smallImage} media='(max-width: 768px)'/>
                                        <source srcSet={banner.mediumImage} media='(max-width: 1000px)'/>
                                        <img className={styles.image} src={banner.bigImage} alt="Баннер 1"/>
                                    </picture>
                                </Link>
                            )
                            :
                            <Skeleton
                                variant={"rectangular"}
                                animation={'wave'}
                                className={styles.skeleton} />
                        }
                    </AutoPlaySwipeableViews>
                    <MobileStepper backButton={null}
                                   nextButton={null}
                                   steps={banners.length}
                                   activeStep={activeBanner}
                                   className={styles.dots}

                    />
                </div>
            </div>
        </div>
    );
};

export default Banners;