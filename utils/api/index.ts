import {UserApi} from "./userApi";
import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";
import {ArticlesApi} from "./articlesApi";
import {FilesApi} from "./filesApi";
import {CategoriesApi} from "./categoriesApi";
import {ProductsApi} from "./productsApi";
import {BannersApi} from "./bannersApi";
import {ServicesApi} from "./servicesApi";
import {ReviewsApi} from "./reviewsApi";
import {SourcesApi} from "./sourcesApi";
import {StatusesApi} from "./statusesApi";
import {OrdersApi} from "./ordersApi";
import {CommentApi} from "./commentApi";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>,
    articles: ReturnType<typeof ArticlesApi>,
    files: ReturnType<typeof FilesApi>,
    categories: ReturnType<typeof CategoriesApi>,
    products: ReturnType<typeof ProductsApi>,
    banners: ReturnType<typeof BannersApi>,
    services: ReturnType<typeof ServicesApi>,
    reviews: ReturnType<typeof ReviewsApi>,
    sources: ReturnType<typeof SourcesApi>,
    statuses: ReturnType<typeof StatusesApi>,
    orders: ReturnType<typeof OrdersApi>,
    comments: ReturnType<typeof CommentApi>,
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
        services: ServicesApi(instance),
        reviews: ReviewsApi(instance),
        sources: SourcesApi(instance),
        statuses: StatusesApi(instance),
        orders: OrdersApi(instance),
        comments: CommentApi(instance),
    }
}