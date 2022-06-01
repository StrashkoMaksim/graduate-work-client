import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import ArticlesList from "../../components/Articles/ArticlesList/ArticlesList";
import MainLayout from "../../components/MainLayout/MainLayout";
import {wrapper} from "../../store/store";
import {Api} from "../../utils/api";
import {endFetchArticlesCategories, errorArticlesCategories} from "../../store/slices/articles-categories";
import {changeArticlesCategory} from "../../store/actions/articles-categories";
import {ArticlePreview} from "../../types/article";
import {NextPage} from "next";
import AsidePopper from "../../components/Aside/AsidePopper/AsidePopper";
import AsideLinks from "../../components/Aside/AsideLinks/AsideLinks";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useRouter} from "next/router";

const LIMIT = 8

interface PageProps {
    articlesFromServer: ArticlePreview[];
}

const ArticlesPage: NextPage<PageProps> = ({ articlesFromServer }) => {
    const { categories, loading} = useTypedSelector(state => state.articlesCategories)
    const router = useRouter();
    const {category} = router.query;

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
                    <AsidePopper>
                        <AsideLinks isLoading={loading} links={categories} entity='articles' selectedLinkId={category as string | undefined} />
                    </AsidePopper>
                }
                content={
                    <ArticlesList limit={LIMIT} articlesFromServer={articlesFromServer} />
                }
            />
        </MainLayout>
    );
};

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, preview}) => {
    try {
        const response = await Api().articles.getCategories()
        store.dispatch(endFetchArticlesCategories(response))
        const filteredCategories = response.rows.filter(category => category.slug === query.category)
        const selectedCategory = filteredCategories.length ? filteredCategories[0].id : null
        store.dispatch(changeArticlesCategory(selectedCategory))
        const articles = await Api().articles.getArticles(LIMIT, 0, selectedCategory)
        return { props: { articlesFromServer: articles } }
    } catch (e) {
        errorArticlesCategories('Произошла ошибка при загрузке страницы')
    }
    return { props: { articlesFromServer: null } }
});

export default ArticlesPage;