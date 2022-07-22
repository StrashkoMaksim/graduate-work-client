import React, {ReactElement} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";


const CreateOrderPage: NextPageWithLayout = () => {
    return (
        <div>

        </div>
    );
};

CreateOrderPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Новая заявка'>
            {page}
        </AdminLayout>
    )
};

export default CreateOrderPage;