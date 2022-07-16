import React, {ReactElement, useCallback, useEffect, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";
import CategoriesManager from "../../../components/CategoriesManager/CategoriesManager";
import ServicesWithAside from "../../../components/Services/ServicesWithAside/ServicesWithAside";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import {Service} from "../../../types/service";
import ServiceModal from "../../../components/Services/ServiceModal/ServiceModal";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

const AdminServicesPage: NextPageWithLayout = () => {
    const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(false);
    const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
    const [update, setUpdate] = useState(false);
    const { selectedService } = useTypedSelector(state => state.service)
    const { changeSelectedService } = useActions();

    const showCategoriesModalHandler = useCallback(() => {
        setIsCategoriesModalVisible(true);
    }, [])

    const hideCategoriesModalHandler = useCallback(() => {
        setIsCategoriesModalVisible(false);
    }, [])

    const showServiceModalHandler = useCallback(() => {
        setIsServiceModalVisible(true);
    }, [])

    const hideServiceModalHandler = useCallback((reload?: boolean) => {
        setIsServiceModalVisible(false);
        if (reload) {
            setUpdate((prevState => !prevState))
        }
        changeSelectedService(null);
    }, [])

    useEffect(() => {
        if (selectedService) {
            showServiceModalHandler();
        }
    }, [selectedService])

    return (
        <>
            <PageHeaderWithBtns title='Сервис'>
                <CustomButton variant={ButtonType.grey} text='Менеджер категорий' onClick={showCategoriesModalHandler} />
                <CustomButton variant={ButtonType.blue} text='Добавить услугу' onClick={showServiceModalHandler} />
            </PageHeaderWithBtns>
            <ServicesWithAside categoriesFromServer={null} servicesFromServer={null} isAdmin={true} update={update} />
            <CustomModal isOpen={isCategoriesModalVisible} onClose={hideCategoriesModalHandler} title='Менеджер категорий'>
                <CategoriesManager />
            </CustomModal>
            <CustomModal isOpen={isServiceModalVisible} onClose={hideServiceModalHandler} title='Новая услуга'>
                <ServiceModal selectedService={selectedService as Service} hideModal={hideServiceModalHandler} />
            </CustomModal>
        </>
    );
};

AdminServicesPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Сервис'>
            {page}
        </AdminLayout>
    )
};

export default AdminServicesPage;