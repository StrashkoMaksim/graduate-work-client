import React, {FC, ReactNode} from "react";
import Header from "../Header/Header";
import styles from "./MainLayout.module.scss"
import Footer from "../Footer/Footer";
import Head from "next/head";
import {useRouter} from "next/router";

interface MainLayoutProps {
    meta: {
        title: string,
        description: string
        type: 'website' | 'article'
        date?: string
    }
    children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ meta, children }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{meta.title} | CNC Solutions</title>
                <meta name='description' content={meta.description} />
                <meta property='og:url' content={`${process.env.NEXT_PUBLIC_CLIENT_URL}${router.asPath}`} />
                <meta property='og:type' content={meta.type} />
                <meta property='og:site_name' content='CNC Solutions' />
                <meta property='og:description' content={meta.description} />
                <meta property='og:title' content={meta.title} />
                {meta.date && <meta property='article: published_time' content={meta.date} />}
            </Head>
            <div className={styles.MainLayout}>
                <Header />
                <main className={styles.MainLayout__Content}>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;