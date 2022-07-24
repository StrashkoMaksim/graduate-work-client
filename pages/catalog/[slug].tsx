import CatalogPage from "./index";
import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";

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

export default CatalogSlugPage;