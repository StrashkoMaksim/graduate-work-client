import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeader from "../../../components/PageHeader/PageHeader";
import styles from './styles.module.scss'
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import ArticleEditForm from "../../../components/Articles/ArticleEditForm/ArticleEditForm";

const CreateArticlePage = () => {
    const submitHandler = () => {

    }

    return (
        <AdminLayout title='Новая статья'>
            <PageHeader h1='Новая статья'>
                <div className={styles.btns}>
                    <Button variant={ButtonType.blue} text='Опубликовать' additionalClass={styles.blueBtn} onClick={submitHandler} />
                </div>
            </PageHeader>
            <ArticleEditForm />
        </AdminLayout>
    );
};

export default CreateArticlePage;