import {ReactElement, useCallback, useState} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import PageHeaderWithBtns from "../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import AddReviewModal from "../../components/AddReviewModal/AddReviewModal";
import {Review} from "../../types/review";
import {GetStaticProps} from "next";
import {Api} from "../../utils/api";

interface ReviewsProps {
    reviewsFromServer: Review[] | null;
}

const Reviews: NextPageWithLayout<ReviewsProps> = ({ reviewsFromServer }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = useCallback(() => {
        setIsModalVisible(true);
    }, [])

    const closeModal = useCallback(() => {
        setIsModalVisible(false);
    }, [])

    return (
        <>
            <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Отзывы' />
            <PageHeaderWithBtns title='Отзывы'>
                <CustomButton variant={ButtonType.blue} text='Оставить отзыв' onClick={openModal} />
            </PageHeaderWithBtns>
            <ReviewsList reviewsFromServer={reviewsFromServer} />
            <AddReviewModal open={isModalVisible} onClose={closeModal} />
        </>
    );
};

Reviews.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Отзывы',
            description: 'Что-то об отзывах',
            type: 'website'
        }}>
            {page}
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const reviewsFromServer = await Api().reviews.getReviews(8, 0);

        return {
            props: { reviewsFromServer },
            revalidate: 60,
        }
    } catch (e) {
        return  {
            props: { reviewsFromServer: null },
            revalidate: 60,
        }
    }
}

export default Reviews;