import React, {useState} from 'react';
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import {useRouter} from "next/router";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {Api} from "../../../utils/api";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import {InitialProductEditing, ProductEditing} from "../../../types/product";
import EditProductForm from "../../../components/EditProductForm/EditProductForm";
import {validateNewProduct} from "../../../utils/validation/product";

const ProductCreatePage = () => {
    const router = useRouter()
    const [product, setProduct] = useState<ProductEditing>(InitialProductEditing)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async () => {
        const {errors, dto} = validateNewProduct(product);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
            return;
        } else {
            setErrors({})
        }

        try {
            await Api().products.createArticle(dto)
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
        <AdminLayout title='Новый товар'>
            <PageHeaderWithBtns title='Новый товар'>
                <CustomButton variant={ButtonType.blue} text='Опубликовать' onClick={submitHandler} />
            </PageHeaderWithBtns>
            <EditProductForm product={product} setProduct={setStateProduct} errors={errors} />
        </AdminLayout>
    );
};

export default ProductCreatePage;