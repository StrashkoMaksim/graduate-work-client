import React from 'react';
import Banners from "../../../components/Banners/Banners";
import CategoriesPreviews from "../../../components/CategoriesPreviews/CategoriesPreviews";
import ReviewsPreviews from "../../../components/ReviewsPreviews/ReviewsPreviews";

const MainPage = () => {
    return (
        <>
            <Banners />
            <CategoriesPreviews />
            <ReviewsPreviews />
        </>
    );
};

export default MainPage;