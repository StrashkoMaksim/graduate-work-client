import React, {FC} from "react";
import {Banner} from "../../../types/banner";
import styles from './BannersList.module.scss';
import cn from "classnames";
import BannerCard from "../BannerCard/BannerCard";

interface BannersListProps {
    banners: Banner[],
    loading: boolean,
    editBanner: (banner: Banner) => void;
}

const BannersList: FC<BannersListProps> = ({ banners, loading, editBanner }) => {
    return (
        <section className="section">
            <div className={cn('container', styles.container)}>
                {loading ?
                    <>
                        <BannerCard />
                        <BannerCard />
                        <BannerCard />
                    </>
                    : banners.length ? banners.map(banner =>
                        <BannerCard banner={banner} key={banner.id} onEditClickHandler={editBanner} />
                    )
                    : <p>Баннеров нет в базе</p>
                }
            </div>
        </section>
    );
};

export default BannersList;