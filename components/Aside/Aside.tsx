import React, {FC, ReactNode} from 'react';
import styles from './Aside.module.scss'

interface AsideProps {
    children: ReactNode
}

const Aside: FC<AsideProps> = ({ children }) => {
    return (
        <aside className={styles.aside}>
            {children}
        </aside>
    );
};

export default Aside;