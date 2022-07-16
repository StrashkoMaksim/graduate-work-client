import React, {ReactElement} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";
import AdminServicesPage from "./index";

const AdminServicesSlugPage: NextPageWithLayout = () => {
    return (
        <AdminServicesPage />
    );
};

AdminServicesSlugPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Сервис'>
            {page}
        </AdminLayout>
    )
};

export default AdminServicesSlugPage;