import {useRouter} from "next/router";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeader from "../../../components/PageHeader/PageHeader";

const ProductUpdatePage = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <AdminLayout title='Редактирование товара'>
            <PageHeader h1='Редактирование товара'></PageHeader>

        </AdminLayout>
    );
};

export default ProductUpdatePage;