import React, {useEffect} from 'react';
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PageHeader from "../PageHeader/PageHeader";
import {useRouter} from "next/router";
import BlockWithAside from "../BlockWithAside/BlockWithAside";
import ArticlesList from "../Articles/ArticlesList/ArticlesList";
import {useActions} from "../../hooks/useActions";
import ProductsListContainer from "../ProductsList/ProductsListContainer/ProductsListContainer";
import SearchAside from "../SearchAside/SearchAside";

const breadcrumbs = [
    {
        link: '/',
        text: 'Главная'
    }
]

const SearchPage = () => {
    const {changeArticlesCategory} = useActions();
    const router = useRouter();

    useEffect(() => {
        changeArticlesCategory(null);
    }, [router.query.q])

    return (
        <>
            <Breadcrumbs links={breadcrumbs} current={'Поиск'} />
            <PageHeader h1={'Результаты поиска' + (router.query.q ? ` по запросу "${router.query.q}"` : '')} />
            <BlockWithAside
                aside={ <SearchAside /> }
                content={router.query.category === 'catalog'
                    ? <ProductsListContainer productsFromServer={null} isAdmin={false} />
                    : <ArticlesList articlesFromServer={null} limit={8} search={router.query.q as string | undefined} />
                }
            />
        </>
    );
};

export default SearchPage;