import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {Action} from 'redux';
import {userReducer} from "./slices/user";
import {createWrapper} from "next-redux-wrapper";
import {articlesCategoriesReducer} from "./slices/articles-categories";

const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            articlesCategories: articlesCategoriesReducer
        }
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });