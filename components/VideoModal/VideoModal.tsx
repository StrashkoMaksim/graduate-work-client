import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {FC} from "react";
import styles from './VideoModal.module.scss'

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    link: string;
}

const VideoModal: FC<VideoModalProps> = ({ link, onClose, isOpen }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} isBigContent={true}>
            <iframe width="480" height="270" className={styles.iframe}
                    src={`${link}?from_block=partner&from=zen&autoplay=1&tv=0`}
                    allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media"
                    frameBorder="0" scrolling="no" allowFullScreen={true}
            />
        </CustomModal>
    );
};

export default VideoModal;