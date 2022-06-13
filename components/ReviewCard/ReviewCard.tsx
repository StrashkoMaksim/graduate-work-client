import {Review} from "../../types/review";
import {FC, useEffect, useRef, useState} from "react";
import styles from './ReviewCard.module.scss'
import cn from "classnames";

interface ReviewProps {
    review?: Review;
}

const ReviewCard: FC<ReviewProps> = ({ review }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isArrowVisible, setIsArrowVisible] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const resizeHandler = () => {
            if (textRef.current && textRef.current.scrollHeight > 102) {
                setIsArrowVisible(true);
            } else {
                setIsArrowVisible(false);
            }
        }
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    })

    const clickHandler = () => {
        setIsOpened(!isOpened);
    }

    if (review) {
        return (
            <div className={styles.item}>
                <div className={styles.person}>
                    <span className={styles.surname}>{review.surname}</span>
                    <span className={styles.fullname}>{review.name}</span>
                    <span className={styles.date}>{review.createdAt}</span>
                </div>
                <div className={cn(styles.text, {[styles.withArrow]: isArrowVisible}, {[styles.active]: isOpened})}>
                    <p ref={textRef}>{review.text}</p>
                    <button onClick={clickHandler} />
                </div>
            </div>
        );
    } else {
        return (
            <div>

            </div>
        )
    }
};

export default ReviewCard;