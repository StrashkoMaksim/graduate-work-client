import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import _ from "lodash";
import {Status} from '../../types/order';

interface State {
    statuses: Status[];
    loading: boolean;
    error: null | string;
}

const initialState: State = {
    statuses: [],
    loading: false,
    error: null,
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        startFetchStatuses: (state: State) => {
            state.loading = true;
            state.error = null;
        },
        endFetchStatuses: (state: State, action: PayloadAction<Status[]>) => {
            state.statuses = action.payload;
            state.loading = false;
            state.error = null;
        },
        errorStatuses: (state: State, action: PayloadAction<string>) => {
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

export const { startFetchStatuses, endFetchStatuses, errorStatuses } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;