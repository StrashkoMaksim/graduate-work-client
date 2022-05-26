import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {ArticlesCategoriesState, GetArticlesCategoriesResponse} from "../../types/article";

const initialState: ArticlesCategoriesState = {
    categories: null,
    loading: false,
    error: null,
    count: 0,
}

const articlesCategoriesSlice = createSlice({
    name: 'articles-categories',
    initialState,
    reducers: {
        startFetchArticlesCategories: (state: ArticlesCategoriesState) => {
            state.categories = null;
            state.loading = true;
            state.error = null;
            state.count = 0;
        },
        endFetchArticlesCategories: (state: ArticlesCategoriesState, action: PayloadAction<GetArticlesCategoriesResponse>) => {
            state.categories = action.payload.rows;
            state.loading = false;
            state.error = null;
            state.count = action.payload.count;
        },
        errorArticlesCategories: (state: ArticlesCategoriesState, action: PayloadAction<string>) => {
            state.categories = null;
            state.loading = false;
            state.error = action.payload;
            state.count = 0;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.articlesCategories,
            };
        }
    }
})

export const { startFetchArticlesCategories, endFetchArticlesCategories, errorArticlesCategories } = articlesCategoriesSlice.actions;
export const articlesCategoriesReducer = articlesCategoriesSlice.reducer;