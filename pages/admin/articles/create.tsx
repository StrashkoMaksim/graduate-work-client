import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import ArticleEditForm from "../../../components/Articles/ArticleEditForm/ArticleEditFormProps";
import {OutputData} from "@editorjs/editorjs";
import {Api} from "../../../utils/api";
import {useRouter} from "next/router";

const CreateArticlePage = () => {
    const router = useRouter()

    const submitHandler = async (name: string, previewText: string, previewImage: number, content: OutputData['blocks'], categoryId: number) => {
        await Api().articles.createArticle({name, previewText, previewImage, content, categoryId})
        await router.push('/admin/articles')
    }

    return (
        <AdminLayout title='Новая статья'>
            <ArticleEditForm pageTitle='Новая статья' onSubmit={submitHandler} />
        </AdminLayout>
    );
};

export default CreateArticlePage;