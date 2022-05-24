import React, {FC, ReactNode} from "react";
import Header from "../Header/Header";
import styles from "./MainLayout.module.scss"
import Footer from "../Footer/Footer";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.MainLayout}>
            <Header />
            <main className={styles.MainLayout__Content}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;