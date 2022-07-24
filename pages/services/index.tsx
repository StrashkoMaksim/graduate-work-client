import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesWithAside from "../../components/Services/ServicesWithAside/ServicesWithAside";
import {GetStaticProps} from "next";
import {Api} from "../../utils/api";
import {Service} from "../../types/service";
import {CategoryAside} from "../../types/category";

const breadcrumbs = [{link: '/', text: 'Главная'}]

interface ServicesPageProps {
    servicesFromServer: Service[] | null;
    categoriesFromServer: CategoryAside[] | null;
}

const ServicesPage: NextPageWithLayout<ServicesPageProps> = ({ servicesFromServer, categoriesFromServer }) => {
    return (
        <>
            <Breadcrumbs links={breadcrumbs} current='Сервис' />
            <PageHeader h1='Сервис' />
            <ServicesWithAside categoriesFromServer={categoriesFromServer} servicesFromServer={servicesFromServer} />
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const servicesFromServer = await Api().services.getServices(null, 10, 0);
        const categoriesFromServer = await Api().categories.getCategories();

        return {
            props: { servicesFromServer, categoriesFromServer },
            revalidate: 60,
        }
    } catch (e) {
        return  {
            props: { servicesFromServer: null, categoriesFromServer: null },
            revalidate: 60,
        }
    }
}

export default ServicesPage;