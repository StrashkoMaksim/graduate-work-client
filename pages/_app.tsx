import {wrapper} from "../store/store";
import Head from "next/head";
import type { AppProps } from 'next/app'
import '../styles/reload.scss'
import '../styles/global.scss'
import {Component} from "react";
import {Api} from "../utils/api";
import {loginUser} from "../store/slices/user";

function App ({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                {/*<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />*/}
                {/*<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />*/}
                {/*<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />*/}
                {/*<link rel="manifest" href="/site.webmanifest" />*/}
                {/*<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />*/}
                {/*<meta name="msapplication-TileColor" content="#da532c" />*/}
                {/*<meta name="theme-color" content="#ffffff" />*/}
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

App.getInitialProps = wrapper.getInitialAppProps(
    (store) =>
        async ({ ctx, Component }) => {
            try {
                await Api(ctx).user.checkAuth();
                store.dispatch(loginUser())
            } catch (e) {
                if (ctx.asPath?.startsWith('/admin')) {
                    ctx.res?.writeHead(302, { Location: '/login' })
                    ctx.res?.end()
                }
            }

            return {
                pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
            };
        }
)

export default wrapper.withRedux(App);