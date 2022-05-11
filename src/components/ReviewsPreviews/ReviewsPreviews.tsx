import React, {FC} from 'react';
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import cn from "classnames";
import styles from './ReviewsPreviews.module.scss'
import Button, {ButtonType} from "../../ui-kit/Button/Button";
import {ReviewPreviewModel} from "../../types/review";
import ReviewPreview from "../ReviewPreview/ReviewPreview";
import CustomSlider from "../Slider/CustomSlider";

const reviews: ReviewPreviewModel[] = [
    {
        id: 1,
        text: 'Вообще огонь!!!',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        createdAt: '24.12.2021'
    },
    {
        id: 2,
        text: 'Вообще огонь!!!',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        createdAt: '24.12.2021'
    },
    {
        id: 3,
        text: 'Вообще огонь!!!',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        createdAt: '24.12.2021'
    },
    {
        id: 4,
        text: 'Вообще огонь!!!',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        createdAt: '24.12.2021'
    },{
        id: 5,
        text: 'Вообще огонь!!!',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        createdAt: '24.12.2021'
    },

]

const ReviewsPreviews: FC = () => {
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
                settings={{
                    arrows: true,
                    dots: true,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                }}
            >
                {reviews.length ? reviews.map(review =>
                    <>
                        <ReviewPreview key={review.id} review={review} />
                    </>

                )
                :
                <>
                    <ReviewPreview />
                    <ReviewPreview />
                    <ReviewPreview />
                </>
                }
            </CustomSlider>
            <div className={cn('flex-center', styles.addReview)}>
                <Button type={ButtonType.white} text='Оставить отзыв' additionalClass={styles.addBtn} />
            </div>
        </PreviewBlock>
    );
};

export default ReviewsPreviews;