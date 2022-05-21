import React from 'react';
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../../components/PageHeader/PageHeader";
import BlockWithAside from "../../../components/BlockWithAside/BlockWithAside";
import styles from './ArticlesPage.module.scss'
import ArticleAside from "../../../components/Aside/ArticleAside/ArticleAside";
import ArticlesList from "../../../components/ArticlesList/ArticlesList";

const ArticlesPage = () => {
    return (
        <>
            <Breadcrumbs
                links={[{link: '/', text: 'Главная'}]}
                current='Статьи'
            />
            <PageHeader h1="Статьи" />
            <BlockWithAside
                aside={
                    <ArticleAside />
                }
                content={
                    <ArticlesList />
                }
                className={styles.articlesBlock} />
        </>
    );
};

export default ArticlesPage;