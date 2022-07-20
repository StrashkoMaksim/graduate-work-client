import {Review} from "../../types/review";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import styles from './ReviewCard.module.scss';
import cn from 'classnames';
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useActions} from "../../hooks/useActions";

interface ReviewProps {
    review?: Review;
    isAdmin?: boolean;
}

const ReviewCard: FC<ReviewProps> = ({ review, isAdmin }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isArrowVisible, setIsArrowVisible] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const { changeSelectedReview } = useActions();

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

    const clickMoreHandler = () => {
        setIsOpened(!isOpened);
    }

    const clickEditHandler = useCallback(() => {
        changeSelectedReview(review as Review);
    }, [review])

    if (review) {
        return (
            <div className={styles.item}>
                <div className={styles.person}>
                    <span className={styles.surname}>{review.secondName}</span>
                    <span className={styles.fullname}>{review.firstName}</span>
                    <span className={styles.date}>{review.createdAt}</span>
                    {isAdmin
                        ? <>
                            <span className={styles.date}>{review.isAccepted ? 'Проверенный' : 'Непроверенный'}</span>
                            <CustomButton
                                variant={ButtonType.blue}
                                text='Редактировать'
                                additionalClass={styles.edit}
                                onClick={clickEditHandler}
                            />
                        </>: ''}
                </div>
                <div className={cn(styles.text, {[styles.withArrow]: isArrowVisible}, {[styles.active]: isOpened})}>
                    <p ref={textRef}>{review.text}</p>
                    <button className={styles.more} onClick={clickMoreHandler} />
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