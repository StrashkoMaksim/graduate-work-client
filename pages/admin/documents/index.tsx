import React, {ReactElement, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import Buyers from "../../../components/Buyers/Buyers";
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";
import DocumentModal from "../../../components/DocumentModal/DocumentModal";

const AdminDocumentsPage: NextPageWithLayout = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reload, setReload] = useState(false);

    const openModalHandler = () => {
        setIsModalVisible(true);
    }

    const onModalClose = (reload?: boolean) => {
        setIsModalVisible(false);
        if (reload) {
            setReload(prevState => !prevState);
        }
    }

    return (
        <>
            <PageHeaderWithBtns title='Документы'>
                <CustomButton variant={ButtonType.blue} text='Добавить документ' onClick={openModalHandler} />
            </PageHeaderWithBtns>
            <Buyers isAdmin={true} reload={reload} />
            <CustomModal isOpen={isModalVisible} onClose={onModalClose} title='Добавить документ'>
                <DocumentModal onClose={onModalClose} />
            </CustomModal>
        </>
    );
};

AdminDocumentsPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Документы'>
            {page}
        </AdminLayout>
    )
};

export default AdminDocumentsPage;