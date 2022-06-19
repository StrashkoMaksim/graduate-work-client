import ServicesPage from "./index";
import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";

const ServicesSlugPage: NextPageWithLayout = () => {
    return (
        <ServicesPage />
    );
};

ServicesSlugPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Какой-то пункт',
            type: 'website',
            description: 'Какое-то описание для каталога'
        }}>
            {page}
        </MainLayout>
    )
}

export default ServicesSlugPage;