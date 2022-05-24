import React, {FC, ReactElement} from 'react';
import cn from "classnames";
import styles from './PreviewBlock.module.scss'
import Link from "next/link";

interface PreviewBlockProps {
    title: string,
    allLink?: {
        text: string,
        link: string
    },
    additionalClass: string,
    children: ReactElement | ReactElement[]
}

const PreviewBlock: FC<PreviewBlockProps> = ({ allLink, title, additionalClass, children }) => {
    return (
        <div className={cn('section', additionalClass)}>
            <div className='container'>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    {allLink && <Link href={allLink.link}><a>{allLink.text}</a></Link>}
                </div>
                {children}
            </div>
        </div>
    );
};

export default PreviewBlock;