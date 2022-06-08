import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import ArticleEditForm from "../../../components/Articles/ArticleEditForm/ArticleEditFormProps";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import React, {ReactElement, useEffect, useState} from "react";
import {ArticleEditing, InitialArticleEditing} from "../../../types/article";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import {Errors} from "../../../types/errors";
import _ from "lodash";
import {validateChangedArticle} from "../../../utils/validation/article";
import {useSnackbar} from "notistack";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";
import PageHeaderWithBtns from "../../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import {NextPageWithLayout} from "../../_app";

const ArticleUpdatePage: NextPageWithLayout = () => {
    const router = useRouter()
    const { slug } = router.query
    const [article, setArticle] = useState<ArticleEditing>(InitialArticleEditing)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchArticle = async () => {
            const articleRes = await Api().articles.getArticleBySlug(slug as string);
            if (!articleRes) {
                router.push('/404');
            }
            const newState = _.clone(article);
            newState.id = articleRes.id;
            newState.name.text = articleRes.name;
            newState.previewText.text = articleRes.previewText;
            newState.previewImage.filename = articleRes.previewImage;
            newState.category.id = articleRes.categoryId;
            newState.content.blocks = articleRes.content;
            setArticle(newState);
            setLoading(false);
        }
        fetchArticle()
    }, [])

    const setStateArticle = (article: ArticleEditing) => {
        setArticle(article);
    }

    const updateHandler = async () => {
        const {errors, dto} = validateChangedArticle(article);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', {variant: "error"});
            return;
        }

        try {
            await Api().articles.updateArticle(article.id as number, dto);
            await router.push('/admin/articles')
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

    const deleteHandler = async () => {
        try {
            await Api().articles.deleteArticle(article.id as number);
            await router.push('/admin/articles')
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

    return (
        <>
            <PageHeaderWithBtns title='Редактирование статьи'>
                <CustomButton variant={ButtonType.red} text='Удалить' disabled={loading} onClick={deleteHandler} />
                <CustomButton variant={ButtonType.blue} text='Сохранить' disabled={loading} onClick={updateHandler} />
            </PageHeaderWithBtns>
            <ArticleEditForm article={article} setArticle={setStateArticle} loading={loading} errors={errors} />
        </>
    );
};

ArticleUpdatePage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <AdminLayout title='Редактирование статьи'>
            {page}
        </AdminLayout>
    )
};

export default ArticleUpdatePage;