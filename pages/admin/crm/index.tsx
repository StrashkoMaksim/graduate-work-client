import React, {ReactElement} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import OrdersList from "../../../components/OrdersList/OrdersList";
import Link from "next/link";

const CRMPage: NextPageWithLayout = () => {
    return (
        <>
            <PageHeaderWithBtns title='Заявки'>
                {/*<CustomButton variant={ButtonType.grey} text='Менеджер источников' />*/}
                <Link href='/admin/crm/create'>
                    <a>
                        <CustomButton variant={ButtonType.blue} text='Добавить заявку' />
                    </a>
                </Link>
            </PageHeaderWithBtns>
            <OrdersList />
        </>
    );
};

CRMPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Заявки'>
            {page}
        </AdminLayout>
    )
};

export default CRMPage;