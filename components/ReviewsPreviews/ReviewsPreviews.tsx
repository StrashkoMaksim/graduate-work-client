import React, {FC, useCallback, useState} from 'react';
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import cn from "classnames";
import styles from './ReviewsPreviews.module.scss'
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {Review} from "../../types/review";
import ReviewPreview from "../ReviewPreview/ReviewPreview";
import CustomSlider from "../CustomSlider/CustomSlider";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import CustomModal from "../../ui-kit/CustomModal/CustomModal";

const reviews: Review[] = [
    {
        id: 1,
        text: 'В оговоренный срок доставили лазерный гравер 0503 ваттсан. дали на год гарантию от производителя. хорошо, что есть оплата заказов с ндс для юридических лиц, я брал от организации, платил со счета на счет по реквизитам. доставка прошла без проблем, получили станок в рабочем состоянии, документы прилагались.',
        surname: 'Толмачев',
        name: 'Максим Сергеевич',
        accepted: true,
        createdAt: '24.05.2022',
    },
    {
        id: 2,
        text: 'Прежде, чем решиться на покупку дорогостоящего станка, я получил исчерпывающие консультации представителей продавца. Взвесил все за и против и оформил заказ на станок с ЧПУ А1 6090. Приятно, что продавец сдержал все данные обещания. Мне помогли не только с доставкой, но и с настройкой купленного оборудования. Огромное спасибо за такое обслуживание, всем советую.',
        surname: 'Страшко',
        name: 'Максим Тарасович',
        accepted: true,
        createdAt: '20.05.2022',
    },
    {
        id: 3,
        text: 'Очень доволен приобретенным лазерным станком 0503 Ваттсан. Заявку оформлял на сайте самостоятельно. Заказ обработали оперативно, перезвонили почти сразу же, уточнили детали по доставке и оплате, привезли в обещанный срок. Рекомендую. ',
        surname: 'Дуда',
        name: 'Дмитрий Евгеньевич',
        accepted: true,
        createdAt: '17.05.2022',
    },
    {
        id: 4,
        text: 'Заказывал лазерный станок 6040 Ваттсан. Мне показалось, что они предлагают самую выгодную цену. Обслужили меня очень хорошо - организовали удобную доставку, правильно заполнили документы на станок. ',
        surname: 'Костров',
        name: 'Дмитрий Максимович',
        accepted: true,
        createdAt: '15.04.2022',
    },
    {
        id: 5,
        text: 'При выборе лазерного станка получил ценную консультацию специалиста по телефону. При организации доставки учли мои пожелания по времени. Цены устроили.',
        surname: 'Петров',
        name: 'Игнат Игоревич',
        accepted: true,
        createdAt: '10.04.2022',
    },
    {
        id: 6,
        text: 'Мой муж занимается мелкой сувенирной продукцией из дерева. Он долго решался на приобретение станка. Зайдя на сайт магазина муж заказал лазерный станок, гравер для изготовления сувениров. Доставили оперативно. Станок просто отличный. Дефектов и недостатков не выявлено.',
        surname: 'Ежеля',
        name: 'Анастасия Святославовна',
        accepted: true,
        createdAt: '04.04.2022',
    },
]

const ReviewsPreviews: FC = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedReview, setSelectedReview] = useState<number | null>(null);

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
                {reviews.length ? reviews.map((review, index) =>
                    <ReviewPreview key={review.id} review={review} onOpen={openReadModal(index)} />

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
                        <span className={styles.surname}>{reviews[selectedReview].surname}</span>
                        <span className={styles.name}>{reviews[selectedReview].name}</span>
                        <p className={styles.text}>{reviews[selectedReview].text}</p>
                    </>
                }
            </CustomModal>
            <AddReviewModal open={isAddModalVisible} onClose={closeAddModal} />
        </PreviewBlock>
    );
};

export default ReviewsPreviews;