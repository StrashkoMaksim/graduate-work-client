import React, {FC, ReactNode} from 'react';
import styles from './BlockWithAside.module.scss'
import cn from "classnames";
import Aside from "../Aside/Aside";

interface BlockWithAsideProps {
    aside: ReactNode,
    content: ReactNode,
    className: string
}

const BlockWithAside: FC<BlockWithAsideProps> = ({ aside, content, className }) => {
    return (
        <div className={cn("section", styles.section, className)}>
            <div className={cn("container", styles.container)}>
                <Aside>{aside}</Aside>
                <div className={styles.content}>{content}</div>
            </div>
        </div>
    );
};

export default BlockWithAside;