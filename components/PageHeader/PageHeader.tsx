import React, {FC, ReactNode} from 'react';
import styles from './PageHeader.module.scss'
import cn from "classnames";
import H1 from "../../ui-kit/H1/H1";

interface PageHeaderProps {
    h1?: string,
    children?: ReactNode,
    className?: string
}

const PageHeader: FC<PageHeaderProps> = ({ h1, className, children }) => {
    return (
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container, {[styles.additional]: children}, className)}>
                <H1 text={h1} />
                {children}
            </div>
        </div>
    );
};

export default PageHeader;