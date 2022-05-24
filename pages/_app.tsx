import {wrapper} from "../store/store";
import Head from "next/head";
import type { AppProps } from 'next/app'
import '../styles/reload.scss'
import '../styles/global.scss'
import {Component} from "react";
import {UserActionTypes} from "../types/user";
import {Api} from "../utils/api";

function App ({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>CNC Solutions</title>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App);

App.getInitialProps = wrapper.getInitialAppProps(
    (store) =>
        async ({ ctx, Component }) => {
            try {
                await Api(ctx).user.checkAuth();
                store.dispatch({type: UserActionTypes.LOGIN_USER, payload: true})
            } catch (e) {}

            return {
                pageProps: {
                    ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
                }
            };
        }
)