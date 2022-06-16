import React, {useState} from 'react';
import styles from './VideosBlock.module.scss'
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import CustomSlider from "../CustomSlider/CustomSlider";
import {Video} from "../../types/video";
import VideoPreview from "../VideoPreview/VideoPreview";

const videosMock: Video[] = [
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

const VideosBlock = () => {
    const [videos, setVideos] = useState(videosMock);
    const [clickable, setClickable] = useState(true);
    const onSliderChange = () => {
        setClickable(true);
    };

    const onVideoClickHandler = () => {
        if (clickable) {
            return true;
        } else  {
            return false;
        }
    }


    return (
        <PreviewBlock
            title='Наши видео'
            additionalClass={styles.block}
            allLink={{
                text: 'Все видео',
                link: '/videos'
            }}
        >
            <CustomSlider
                className={styles.slider}
                arrows={true}
                dots={true}
                slidesToScroll={1}
                slidesToShow={2}
                afterChange={onSliderChange}
                beforeChange={() => setClickable(false)}
                responsive={[
                    {
                        breakpoint: 960,
                        settings: {
                            arrows: false,
                            slidesToShow: 1,
                            variableWidth: true
                        }
                    }
                ]}
            >
                {videos.length ? videos.map(video =>
                    <VideoPreview video={video} key={video.id} onClick={onVideoClickHandler} />
                )
                :
                    <>
                        <VideoPreview />
                        <VideoPreview />
                    </>
                }
            </CustomSlider>
        </PreviewBlock>
    );
};

export default VideosBlock;