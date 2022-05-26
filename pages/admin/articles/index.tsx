import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import styles from './styles.module.scss'

const AdminArticlesPage = () => {
    return (
        <AdminLayout title='Статьи'>
            <PageHeader h1='Статьи' className={styles.header}>
                <div>
                    <Button type={ButtonType.grey} text='Менеджер категорий' additionalClass={styles.whiteBtn} />
                    <Button type={ButtonType.blue} text='Добавить статью' additionalClass={styles.blueBtn} />
                </div>
            </PageHeader>
        </AdminLayout>
    );
};

export default AdminArticlesPage;