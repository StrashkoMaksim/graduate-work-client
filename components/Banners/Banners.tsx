import React, {FC, useEffect, useState} from 'react';
import styles from './Banners.module.scss';
import cn from "classnames";
import {Banner} from "../../types/banner";
import Slider from "react-slick";
import BannerCard from "./BannerCard/BannerCard";
import {Api} from "../../utils/api";

interface BannersProps {
    bannersFromServer: Banner[] | null;
}

const Banners: FC<BannersProps> = ({ bannersFromServer }) => {
    const [banners, setBanners] = useState<Banner[]>(bannersFromServer || []);
    const [loading, setLoading] = useState(false);
    const [clickable, setClickable] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
            setBanners(await Api().banners.getBanners());
            setLoading(false);
        }
        if (!bannersFromServer) {
            fetchBanners();
        }
    }, [])

    const onSliderChange = () => {
        setClickable(true);
    };

    const onLinkClickHandler = (event: React.MouseEvent) => {
        if (!clickable) {
            event.preventDefault();
        }
    }

    return (
        <div className={cn('section grey-bg', styles.banners, {[styles.empty]: (!loading && !banners.length)})}>
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
                        {loading
                            ? <BannerCard />
                            : banners.length ? banners.map(banner =>
                                <BannerCard banner={banner} onLinkClickHandler={onLinkClickHandler} key={banner.id} />
                            )
                            : ''
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banners;