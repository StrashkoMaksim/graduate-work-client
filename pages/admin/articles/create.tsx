import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import ArticleEditForm from "../../../components/Articles/ArticleEditForm/ArticleEditFormProps";
import {Api} from "../../../utils/api";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {ArticleEditing, InitialArticleEditing} from "../../../types/article";
import {Errors} from "../../../types/errors";
import styles from "../../../components/Articles/ArticleEditForm/ArticleEditForm.module.scss";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {validateNewArticle} from "../../../utils/validation/article";
import {useSnackbar} from "notistack";
import {AxiosError} from "axios";
import {logout} from "../../../store/actions/user";

const CreateArticlePage = () => {
    const router = useRouter()
    const [article, setArticle] = useState<ArticleEditing>(InitialArticleEditing)
    const [errors, setErrors] = useState<Errors>({})
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async () => {
        const errors = validateNewArticle(article);

        if (Object.keys(errors).length) {
            setErrors(errors);
            enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" })
            return;
        }

        try {
            await Api().articles.createArticle({
                name: article.name.text,
                previewText: article.previewText.text,
                previewImage: article.previewImage.fileId as number,
                content: article.content.blocks,
                categoryId: article.category.id as number,
            })
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

    const setStateArticle = (article: ArticleEditing) => {
        setArticle(article);
    }

    return (
        <AdminLayout title='Новая статья'>
            <PageHeader h1='Новая статья'>
                <div className={styles.btns}>
                    <CustomButton variant={ButtonType.blue} text='Опубликовать' additionalClass={styles.blueBtn} onClick={submitHandler} />
                </div>
            </PageHeader>
            <ArticleEditForm article={article} setArticle={setStateArticle} errors={errors} loading={false} />
        </AdminLayout>
    );
};

export default CreateArticlePage;