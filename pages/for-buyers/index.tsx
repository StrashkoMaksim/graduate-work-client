import React, {ReactElement} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Buyers from "../../components/Buyers/Buyers";

const BuyersPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Покупателям' />
            <PageHeader h1='Покупателям' />
            <Buyers />
        </>
    );
};

BuyersPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Покупателям',
            type: 'website',
            description: 'Какое-то описание для контактов'
        }}>
            {page}
        </MainLayout>
    )
}

export default BuyersPage;