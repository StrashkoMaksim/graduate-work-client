import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {Action} from 'redux';
import {userReducer} from "./slices/user";
import {createWrapper} from "next-redux-wrapper";
import {articlesCategoriesReducer} from "./slices/articles-categories";
import {loadingReducer} from "./slices/loading";
import {cartReducer} from "./slices/cart";
import {callbackReducer} from "./slices/callback";
import {questionReducer} from "./slices/question";

const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            articlesCategories: articlesCategoriesReducer,
            loading: loadingReducer,
            cart: cartReducer,
            callback: callbackReducer,
            question: questionReducer,
        }
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);