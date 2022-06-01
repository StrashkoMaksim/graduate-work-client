import Banners from "../components/Banners/Banners";
import CategoriesPreviews from "../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../components/ReviewsPreviews/ReviewsPreviews";
import About from "../components/About/About";
import ArticlesBlock from "../components/Articles/ArticlesBlock/ArticlesBlock";
import VideosBlock from "../components/VideosBlock/VideosBlock";
import MapBlock from "../components/MapBlock/MapBlock";
import MainLayout from "../components/MainLayout/MainLayout";

const MainPage = () => {
    return (
        <MainLayout meta={{
            title: 'Главная',
            description: 'Пару слов о компании',
            type: 'website'
        }}>
            <Banners />
            <CategoriesPreviews />
            <ReviewsPreviews />
            <About />
            <ArticlesBlock />
            <VideosBlock />
            <MapBlock />
        </MainLayout>
    );
};

export default MainPage;
