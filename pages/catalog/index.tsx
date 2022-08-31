import MainLayout from "../../components/MainLayout/MainLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Catalog from "../../components/Catalog/Catalog";
import React, {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";
import {GetServerSideProps, GetStaticProps} from "next";
import {Api} from "../../utils/api";
import {ProductPreviewModel} from "../../types/product";
import {CategoryAside} from "../../types/category";

const breadcrumbs = [
    {link: '/', text: 'Главная'},
]

interface CatalogPageProps {
    productsFromServer: ProductPreviewModel[] | null;
    categoriesFromServer: CategoryAside[] | null;
}

const CatalogPage: NextPageWithLayout<CatalogPageProps> = ({ productsFromServer, categoriesFromServer }) => {

    return (
        <>
            <Breadcrumbs
                links={breadcrumbs}
                current='Каталог'
            />
            <PageHeader h1='Каталог' />
            <Catalog categoriesFromServer={categoriesFromServer} productsFromServer={productsFromServer} />
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

export const getServerSideProps: GetServerSideProps = async ({ query}) => {
    try {
        const productsFromServer = await Api().products.getProducts(null, 12, 0, query.q as string);
        const categoriesFromServer = await Api().categories.getCategories();

        if (!productsFromServer) {
            throw new Error();
        }
        return {
            props: { productsFromServer, categoriesFromServer },
        }
    } catch (e) {
        return { notFound: true }
    }
};


export default CatalogPage;