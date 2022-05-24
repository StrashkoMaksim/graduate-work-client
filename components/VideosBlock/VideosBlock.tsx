import React, {useState} from 'react';
import styles from './VideosBlock.module.scss'
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import CustomSlider from "../CustomSlider/CustomSlider";
import {Video} from "../../types/video";
import VideoPreview from "../VideoPreview/VideoPreview";

const videosMock: Video[] = [
    {
        id: 1,
        name: 'Название видео',
        link: 'youtube.com',
        image: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg'
    },
    {
        id: 2,
        name: 'Название видео',
        link: 'youtube.com',
        image: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg'
    },
    {
        id: 3,
        name: 'Название видео',
        link: 'youtube.com',
        image: 'https://i.ytimg.com/vi/UkGO-QBKJEI/maxresdefault.jpg'
    }
]

const VideosBlock = () => {
    const [videos, setVideos] = useState(videosMock)

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
                settings={{
                    arrows: true,
                    dots: true,
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                arrows: false,
                                slidesToShow: 1,
                                variableWidth: true
                            }
                        }
                    ]
                }}
            >
                {videos.length ? videos.map(video =>
                    <VideoPreview video={video} key={video.id} />
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