import {AppThunk} from "../store";
import {Api} from "../../utils/api";
import {
    endFetchArticlesCategories,
    errorArticlesCategories, selectArticlesCategory,
    startFetchArticlesCategories
} from "../slices/articles-categories";
import {AxiosError} from "axios";
import {logout} from "./user";
import {
    endFetchCatalogCategories,
    errorCatalogCategories,
    startFetchCatalogCategories
} from "../slices/catalog-categories";

export const fetchCatalogCategories = (): AppThunk => async dispatch => {
    try {
        dispatch(startFetchCatalogCategories())
        const categories = await Api().categories.getCategories()
        dispatch(endFetchCatalogCategories(categories))
    } catch (e) {
        dispatch(errorCatalogCategories('Непредвиденная ошибка при получении категорий'))
    }
}

export const addCatalogCategories = (name: string): AppThunk => async dispatch => {
    try {
        dispatch(startFetchArticlesCategories())
        const categories = await Api().articles.addCategory(name)
        dispatch(endFetchArticlesCategories(categories))
    } catch (e) {
        dispatch(errorArticlesCategories('Непредвиденная ошибка при добавлении категории'))
        throw e
    }
}

export const deleteCatalogCategory = (id: number): AppThunk => async dispatch => {
    try {
        dispatch(startFetchArticlesCategories())
        const categories = await Api().articles.deleteCategory(id)
        dispatch(endFetchArticlesCategories(categories))
    } catch (e) {
        if (e instanceof AxiosError) {
            switch (e.response?.status) {
                case 401:
                    logout()
                    dispatch(errorArticlesCategories('Вы не авторизованы'))
                    break;
                case 400:
                    dispatch(errorArticlesCategories(e.response.data.message));
                    break;
            }
        } else {
            dispatch(errorArticlesCategories('Непредвиденная ошибка при удалении категории'))
        }
        throw e
    }
}

export const changeCatalogCategory = (id: number| null): AppThunk => async dispatch => {
    dispatch(selectArticlesCategory(id))
}