import React, {ReactElement} from 'react';
import AdminLayout from "../../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../../_app";
import PageHeaderWithBtns from "../../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../../ui-kit/CustomButton/CustomButton";
import OrderDetail from "../../../../components/OrderDetail/OrderDetail";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

interface OrderPageProps {
    id: string;
}

const OrderPage: NextPageWithLayout<OrderPageProps> = ({ id }) => {
    return (
        <>
            <PageHeaderWithBtns title={`Заявка №${id}`}>
                <CustomButton variant={ButtonType.grey} text='Редактировать' />
            </PageHeaderWithBtns>
            <OrderDetail />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    return {
        props: {
            id: params?.id || null,
        },
    }
}

OrderPage.getLayout = function getLayout({id}: InferGetServerSidePropsType<typeof getServerSideProps>, page: ReactElement) {
    return (
        <AdminLayout title={`Заявка №${id}`}>
            {page}
        </AdminLayout>
    )
};

export default OrderPage;