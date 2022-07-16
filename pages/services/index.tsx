import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesWithAside from "../../components/Services/ServicesWithAside/ServicesWithAside";

const breadcrumbs = [{link: '/', text: 'Главная'}]

const ServicesPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs links={breadcrumbs} current='Сервис' />
            <PageHeader h1='Сервис' />
            <ServicesWithAside categoriesFromServer={null} servicesFromServer={null} />
        </>
    );
};

ServicesPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Сервис',
            description: 'Что-то про сервис',
            type: 'website',
        }}>
            {page}
        </MainLayout>
    )
}

export default ServicesPage;