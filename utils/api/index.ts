import {UserApi} from "./userApi";
import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";
import {ArticlesApi} from "./articlesApi";
import {FilesApi} from "./filesApi";
import {CategoriesApi} from "./categoriesApi";
import {ProductsApi} from "./productsApi";
import {BannersApi} from "./bannersApi";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>,
    articles: ReturnType<typeof ArticlesApi>,
    files: ReturnType<typeof FilesApi>,
    categories: ReturnType<typeof CategoriesApi>,
    products: ReturnType<typeof ProductsApi>,
    banners: ReturnType<typeof BannersApi>,
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.token;

    const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return {
        user: UserApi(instance),
        articles: ArticlesApi(instance),
        files: FilesApi(instance),
        categories: CategoriesApi(instance),
        products: ProductsApi(instance),
        banners: BannersApi(instance),
    }
}