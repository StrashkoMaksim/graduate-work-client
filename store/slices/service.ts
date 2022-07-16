import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {Service} from "../../types/service";
import _ from "lodash";

interface initialStateType {
    selectedService: Service | null;
}

const initialState: initialStateType = {
    selectedService: null
}

const serviceSlice = createSlice({
    name: 'service',
    initialState: initialState,
    reducers: {
        setSelectedService: (state: initialStateType, action: PayloadAction<Service | null>) => {
            state.selectedService = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!_.isEqual(action.payload.service.selectedService, state.selectedService)) {
                return action.payload.service;
            }
        },
    }
})

export const { setSelectedService } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;