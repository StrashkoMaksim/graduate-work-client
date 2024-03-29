import {useRouter} from "next/router";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import EditProductForm from "../../../components/EditProductForm/EditProductForm";
import React, {ReactElement, useEffect, useState} from "react";
import {InitialProductEditing, ProductEditing} from "../../../types/product";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {validateChangedProduct} from "../../../utils/validation/product";
import {Api} from "../../../utils/api";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import {useActions} from "../../../hooks/useActions";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import {NextPageWithLayout} from "../../_app";

const ProductUpdatePage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [product, setProduct] = useState<ProductEditing>(InitialProductEditing);
    const [errors, setErrors] = useState<Errors>({});
    const {enqueueSnackbar} = useSnackbar();
    const {loading} = useTypedSelector(state => state.loading);
    const { setEnableLoading, setDisableLoading } = useActions();

    useEffect(() => {
        const fetchProduct = async () => {
            setEnableLoading();
            const product = await Api().products.getProductForEditing(slug as string);
            setProduct(product);
            setDisableLoading();
        }
        fetchProduct();
    }, [])

    const deleteHandler = async () => {
        try {
            await Api().products.deleteProduct(product.id as number);
            await router.push('/admin/catalog')
        } catch (e) {
            let error = ''
            if (e instanceof AxiosError && e.response?.status === 401) {
                error = 'Вы не авторизованы'
                logout();
                router.push('/login')
            } else {
                error = 'Непредвиденная ошибка сервера'
            }
            enqueueSnackbar(error, { variant: "error" })
        }
    }

    const submitHandler = async () => {
        const {errors, dto} = validateChangedProduct(product);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
            return;
        } else {
            setErrors({})
        }

        try {
            await Api().products.updateProduct(product.id as number, dto);
            await router.push('/admin/catalog')
        } catch (e) {
            let error = ''
            if (e instanceof AxiosError && e.response?.status === 401) {
                error = 'Вы не авторизованы'
                logout();
                router.push('/login')
            } else {
                error = 'Непредвиденная ошибка сервера'
            }
            enqueueSnackbar(error, { variant: "error" })
        }
    }

    const setStateProduct = (product: ProductEditing) => {
        setProduct(product);
    }

    return (
        <>
            <PageHeaderWithBtns title='Редактирование товара'>
                <CustomButton variant={ButtonType.red} text='Удалить' disabled={loading} onClick={deleteHandler} />
                <CustomButton variant={ButtonType.blue} text='Сохранить' disabled={loading} onClick={submitHandler} />
            </PageHeaderWithBtns>
            <EditProductForm product={product} setProduct={setStateProduct} errors={errors} />
        </>
    );
};

ProductUpdatePage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Редактирование товара'>
            {page}
        </AdminLayout>
    )
}

export default ProductUpdatePage;