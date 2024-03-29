import React, {FC, useCallback, useEffect, useState} from 'react';
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import cn from "classnames";
import styles from './ReviewsPreviews.module.scss'
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {Review} from "../../types/review";
import ReviewPreview from "../ReviewPreview/ReviewPreview";
import CustomSlider from "../CustomSlider/CustomSlider";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {Api} from "../../utils/api";

interface ReviewsPreviewsProps {
    reviewsFromServer: Review[] | null;
}

const ReviewsPreviews: FC<ReviewsPreviewsProps> = ({ reviewsFromServer }) => {
    const [reviews, setReviews] = useState<Review[]>(reviewsFromServer ||[]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedReview, setSelectedReview] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const reviews = await Api().reviews.getReviews(8, 0);
            setReviews(reviews);
            setLoading(false);
        }
        if (!reviewsFromServer) {
            fetchReviews();
        }
    }, [])

    const openAddModal = useCallback(() => {
        setIsAddModalVisible(true);
    }, [])

    const closeAddModal = useCallback(() => {
        setIsAddModalVisible(false);
    }, [])

    const openReadModal = (index: number) => () => {
        setSelectedReview(index);
    }

    const closeReadModal = useCallback(() => {
        setSelectedReview(null);
    }, [])

    return (
        <PreviewBlock
            title='Отзывы наших клиентов'
            allLink={{
                text: 'Все отзывы',
                link: '/reviews'
            }}
            additionalClass={cn('grey-bg', styles.reviews)}
        >
            <CustomSlider
                className={styles.slider}
                arrows={true}
                dots={true}
                variableWidth={true}
                responsive={[
                    {
                        breakpoint: 960,
                        settings: {
                            arrows: false
                        }
                    }
                ]}
            >
                {reviews.length
                    ? reviews.map((review, index) =>
                        <ReviewPreview key={review.id} review={review} onOpen={openReadModal(index)} />
                    )
                    : ''
                }
                {loading
                    ? [
                        <ReviewPreview key={1} />,
                        <ReviewPreview key={2} />,
                        <ReviewPreview key={3} />
                    ]
                    : ''
                }
            </CustomSlider>
            <div className={cn('flex-center', styles.addReview)}>
                <CustomButton
                    variant={ButtonType.white}
                    text='Оставить отзыв'
                    additionalClass={styles.addBtn}
                    onClick={openAddModal}
                />
            </div>
            <CustomModal isOpen={selectedReview !== null} onClose={closeReadModal}>
                {selectedReview !== null &&
                    <>
                        <span className={styles.surname}>{reviews[selectedReview].secondName}</span>
                        <span className={styles.name}>{reviews[selectedReview].firstName}</span>
                        <p className={styles.text}>{reviews[selectedReview].text}</p>
                    </>
                }
            </CustomModal>
            <AddReviewModal open={isAddModalVisible} onClose={closeAddModal} />
        </PreviewBlock>
    );
};

export default ReviewsPreviews;