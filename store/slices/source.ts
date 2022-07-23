import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import _ from "lodash";
import {Source} from '../../types/order';

interface State {
    sources: Source[];
    loading: boolean;
    error: null | string;
}

const initialState: State = {
    sources: [],
    loading: false,
    error: null,
}

const sourceSlice = createSlice({
    name: 'source',
    initialState,
    reducers: {
        startFetchSources: (state: State) => {
            state.loading = true;
            state.error = null;
        },
        endFetchSources: (state: State, action: PayloadAction<Source[]>) => {
            state.sources = action.payload;
            state.loading = false;
            state.error = null;
        },
        errorSources: (state: State, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!_.isEqual(initialState, action.payload.status) && !_.isEqual(state, action.payload.status)) {
                return {
                    ...state,
                    ...action.payload.status,
                };
            }
        },
    }
})

export const { startFetchSources, endFetchSources, errorSources } = sourceSlice.actions;
export const sourceReducer = sourceSlice.reducer;