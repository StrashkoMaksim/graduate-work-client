import Banners from "../components/Banners/Banners";
import CategoriesPreviews from "../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../components/ReviewsPreviews/ReviewsPreviews";
import About from "../components/About/About";
import ArticlesBlock from "../components/Articles/ArticlesBlock/ArticlesBlock";
import VideosBlock from "../components/VideosBlock/VideosBlock";
import MapBlock from "../components/MapBlock/MapBlock";
import MainLayout from "../components/MainLayout/MainLayout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {CategoryMain} from "../types/category";
import {Api} from "../utils/api";
import {ReactElement} from "react";
import {NextPageWithLayout} from "./_app";

interface MainPageProps {
    categoriesFromServer: CategoryMain[] | null;
}

const MainPage: NextPageWithLayout<MainPageProps> = ({ categoriesFromServer }) => {
    return (
        <>
            <Banners />
            <CategoriesPreviews categoriesFromServer={categoriesFromServer} />
            <ReviewsPreviews />
            <About />
            <ArticlesBlock />
            <VideosBlock />
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
        const categoriesFromServer = await Api().categories.getMainCategories();

        return {
            props: {
                categoriesFromServer,
            }
        }
    } catch (e) {
        return  {
            props: { categoriesFromServer: null }
        }
    }
}

export default MainPage;
