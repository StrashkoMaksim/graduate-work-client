import {ReactElement, useCallback, useState} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import PageHeaderWithBtns from "../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import AddReviewModal from "../../components/AddReviewModal/AddReviewModal";

const Reviews: NextPageWithLayout = () => {
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
            <ReviewsList reviewsFromServer={null} />
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

export default Reviews;