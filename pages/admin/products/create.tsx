import React, {useState} from 'react';
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import {useRouter} from "next/router";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {validateNewArticle} from "../../../utils/validation/article";
import {Api} from "../../../utils/api";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import {InitialProductEditing, ProductEditing} from "../../../types/product";
import EditProductForm from "../../../components/EditProductForm/EditProductForm";

const ProductCreatePage = () => {
    const router = useRouter()
    const [product, setProduct] = useState<ProductEditing>(InitialProductEditing)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async () => {
        // const errors = validateNewArticle(article);
        //
        // if (Object.keys(errors).length) {
        //     setErrors(errors);
        //     enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
        //     return;
        // }
        //
        // try {
        //     await Api().articles.createArticle({
        //         name: article.name.text,
        //         previewText: article.previewText.text,
        //         previewImage: article.previewImage.fileId as number,
        //         content: article.content.blocks,
        //         categoryId: article.category.id as number,
        //     })
        //     await router.push('/admin/articles')
        // } catch (e) {
        //     let error = ''
        //     if (e instanceof AxiosError && e.response?.status === 401) {
        //         error = 'Вы не авторизованы'
        //         logout();
        //         router.push('/login')
        //     } else {
        //         error = 'Непредвиденная ошибка сервера'
        //     }
        //     enqueueSnackbar(error, { variant: "error" })
        // }
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