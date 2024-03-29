import {wrapper} from "../store/store";
import Head from "next/head";
import type { AppProps } from 'next/app'
import '../styles/reload.scss'
import '../styles/global.scss'
import {Component, ReactElement, ReactNode, useEffect} from "react";
import {Api} from "../utils/api";
import {loginUser} from "../store/slices/user";
import {SnackbarProvider} from "notistack";
import {NextPage} from "next";
import {Router} from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App ({ Component, pageProps }: AppPropsWithLayout) {
    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            const body = document.querySelector('body')
            if (body) {
                body.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
        });
    }, [])

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            autoHideDuration={3000}
        >
            <Head>
                <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            {Component.getLayout
                ? Component.getLayout(pageProps, <Component {...pageProps} />)
                : <Component {...pageProps} />
            }
        </SnackbarProvider>
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