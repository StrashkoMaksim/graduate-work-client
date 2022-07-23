import React, {ReactElement, useEffect, useState} from "react";
import AdminLayout from "../../../../../components/AdminLayout/AdminLayout";
import {NextPageWithLayout} from "../../../../_app";
import PageHeaderWithBtns from "../../../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../../../ui-kit/CustomButton/CustomButton";
import OrderEditor from "../../../../../components/OrderEditor/OrderEditor";
import {useRouter} from "next/router";
import {InitialOrderEditingState, OrderEditing} from "../../../../../types/order";
import {Errors} from "../../../../../types/errors";
import {useSnackbar} from "notistack";
import {useActions} from "../../../../../hooks/useActions";
import {validateChangedOrder, validateNewOrder} from "../../../../../utils/validation/order";
import {hasErrors} from "../../../../../utils/validation/hasErrors";
import {Api} from "../../../../../utils/api";
import {exceptionsHandler} from "../../../../../utils/api/exceptions/exceptions";

const OrderUpdatePage: NextPageWithLayout = () => {
    const router = useRouter()
    const [order, setOrder] = useState<OrderEditing>(InitialOrderEditingState);
    const [errors, setErrors] = useState<Errors>({});
    const {enqueueSnackbar} = useSnackbar();
    const {setEnableLoading, setDisableLoading} = useActions();
    const { id } = router.query;

    useEffect(() => {
        const fetchOrder = async () => {
            setEnableLoading();
            try {
                const fetchedOrder = await Api().orders.getOrder(Number(id));
                const cart = fetchedOrder.cart.map(item => {
                    return {
                        ...item,
                        price: String(item.price),
                    }
                })
                setOrder({
                    id: Number(id),
                    fio: {
                        value: fetchedOrder.fio,
                        isChanged: false,
                    },
                    phone: {
                        value: fetchedOrder.phone,
                        isChanged: false,
                    },
                    source: {
                        value: fetchedOrder.source.id,
                        isChanged: false,
                    },
                    status: {
                        value: fetchedOrder.status.id,
                        isChanged: false,
                    },
                    cart: {
                        value: cart,
                        isChanged: false,
                    },
                });
            } catch (e) {
                exceptionsHandler(e, router, setErrors, enqueueSnackbar);
            }
            setDisableLoading();
        }
        fetchOrder();
    }, [])

    const updateClickHandler = async () => {
        setEnableLoading();
        const {errors, dto} = validateChangedOrder(order);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            setDisableLoading();
            return;
        }

        try {
            await Api().orders.updateOrder(order.id as number, dto);
            router.push(`/admin/crm/order/${id}`);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
        setDisableLoading();
    }

    return (
        <>
            <PageHeaderWithBtns title='Редактирование заявки'>
                <CustomButton variant={ButtonType.blue} text='Сохранить' onClick={updateClickHandler} />
            </PageHeaderWithBtns>
            <OrderEditor order={order} setOrder={setOrder} errors={errors} />
        </>
    );
};

OrderUpdatePage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Редактирование заявки'>
            {page}
        </AdminLayout>
    )
};

export default OrderUpdatePage;