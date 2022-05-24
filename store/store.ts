import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {Action} from 'redux';
import {userReducer} from "./slices/user";
import {createWrapper} from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);