import Banners from "../components/Banners/Banners";
import CategoriesPreviews from "../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../components/ReviewsPreviews/ReviewsPreviews";
import About from "../components/About/About";
import ArticlesBlock from "../components/Articles/ArticlesBlock/ArticlesBlock";
import VideosBlock from "../components/VideosBlock/VideosBlock";
import MapBlock from "../components/MapBlock/MapBlock";
import MainLayout from "../components/MainLayout/MainLayout";
import {GetStaticProps} from "next";
import {CategoryMain} from "../types/category";
import {Api} from "../utils/api";
import {ReactElement} from "react";
import {NextPageWithLayout} from "./_app";
import {Banner} from "../types/banner";
import {Review} from "../types/review";
import {ArticlePreview} from "../types/article";

interface MainPageProps {
    bannersFromServer: Banner[] | null;
    categoriesFromServer: CategoryMain[] | null;
    reviewsFromServer: Review[] | null;
    articlesFromServer: ArticlePreview[] | null;
}

const MainPage: NextPageWithLayout<MainPageProps> = ({ bannersFromServer, categoriesFromServer, reviewsFromServer, articlesFromServer }) => {
    return (
        <>
            <Banners bannersFromServer={bannersFromServer} />
            <CategoriesPreviews categoriesFromServer={categoriesFromServer} />
            <ReviewsPreviews reviewsFromServer={reviewsFromServer} />
            <About />
            <ArticlesBlock articlesFromServer={articlesFromServer} />
            {/*<VideosBlock />*/}
            <MapBlock />
        </>
    );
};

MainPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Главная',
            description: 'Пару слов о компании',
            type: 'website'
        }}>
            {page}
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const bannersFromServer = await Api().banners.getBanners();
        const categoriesFromServer = await Api().categories.getMainCategories();
        const reviewsFromServer = await Api().reviews.getReviews(8, 0);
        const articlesFromServer = await Api().articles.getArticles(8, 0, null);

        return {
            props: {
                bannersFromServer,
                categoriesFromServer,
                reviewsFromServer,
                articlesFromServer,
            },
            revalidate: 60,
        }
    } catch (e) {
        return  {
            props: {
                bannersFromServer: null,
                categoriesFromServer: null,
                reviewsFromServer: null,
                articlesFromServer: null,
            },
            revalidate: 60,
        }
    }
}

export default MainPage;
