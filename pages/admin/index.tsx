import AdminLayout from "../../components/AdminLayout/AdminLayout";
import {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

const AdminPage: NextPageWithLayout = () => {
    return (
        <h1>Админка</h1>
    );
};

AdminPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Главная'>
            {page}
        </AdminLayout>
    )
}

export default AdminPage;