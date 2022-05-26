import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import styles from './styles.module.scss'
import ArticleAside from "../../../components/Aside/ArticleAside/ArticleAside";
import ArticlesList from "../../../components/ArticlesList/ArticlesList";
import BlockWithAside from "../../../components/BlockWithAside/BlockWithAside";
import cn from "classnames";
import {useCallback, useState} from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";
import ArticlesCategoriesManager from "../../../components/ArticlesCategoriesManager/ArticlesCategoriesManager";
import {wrapper} from "../../../store/store";
import {Api} from "../../../utils/api";
import {endFetchArticlesCategories, errorArticlesCategories} from "../../../store/slices/articles-categories";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const AdminArticlesPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {loading} = useTypedSelector(state => state.articlesCategories)

    const showModalHandler = useCallback(() => {
        setIsModalVisible(true)
    }, [])

    const hideModalHandler = useCallback(() => {
        if (!loading) {
            setIsModalVisible(false)
        }
    }, [loading])

    return (
        <AdminLayout title='Статьи'>
            <PageHeader h1='Статьи' className={styles.header}>
                <div className={styles.btns}>
                    <Button type={ButtonType.grey} text='Менеджер категорий' additionalClass={cn(styles.btn, styles.whiteBtn)} onClick={showModalHandler} />
                    <Button type={ButtonType.blue} text='Добавить статью' additionalClass={cn(styles.btn, styles.blueBtn)} />
                </div>
            </PageHeader>
            <BlockWithAside
                aside={
                    <ArticleAside isAdmin={true} />
                }
                content={
                    <ArticlesList isAdmin={true} />
                }
            />
            <CustomModal open={isModalVisible} onClose={hideModalHandler} title='Менеджер категорий'>
                <ArticlesCategoriesManager />
            </CustomModal>
        </AdminLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res}) => {
    try {
        const response = await Api().articles.getCategories()
        store.dispatch(endFetchArticlesCategories(response))
    } catch (e) {
        errorArticlesCategories('Произошла ошибка при загрузке категорий')
    }
    return { props: {} }
});

export default AdminArticlesPage;