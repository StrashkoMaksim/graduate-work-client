import MainLayout from "../../components/MainLayout/MainLayout";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {Article} from "../../types/article";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ArticleDetail from "../../components/Articles/ArticleDetail/ArticleDetail";
import styles from './slug.module.scss'
import {wrapper} from "../../store/store";
import {endFetchArticlesCategories} from "../../store/slices/articles-categories";
import AsideLinks from "../../components/Aside/AsideLinks/AsideLinks";
import AsidePopper from "../../components/Aside/AsidePopper/AsidePopper";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface ArticlePageProps {
    article: Article;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
    const { categories, loading} = useTypedSelector(state => state.articlesCategories)

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
                    <AsidePopper>
                        <AsideLinks isLoading={loading} links={categories} entity='articles' selectedLinkId={undefined} />
                    </AsidePopper>
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
    console.log(1)
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