import React, {ReactElement} from 'react';
import AdminLayout from "../../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../../_app";
import PageHeaderWithBtns from "../../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../../ui-kit/CustomButton/CustomButton";
import OrderDetail from "../../../../components/OrderDetail/OrderDetail";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Link from "next/link";

interface OrderPageProps {
    id: string;
}

const OrderPage: NextPageWithLayout<OrderPageProps> = ({ id }) => {
    return (
        <>
            <PageHeaderWithBtns title={`Заявка №${id}`}>
                <Link href={`/admin/crm/order/update/${id}`}>
                    <a><CustomButton variant={ButtonType.grey} text='Редактировать' /></a>
                </Link>
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