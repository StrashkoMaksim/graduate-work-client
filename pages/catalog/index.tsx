import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPage} from "next";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Catalog from "../../components/Catalog/Catalog";

const CatalogPage: NextPage = () => {
    return (
        <MainLayout
            meta={{
                title: 'Каталог',
                type: 'website',
                description: 'Какое-то описание для каталога'
            }}
        >
            <Breadcrumbs
                links={[
                    {link: '/', text: 'Главная'},
                ]}
                current='Каталог'
            />
            <PageHeader h1='Каталог' />
            <Catalog />
        </MainLayout>
    );
};

export default CatalogPage;