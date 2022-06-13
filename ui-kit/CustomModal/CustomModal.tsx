import styles from './CustomModal.module.scss'
import {FC, ReactNode} from "react";
import {Modal} from "@mui/material";
import cn from "classnames";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    isBigContent?: boolean;
    title?: string
}

const CustomModal: FC<ModalProps> = ({ onClose, isOpen, title, isBigContent, children }) => {
    return (
        <Modal open={isOpen} onClose={onClose} className={styles.modal} >
            <div className={cn(styles.body, {[styles.bigContent]: isBigContent})}>
                <button className={styles.close} onClick={onClose} />
                {title && <h3 className={styles.title}>{title}</h3>}
                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;