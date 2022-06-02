import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {CategoryEditing, InitialCategoryEditing} from "../../../types/category";
import EditCategoryForm from "../../../components/EditCategoryForm/EditCategoryForm";
import {validateNewCategory} from "../../../utils/validation/categories";
import {AxiosError} from "axios";
import {Api} from "../../../utils/api";
import {logout} from "../../../store/actions/user";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

const CreateCategoryPage = () => {
    const { loading } = useTypedSelector(state => state.loading)
    const {setEnableLoading, setDisableLoading} = useActions();
    const router = useRouter()
    const [category, setCategory] = useState<CategoryEditing>(InitialCategoryEditing)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async () => {
        setEnableLoading();
        const {errors, dto} = validateNewCategory(category);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
            setDisableLoading();
            return;
        }
        setErrors({})

        try {
            await Api().categories.addCategory(dto)
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
        setDisableLoading();
    }

    const setStateCategory = (category: CategoryEditing) => {
        setCategory(category);
    }

    return (
        <AdminLayout title='Новая категория'>
            <PageHeaderWithBtns title='Новая категория'>
                <CustomButton variant={ButtonType.blue} text='Опубликовать' disabled={loading} onClick={submitHandler} />
            </PageHeaderWithBtns>
            <EditCategoryForm category={category} setCategory={setStateCategory} errors={errors} />
        </AdminLayout>
    );
};

export default CreateCategoryPage;