import React from 'react';
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";

const ProductCreatePage = () => {
    const submitHandler = () => {

    }

    return (
        <AdminLayout title='Новый товар'>
            <PageHeaderWithBtns title='Новый товар'>
                <CustomButton variant={ButtonType.blue} text='Опубликовать' onClick={submitHandler} />
            </PageHeaderWithBtns>
            
        </AdminLayout>
    );
};

export default ProductCreatePage;