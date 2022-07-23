import React, {FC} from "react";
import {Document} from "../../types/document";
import cn from "classnames";
import styles from "./DocumentItem.module.scss";

interface DocumentProps {
    isAdmin?: boolean;
    document: Document;
    onDelete: (id: number) => void;
}

const DocumentItem: FC<DocumentProps> = ({isAdmin, document, onDelete}) => {
    const deleteHandler = () => {
        onDelete(document.id)
    }

    return (
        <li className={cn(styles.document, {[styles.pdf]: document.type === 'file'}, {[styles.admin]: isAdmin})}>
            <a
                target="_blank"
                href={document.type === 'link'
                    ? document.link
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}/files/${document.link}`
                }
            >
                {document.name}
            </a>
            {isAdmin && <button className={styles.delete} onClick={deleteHandler} />}
        </li>
    );
};

export default DocumentItem;