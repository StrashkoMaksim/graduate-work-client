import MainLayout from "../../components/MainLayout/MainLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Catalog from "../../components/Catalog/Catalog";
import React, {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

// TODO: Категории и товары от сервера

const CatalogPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs
                links={[
                    {link: '/', text: 'Главная'},
                ]}
                current='Каталог'
            />
            <PageHeader h1='Каталог' />
            <Catalog />
        </>
    );
};

CatalogPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Каталог',
            type: 'website',
            description: 'Какое-то описание для каталога'
        }}>
            {page}
        </MainLayout>
    )
}

export default CatalogPage;