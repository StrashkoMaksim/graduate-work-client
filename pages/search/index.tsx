import {NextPageWithLayout} from "../_app";
import {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import SearchPage from "../../components/SearchPage/SearchPage";


const SearchArticle: NextPageWithLayout = () => {
    return (
        <SearchPage />
    );
};

SearchArticle.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Поиск статьи',
            description: 'Поиск статьи на сайте',
            type: 'website'
        }}>
            {page}
        </MainLayout>
    )
}

export default SearchArticle;