import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import Catalog from "../../../components/Catalog/Catalog";
import PageHeader from "../../../components/PageHeader/PageHeader";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import cn from "classnames";
import Link from "next/link";
import styles from './index.module.scss'
import {useCallback, useState} from "react";
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";
import CategoriesManager from "../../../components/CategoriesManager/CategoriesManager";

const AdminCatalogPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModalHandler = useCallback(() => {
        setIsModalVisible(true);
    }, [])

    const hideModalHandler = useCallback(() => {
        setIsModalVisible(false);
    }, [])

    return (
        <AdminLayout title='Каталог товаров'>
            <PageHeader h1='Каталог' className={styles.header}>
                <div className={styles.btns}>
                    <CustomButton variant={ButtonType.grey} text='Менеджер категорий' additionalClass={cn(styles.btn, styles.whiteBtn)} onClick={showModalHandler} />
                    <Link href='/admin/products/create' >
                        <a className={styles.addLink}>
                            <CustomButton variant={ButtonType.blue} text='Добавить товар' additionalClass={cn(styles.btn, styles.blueBtn)} />
                        </a>
                    </Link>
                </div>
            </PageHeader>
            <Catalog isAdmin={true} />
            <CustomModal open={isModalVisible} onClose={hideModalHandler} title='Менеджер категорий'>
                <CategoriesManager />
            </CustomModal>
        </AdminLayout>
    );
};

export default AdminCatalogPage;