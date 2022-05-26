import styles from './CustomModal.module.scss'
import {FC, ReactNode} from "react";
import {Modal} from "@mui/material";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string
}

const CustomModal: FC<ModalProps> = ({ onClose, open, title, children }) => {
    return (
        <Modal open={open} onClose={onClose} className={styles.modal} disableScrollLock={true} >
            <div className={styles.body}>
                <button className={styles.close} onClick={onClose} />
                {title && <h3 className={styles.title}>{title}</h3>}
                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;