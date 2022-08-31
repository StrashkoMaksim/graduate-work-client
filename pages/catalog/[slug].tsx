import CatalogPage from "./index";
import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";

const CatalogSlugPage: NextPageWithLayout = () => {
    return (
        <CatalogPage categoriesFromServer={null} productsFromServer={null} />
    );
};

CatalogSlugPage.getLayout = function getLayout(props, page: ReactElement) {
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

export const getServerSideProps: GetServerSideProps = async ({ query, params}) => {
    try {
        const categoriesFromServer = await Api().categories.getCategories();

        const selectedCategory = categoriesFromServer.find((el) => el.slug === params?.slug)
        if (!selectedCategory) return {notFound: true}

        const productsFromServer = await Api().products.getProducts(selectedCategory.id, 12, 0, query.q as string);

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

export default CatalogSlugPage;