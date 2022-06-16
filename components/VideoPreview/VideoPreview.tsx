import React, {FC, useCallback, useState} from 'react';
import styles from './VideoPreview.module.scss'
import {Video} from "../../types/video";
import {Skeleton} from "@mui/material";
import VideoModal from "../VideoModal/VideoModal";
import cn from "classnames";

interface VideoPreviewProps {
    video?: Video;
    onClick?: () => boolean;
    inList?: boolean;
}

const VideoPreview: FC<VideoPreviewProps> = ({ video, onClick, inList }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onClickHandler = () => {
        if (video && onClick && onClick() || inList) {
            setIsModalVisible(true)
        }
    }

    const closeModalHandler = useCallback(() => {
        setIsModalVisible(false);
    }, [])

    if (video) {
        return (
            <div className={cn(styles.slide, {[styles.inList]: inList})}>
                <img src={video.image} alt={video.name} className={styles.preview} />
                <div className={styles.mount} onClick={onClickHandler}>
                    <svg viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.3" cx="53" cy="53" r="53" fill="#F3F5F7"/>
                        <path
                            d="M75.9502 49.0109C78.6169 50.5505 78.6169 54.3995 75.9502 55.9391L42.2377 75.403C39.571 76.9426 36.2377 75.0181 36.2377 71.9389L36.2377 33.0111C36.2377 29.9319 39.571 28.0074 42.2377 29.547L75.9502 49.0109Z"
                            fill="white"/>
                    </svg>
                    <div className={styles.info}>{video.name}</div>
                </div>
                <VideoModal isOpen={isModalVisible} onClose={closeModalHandler} link={video.link} />
            </div>
        )
    } else {
        return (
            <div className={cn(styles.slide, {[styles.inList]: inList})}>
                <Skeleton variant={"rectangular"} animation={"wave"} className={styles.skeleton} />
            </div>
        )
    }
};

export default VideoPreview;