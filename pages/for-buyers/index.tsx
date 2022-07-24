import React, {ReactElement} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Buyers from "../../components/Buyers/Buyers";
import {GetStaticProps} from "next";
import {Api} from "../../utils/api";
import {DocumentCategoryWithDocuments} from "../../types/document";

interface BuyersPageProps {
    documentsFromServer: DocumentCategoryWithDocuments[] | null
}

const BuyersPage: NextPageWithLayout<BuyersPageProps> = ({ documentsFromServer }) => {
    return (
        <>
            <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Покупателям' />
            <PageHeader h1='Покупателям' />
            <Buyers documentsFromServer={documentsFromServer} />
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const documentsFromServer = await Api().documents.getDocuments();

        return {
            props: { documentsFromServer },
            revalidate: 60,
        }
    } catch (e) {
        return  {
            props: { documentsFromServer: null },
            revalidate: 60,
        }
    }
}

export default BuyersPage;