import React, {FC, useEffect, useState} from 'react';
import styles from './VideosList.module.scss'
import {Video} from "../../types/video";
import VideoPreview from "../VideoPreview/VideoPreview";

interface VideosListProps {
    videosFromServer: Video[] | null;
}

const VideosList: FC<VideosListProps> = ({ videosFromServer }) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        if (videosFromServer) {
            setVideos(videosFromServer);
        } else {
            // TODO: Подгрузить видео
        }
    }, [])

    return (
        <div className={styles.list}>
            {videos.map(video => <VideoPreview video={video} inList={true} /> )}
        </div>
    );
};

export default VideosList;