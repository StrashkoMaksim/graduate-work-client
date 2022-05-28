import React, {FC} from 'react';
import styles from './ReviewPreview.module.scss'
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {ReviewPreviewModel} from "../../types/review";
import {Skeleton} from "@mui/material";

interface ReviewPreviewProps {
    review?: ReviewPreviewModel
}

const ReviewPreview: FC<ReviewPreviewProps> = ({ review }) => {

    if (review) {
        return (
            <div className={styles.card}>
                <h2 className={styles.name}>
                    <span className={styles.surname}>{review.surname}</span>
                    <span className={styles.lastname}>{review.name}</span>
                </h2>
                <span className={styles.date}>{review.createdAt}</span>
                <p className={styles.text}>{review.text}</p>
                <CustomButton variant={ButtonType.grey} text='Читать' additionalClass={styles.readBtn} />
            </div>
        )
    } else {
        return (
            <div className={styles.card}>
                <h2 className={styles.name}>
                    <Skeleton variant={"text"} animation={"wave"} className={styles.surnameSkeleton} />
                    <Skeleton variant={"text"} animation={"wave"} className={styles.nameSkeleton} />
                </h2>
                <Skeleton variant={"text"} animation={"wave"} className={styles.dateSkeleton} />
                <Skeleton variant={"text"} animation={"wave"} className={styles.textSkeleton} />
                <Skeleton variant={"text"} animation={"wave"} className={styles.textSkeleton} />
                <Skeleton variant={"text"} animation={"wave"} className={styles.textSkeleton} />
                <Skeleton variant={"text"} animation={"wave"} className={styles.textSkeleton} />
                <Skeleton variant={"rectangular"} animation={"wave"} className={styles.readBtnSkeleton} />
            </div>
        )
    }
};

export default ReviewPreview;