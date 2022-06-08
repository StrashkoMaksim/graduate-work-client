import AdminCatalogPage from "./index";
import React, {ReactElement} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";

const AdminCatalogSlugPage: NextPageWithLayout = () => {
    return (
        <AdminCatalogPage />
    );
};

AdminCatalogSlugPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Каталог товаров'>
            {page}
        </AdminLayout>
    )
};

export default AdminCatalogSlugPage;