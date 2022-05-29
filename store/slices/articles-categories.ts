import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {ArticlesCategoriesState, GetArticlesCategoriesResponse} from "../../types/article";
import _ from "lodash";

const initialState: ArticlesCategoriesState = {
    categories: null,
    loading: false,
    error: null,
    count: 0,
    selectedId: null,
}

const articlesCategoriesSlice = createSlice({
    name: 'articles-categories',
    initialState,
    reducers: {
        startFetchArticlesCategories: (state: ArticlesCategoriesState) => {
            state.loading = true;
            state.error = null;
        },
        endFetchArticlesCategories: (state: ArticlesCategoriesState, action: PayloadAction<GetArticlesCategoriesResponse>) => {
            state.categories = action.payload.rows;
            state.loading = false;
            state.error = null;
            state.count = action.payload.count;
        },
        errorArticlesCategories: (state: ArticlesCategoriesState, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        selectArticlesCategory: (state: ArticlesCategoriesState, action: PayloadAction<number | null>) =>  {
            state.selectedId = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!_.isEqual(initialState, action.payload.articlesCategories) && !_.isEqual(state, action.payload.articlesCategories)) {
                return {
                    ...state,
                    ...action.payload.articlesCategories,
                };
            }
        },
    }
})

export const { startFetchArticlesCategories, endFetchArticlesCategories, errorArticlesCategories, selectArticlesCategory } = articlesCategoriesSlice.actions;
export const articlesCategoriesReducer = articlesCategoriesSlice.reducer;