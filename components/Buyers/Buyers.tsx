import styles from './Buyers.module.scss'
import cn from "classnames";
import {FC, useCallback, useEffect, useState} from "react";
import {Api} from "../../utils/api";
import {DocumentCategoryWithDocuments} from "../../types/document";
import DocumentItem from "../DocumentItem/DocumentItem";
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {Errors} from "../../types/errors";

interface BuyersProps {
    isAdmin?: boolean;
    reload?: boolean;
    documentsFromServer: DocumentCategoryWithDocuments[] | null;
}

const Buyers: FC<BuyersProps> = ({ isAdmin, reload, documentsFromServer }) => {
    const [documentsCategories, setDocumentsCategories] = useState<DocumentCategoryWithDocuments[]>(documentsFromServer || []);
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();

    const fetchDocuments = useCallback(async () => {
        const documents = await Api().documents.getDocuments();
        setDocumentsCategories(documents);
    }, []);

    useEffect(() => {
        if (!documentsFromServer) {
            fetchDocuments();
        }
    }, [reload])

    const deleteHandler = async (id: number) => {
        try {
            await Api().documents.deleteDocument(id);
            fetchDocuments();
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <div className='section'>
            <div className={cn('container', styles.container)}>
                {documentsCategories.map(category => category.documents.length ?
                    <div className={styles.wrapper} key={category.id}>
                        <h2 className={styles.header}>{category.name}</h2>
                        <div className={styles.grid}>
                            <ul className={styles.ul}>
                                {category.documents.map((document, index) =>
                                    index % 2 === 0 &&
                                    <DocumentItem key={document.id} document={document} isAdmin={isAdmin} onDelete={deleteHandler} />
                                )}
                            </ul>
                            <ul className={styles.ul}>
                                {category.documents.map((document, index) =>
                                    index % 2 === 1 &&
                                    <DocumentItem key={document.id} document={document} isAdmin={isAdmin} onDelete={deleteHandler} />
                                )}
                            </ul>
                        </div>
                    </div>
                    : ''
                )}
            </div>
        </div>
    );
};

export default Buyers;