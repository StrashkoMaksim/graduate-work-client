import {NextPageWithLayout} from "../_app";
import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import About from "../../components/About/About";
import Contacts from "../../components/Contacts/Contacts";
import styles from './index.module.scss'

const ContactsPage: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Контакты' />
            <PageHeader h1='Контакты' />
            <Contacts />
            <About className={styles.about} />
        </>
    );
};

ContactsPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Контакты',
            type: 'website',
            description: 'Какое-то описание для контактов'
        }}>
            {page}
        </MainLayout>
    )
}

export default ContactsPage;