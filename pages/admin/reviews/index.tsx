import {NextPageWithLayout} from "../../_app";
import React, {ReactElement, useEffect, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ReviewsList from "../../../components/ReviewsList/ReviewsList";
import AddReviewModal from "../../../components/AddReviewModal/AddReviewModal";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const AdminReviewsPage: NextPageWithLayout = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [reload, setReload] = useState(false);
    const { changeSelectedReview } = useActions();
    const { selectedReview } = useTypedSelector(state => state.review);

    useEffect(() => {
        if (selectedReview) {
            setIsModalOpened(true);
        }
    }, [selectedReview])

    const onModalCloseHandler = (reload?: boolean) => {
        setIsModalOpened(false);
        changeSelectedReview(null);
        if (reload) {
            setReload(prevState => !prevState);
        }
    }

    return (
        <>
            <PageHeader h1='Отзывы' />
            <ReviewsList reviewsFromServer={null} isAdmin={true} reload={reload} />
            <AddReviewModal open={isModalOpened} onClose={onModalCloseHandler} />
        </>
    );
};

AdminReviewsPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Отзывы'>
            {page}
        </AdminLayout>
    )
};

export default AdminReviewsPage;