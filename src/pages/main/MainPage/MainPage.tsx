import React from 'react';
import Banners from "../../../components/Banners/Banners";
import CategoriesPreviews from "../../../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../../../components/ReviewsPreviews/ReviewsPreviews";
import About from "../../../components/About/About";
import ArticlesBlock from "../../../components/ArticlesBlock/ArticlesBlock";
import VideosBlock from "../../../components/VideosBlock/VideosBlock";
import MapBlock from "../../../components/MapBlock/MapBlock";

const MainPage = () => {
    return (
        <>
            <Banners />
            <CategoriesPreviews />
            <ReviewsPreviews />
            <About />
            <ArticlesBlock />
            <VideosBlock />
            <MapBlock />
        </>
    );
};

export default MainPage;