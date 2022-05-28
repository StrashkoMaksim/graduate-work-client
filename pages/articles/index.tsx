import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import ArticleAside from "../../components/Aside/ArticleAside/ArticleAside";
import ArticlesList from "../../components/Articles/ArticlesList/ArticlesList";
import MainLayout from "../../components/MainLayout/MainLayout";

const ArticlesPage = () => {
    return (
        <MainLayout meta={{
            title: 'Статьи',
            description: 'На нашем сайте размещено множество статей посвященных промышленным станкам и лазерам',
            type: 'website'
        }}>
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
            />
        </MainLayout>
    );
};

export default ArticlesPage;