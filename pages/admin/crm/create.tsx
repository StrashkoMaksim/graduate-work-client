import React, {ReactElement, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../_app";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import OrderEditor from "../../../components/OrderEditor/OrderEditor";
import {useRouter} from "next/router";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {InitialOrderEditingState, OrderEditing} from "../../../types/order";
import {hasErrors} from "../../../utils/validation/hasErrors";
import {Api} from "../../../utils/api";
import {exceptionsHandler} from "../../../utils/api/exceptions/exceptions";
import {useActions} from "../../../hooks/useActions";
import {validateNewOrder} from "../../../utils/validation/order";


const CreateOrderPage: NextPageWithLayout = () => {
    const router = useRouter()
    const [order, setOrder] = useState<OrderEditing>(InitialOrderEditingState);
    const [errors, setErrors] = useState<Errors>({});
    const {enqueueSnackbar} = useSnackbar();
    const {setEnableLoading, setDisableLoading} = useActions();

    const createClickHandler = async () => {
        setEnableLoading();
        const {errors, dto} = validateNewOrder(order);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            setDisableLoading();
            return;
        }

        try {
            await Api().orders.createOrder(dto);
            router.push('/admin/crm');
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
        setDisableLoading();
    }

    return (
        <>
            <PageHeaderWithBtns title='Новая заявка'>
                <CustomButton variant={ButtonType.blue} text='Добавить' onClick={createClickHandler} />
            </PageHeaderWithBtns>
            <OrderEditor order={order} setOrder={setOrder} errors={errors} />
        </>
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