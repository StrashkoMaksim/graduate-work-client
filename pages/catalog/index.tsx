import MainLayout from "../../components/MainLayout/MainLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Catalog from "../../components/Catalog/Catalog";
import React, {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";
import {GetStaticProps} from "next";
import {Api} from "../../utils/api";

// TODO: Категории и товары от сервера

const breadcrumbs = [
    {link: '/', text: 'Главная'},
]

const CatalogPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs
                links={breadcrumbs}
                current='Каталог'
            />
            <PageHeader h1='Каталог' />
            <Catalog categoriesFromServer={null} productsFromServer={null} />
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

export const getStaticProps: GetStaticProps = async ({ params}) => {
    try {
        const products = await Api().products.getProducts(null, 8, 0);
        if (!products) {
            throw new Error();
        }
        return {
            props: { products },
            revalidate: 60,
        }
    } catch (e) {
        return { notFound: true }
    }
};


export default CatalogPage;