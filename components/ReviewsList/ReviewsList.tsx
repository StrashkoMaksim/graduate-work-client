import React, {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {Review} from "../../types/review";
import styles from './ReviewsList.module.scss'
import cn from "classnames";
import ReviewCard from "../ReviewCard/ReviewCard";
import {Api} from "../../utils/api";
import {useObserver} from "../../hooks/useObserver";

interface ReviewsListProps {
    reviewsFromServer: Review[] | null;
    isAdmin?: boolean;
    reload?: boolean;
}

const LIMIT = 8;

const ReviewsList: FC<ReviewsListProps> = ({ reviewsFromServer, isAdmin, reload }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const isCanLoadMore = useRef(true);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            if (isAdmin) {
                setReviews(await Api().reviews.getAdminReviews(LIMIT, 0));
            } else {
                setReviews(await Api().reviews.getReviews(LIMIT, 0));
            }
            setLoading(false);
        }
        if (reviewsFromServer) {
            setReviews(reviewsFromServer);
        } else {
            fetchReviews();
        }
    }, [reload])

    useObserver(lastProductRef as MutableRefObject<Element>, isCanLoadMore.current, loading, async () => {
        setLoading(true);
        const newReviews = isAdmin
            ? await Api().reviews.getAdminReviews(LIMIT, reviews.length)
            : await Api().reviews.getReviews(LIMIT, reviews.length);
        if (newReviews.length) {
            setReviews([...reviews, ...newReviews]);
        } else {
            isCanLoadMore.current = false;
        }
        setLoading(false);
    })

    return (
        <div className={cn('section', styles.section)}>
            <div className={cn('container', styles.container)}>
                {!isCanLoadMore.current && !reviews.length ? 'Отзывов нет в базе' : ''}
                {reviews.map(review =>
                    <ReviewCard review={review} key={review.id} isAdmin={isAdmin} />
                )}
                {loading ?
                    <>
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                    </>
                    : ''
                }
                <div ref={lastProductRef} />
            </div>
        </div>
    );
};

export default ReviewsList;