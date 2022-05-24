import {UserApi} from "./userApi";
import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>
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
        user: UserApi(instance)
    }
}