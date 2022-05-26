import Head from "next/head";
import {FC, ReactNode, useEffect} from "react";
import Footer from "../Footer/Footer";
import styles from './AdminLayout.module.scss'
import Navigation, {NavigationLink} from "../Navigation/Navigation";
import cn from "classnames";
import {wrapper} from "../../store/store";
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";
import {loginUser} from "../../store/slices/user";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const links: NavigationLink[] = [
    {
        name: 'Баннеры',
        link: '/admin/banners'
    },
    {
        name: 'Статьи',
        link: '/admin/articles'
    },
    {
        name: 'Документы',
        link: '/admin/documents'
    },
    {
        name: 'Отзывы',
        link: '/admin/reviews'
    },
    {
        name: 'Товары',
        link: '/admin/products'
    },
    {
        name: 'Услуги',
        link: '/admin/services'
    },
    {
        name: 'Заявки',
        link: '/admin/crm'
    },
]

interface AdminLayoutProps {
    title: string;
    children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ title, children }) => {
    const { isAuth } = useTypedSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        if (!isAuth) {
            console.log(2)
            router.push('/login')
        }
    }, [isAuth])

    return (
        <>
            <Head>
                <title>{title} | CNC Solutions</title>
            </Head>
            <div className={styles.layout}>
                <header className={cn('section', styles.header)}>
                    <div className={cn('container', styles.container)}>
                        <Navigation links={links} isAdmin={true} />
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AdminLayout;