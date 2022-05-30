import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import ArticleEditForm from "../../../components/Articles/ArticleEditForm/ArticleEditFormProps";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import React, {useEffect, useState} from "react";
import {ArticleEditing, InitialArticleEditing} from "../../../types/article";
import styles from "../../../components/Articles/ArticleEditForm/ArticleEditForm.module.scss";
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {Errors} from "../../../types/errors";
import _ from "lodash";
import {validateChangedArticle} from "../../../utils/validation/article";

const ArticleUpdatePage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [article, setArticle] = useState<ArticleEditing>(InitialArticleEditing)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState<Errors>({})

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
            return;
        }

        await Api().articles.updateArticle(article.id as number, dto);
        await router.push('/admin/articles')
    }

    const deleteHandler = async () => {
        await Api().articles.deleteArticle(article.id as number);
        await router.push('/admin/articles')
    }

    return (
        <AdminLayout title='Редактирование статьи'>
            <PageHeader h1='Редактирование статьи'>
                <div className={styles.btns}>
                    <CustomButton variant={ButtonType.red} text='Удалить' additionalClass={styles.redBtn} disabled={loading} onClick={deleteHandler} />
                    <CustomButton variant={ButtonType.blue} text='Сохранить' additionalClass={styles.blueBtn} disabled={loading} onClick={updateHandler} />
                </div>
            </PageHeader>
            <ArticleEditForm article={article} setArticle={setStateArticle} loading={loading} errors={errors} />
        </AdminLayout>
    );
};

export default ArticleUpdatePage;