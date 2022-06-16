import React, {ReactElement, useState} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import styles from './index.module.scss';
import AsideConsultation from "../../components/AsideConsultation/AsideConsultation";
import {Video} from "../../types/video";
import VideosList from "../../components/VideosList/VideosList";

const videosFromServer: Video[] = [
    {
        id: 1,
        name: 'Как выбрать лазерный станок СО2 с ЧПУ по дереву (для резки и гравировки) — советы экспертов 2020 18+',
        link: 'https://www.youtube.com/embed/UkGO-QBKJEI',
        image: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg'
    },
    {
        id: 2,
        name: 'Бизнес в гараже на ЧПУ станке | Сними розовые очки, не допускай этих ошибок! | Бизнес с нуля',
        link: 'https://www.youtube.com/embed/SaWDsHfkLyI',
        image: 'https://i.ytimg.com/vi/SaWDsHfkLyI/hqdefault.jpg'
    },
    {
        id: 3,
        name: 'Лазерный станок с ЧПУ Wattsan 6090 LT (Ваттсан 6090 ЛТ), полный обзор и преимущества модели.',
        link: 'https://www.youtube.com/embed/P-BSOHgMTsA',
        image: 'https://i.ytimg.com/vi/P-BSOHgMTsA/sddefault.jpg'
    }
]

const VideosPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs
                links={[{link: '/', text: 'Главная'}]}
                current='Видео'
            />
            <PageHeader h1="Наши видео" />
            <BlockWithAside
                aside={
                    <>
                        <div>
                            <span className={styles.searchHeader}>Поиск видео</span>
                            <CustomTextField
                                placeholder='Название видео'
                                className={styles.search}
                            />
                        </div>
                        <AsideConsultation />
                    </>
                }
                content={<VideosList videosFromServer={videosFromServer} />}
            />
        </>
    );
};

VideosPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Видео',
            description: 'На этой странице собраны все видео с наших каналов Youtube, Rutube и Яндекс Дзен',
            type: 'website',
        }}>
            {page}
        </MainLayout>
    )
}

export default VideosPage;