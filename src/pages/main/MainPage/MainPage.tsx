import React from 'react';
import Banners from "../../../components/Banners/Banners";
import CategoriesPreviews from "../../../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../../../components/ReviewsPreviews/ReviewsPreviews";
import About from "../../../components/About/About";

const MainPage = () => {
    return (
        <>
            <Banners />
            <CategoriesPreviews />
            <ReviewsPreviews />
            <About />
        </>
    );
};

export default MainPage;