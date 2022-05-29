import MainLayout from "../../components/MainLayout/MainLayout";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {Article} from "../../types/article";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import ArticleAside from "../../components/Aside/ArticleAside/ArticleAside";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ArticleDetail from "../../components/Articles/ArticleDetail/ArticleDetail";
import styles from './slug.module.scss'
import {wrapper} from "../../store/store";
import {endFetchArticlesCategories} from "../../store/slices/articles-categories";

interface ArticlePageProps {
    article: Article;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
    return (
        <MainLayout
            meta={{
                type: "article",
                description: article.previewText,
                title: article.name,
                date: article.createdAt
            }}
        >
            <Breadcrumbs
                links={[{link: '/', text: 'Главная'}, {link: '/articles', text: 'Статьи'}]}
                current={article.name}
            />
            <BlockWithAside
                aside={
                    <ArticleAside/>
                }
                content={
                    <ArticleDetail article={article} />
                }
                className={styles.container}
            />
        </MainLayout>
    );
};

// @ts-ignore
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async ({ params, res}) => {
    try {
        const categories = await Api().articles.getCategories()
        store.dispatch(endFetchArticlesCategories(categories))
        const article = await Api().articles.getArticleBySlug(params?.slug as string)
        if (!article) {
            throw new Error();
        }
        return {
            props: { article },
            revalidate: 60,
        }
    } catch (e) {
        return { notFound: true }
    }
});

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await Api().articles.getAllSlugs();
    const paths = articles.map((article) => ({
        params: { slug: article.slug },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}

export default ArticlePage;