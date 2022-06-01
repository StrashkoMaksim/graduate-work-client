import styles from './PageHeaderWithBtns.module.scss'
import PageHeader from "../PageHeader";
import React, {FC, ReactNode} from "react";

interface PageHeaderWithBtnsProps {
    title: string;
    children: ReactNode;
}

const PageHeaderWithBtns: FC<PageHeaderWithBtnsProps> = ({ title, children }) => {
    return (
        <PageHeader h1={title} className={styles.header}>
            <div className={styles.btns}>
                {children}
            </div>
        </PageHeader>
    );
};

export default PageHeaderWithBtns;