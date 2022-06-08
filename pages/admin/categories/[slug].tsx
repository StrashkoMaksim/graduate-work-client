import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import React, {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Errors} from "../../../types/errors";
import {useSnackbar} from "notistack";
import {
    CategoryEditing,
    CategoryEditingCharacteristics,
    InitialCategoryEditing
} from "../../../types/category";
import EditCategoryForm from "../../../components/EditCategoryForm/EditCategoryForm";
import {validateChangedCategory} from "../../../utils/validation/categories";
import {AxiosError} from "axios";
import {Api} from "../../../utils/api";
import {logout} from "../../../store/actions/user";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {NextPageWithLayout} from "../../_app";

const UpdateCategoryPage: NextPageWithLayout = () => {
    const { loading } = useTypedSelector(state => state.loading)
    const {setEnableLoading, setDisableLoading} = useActions();
    const router = useRouter()
    const [category, setCategory] = useState<CategoryEditing>(InitialCategoryEditing)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchCategory = async () => {
            setEnableLoading();
            try {
                const res = await Api().categories.getCategoryBySlug(router.query.slug as string)
                const characteristics: { [key: number]: CategoryEditingCharacteristics } = {}
                let id = 1;
                Object.entries(res.characteristics).forEach(entity => {
                    characteristics[id] = {
                        name: entity[0],
                        type: entity[1].type,
                        isMain: entity[1].isMain,
                        isSaved: true,
                    };
                    id++;
                })
                const category: CategoryEditing = {
                    id: res.id,
                    name: {
                        value: res.name,
                        isChanged: false,
                    },
                    isMain: {
                        value: res.isMain,
                        isChanged: false,
                    },
                    characteristics,
                }
                setCategory(category);
                setDisableLoading();
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузке категории', { variant: "error" });
            }
        }
        fetchCategory()
    }, [])

    const submitHandler = async () => {
        setEnableLoading();
        const { errors, dto } = validateChangedCategory(category);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
            setDisableLoading()
            return;
        }
        setErrors({})

        try {
            await Api().categories.updateCategory(category.id as number, dto)
            await router.push('/admin/catalog')
        } catch (e) {
            let error = ''
            if (e instanceof AxiosError)
                switch (e.response?.status) {
                    case 401:
                        error = 'Вы не авторизованы'
                        logout();
                        router.push('/login')
                        break;
                    case 400:
                        error = e.response.data.message
                        break;
            } else {
                error = 'Непредвиденная ошибка сервера'
            }
            enqueueSnackbar(error, { variant: "error" })
        }
        setDisableLoading()
    }

    const deleteHandler = async () => {
        setEnableLoading()
        try {
            await Api().categories.deleteCategory(category.id as number);
            await router.push('/admin/catalog');
            setDisableLoading();
        } catch (e) {
            let error = ''
            if (e instanceof AxiosError)
                switch (e.response?.status) {
                    case 401:
                        error = 'Вы не авторизованы'
                        logout();
                        router.push('/login')
                        break;
                    case 400:
                        error = e.response.data.message
                        break;
                } else {
                error = 'Непредвиденная ошибка сервера'
            }
            enqueueSnackbar(error, { variant: "error" })
        }
        setDisableLoading()
    }

    const setStateCategory = (category: CategoryEditing) => {
        setCategory(category);
    }

    return (
        <>
            <PageHeaderWithBtns title='Редактирование категории'>
                <CustomButton variant={ButtonType.red} text='Удалить' disabled={loading} onClick={deleteHandler} />
                <CustomButton variant={ButtonType.blue} text='Сохранить' disabled={loading} onClick={submitHandler} />
            </PageHeaderWithBtns>
            <EditCategoryForm category={category} setCategory={setStateCategory} errors={errors} />
        </>
    );
};

UpdateCategoryPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Редактирование категории'>
            {page}
        </AdminLayout>
    )
};

export default UpdateCategoryPage;