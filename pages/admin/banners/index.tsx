import {NextPageWithLayout} from "../../_app";
import React, {ReactElement, useCallback, useEffect, useRef, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import cn from "classnames";
import PageHeader from "../../../components/PageHeader/PageHeader";
import styles from './index.module.scss'
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";
import {Banner} from "../../../types/banner";
import {Api} from "../../../utils/api";
import BannersList from "../../../components/Banners/BannersList/BannersList";
import BannerModal from "../../../components/Banners/BannerModal/BannerModal";

const AdminBannersPage: NextPageWithLayout = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<Banner | undefined>(undefined);
    const [update, setUpdate] = useState(false);

    const editBanner = (banner: Banner) => {
        setSelectedBanner(banner);
        setIsModalVisible(true);
    }

    const showModalHandler = useCallback(() => {
        setIsModalVisible(true);
    }, [])

    const hideModalHandler = useCallback((reload?: boolean) => {
        setSelectedBanner(undefined);
        setIsModalVisible(false);
        if (reload) {
            setUpdate(prevState => !prevState);
        }
    }, [update])

    useEffect(() => {
        const fetchBanners = async () => {
            setBanners(await Api().banners.getBanners())
            setLoading(false)
        }
        fetchBanners();
    }, [update])

    return (
        <>
            <PageHeader h1='Баннеры' className={styles.header}>
                <div className={styles.btns}>
                    <CustomButton
                        variant={ButtonType.blue}
                        text='Добавить баннер'
                        additionalClass={cn(styles.btn, styles.blueBtn)}
                        onClick={showModalHandler}
                    />
                </div>
            </PageHeader>
            <BannersList banners={banners} loading={loading} editBanner={editBanner} />
            <CustomModal
                isOpen={isModalVisible}
                onClose={hideModalHandler}
                title={selectedBanner ? 'Редактирование баннера' : 'Новый баннер'}
            >
                <BannerModal bannerForEditing={selectedBanner} hideModal={hideModalHandler} />
            </CustomModal>
        </>
    );
};

AdminBannersPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Баннеры'>
            {page}
        </AdminLayout>
    )
};

export default AdminBannersPage;