import {AppThunk} from "../store";
import {Api} from "../../utils/api";
import {
    endFetchArticlesCategories,
    errorArticlesCategories,
    startFetchArticlesCategories
} from "../slices/articles-categories";
import {AxiosError} from "axios";
import {logout} from "./user";

export const fetchArticlesCategories = (): AppThunk => async dispatch => {
    try {
        dispatch(startFetchArticlesCategories())
        const categories = await Api().articles.getCategories()
        dispatch(endFetchArticlesCategories(categories))
    } catch (e) {
        dispatch(errorArticlesCategories('Непредвиденная ошибка при получении категорий'))
    }
}

export const addArticlesCategories = (name: string): AppThunk => async dispatch => {
    try {
        dispatch(startFetchArticlesCategories())
        const categories = await Api().articles.addCategory(name)
        dispatch(endFetchArticlesCategories(categories))
    } catch (e) {
        dispatch(errorArticlesCategories('Непредвиденная ошибка при добавлении категории'))
        throw e
    }
}

export const deleteArticleCategory = (id: number): AppThunk => async dispatch => {
    try {
        dispatch(startFetchArticlesCategories())
        const categories = await Api().articles.deleteCategory(id)
        dispatch(endFetchArticlesCategories(categories))
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            logout()
            dispatch(errorArticlesCategories('Вы не авторизованы'))
        } else {
            dispatch(errorArticlesCategories('Непредвиденная ошибка при удалении категории'))
        }
        throw e
    }
}