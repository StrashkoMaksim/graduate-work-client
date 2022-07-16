import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import _ from "lodash";
import {CatalogCategoriesState, CategoryAside} from "../../types/category";

const initialState: CatalogCategoriesState = {
    categories: null,
    loading: false,
    error: null,
    count: 0,
    selectedId: null,
}

const catalogCategoriesSlice = createSlice({
    name: 'catalog-categories',
    initialState,
    reducers: {
        startFetchCatalogCategories: (state: CatalogCategoriesState) => {
            state.loading = true;
            state.error = null;
        },
        endFetchCatalogCategories: (state: CatalogCategoriesState, action: PayloadAction<CategoryAside[]>) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = null;
            state.count = action.payload.length;
        },
        errorCatalogCategories: (state: CatalogCategoriesState, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        selectCatalogCategory: (state: CatalogCategoriesState, action: PayloadAction<number | null>) =>  {
            state.selectedId = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (!_.isEqual(initialState, action.payload.catalogCategories) && !_.isEqual(state, action.payload.catalogCategories)) {
                return {
                    ...state,
                    ...action.payload.catalogCategories,
                };
            }
        },
    }
})

export const { startFetchCatalogCategories, endFetchCatalogCategories, errorCatalogCategories, selectCatalogCategory } = catalogCategoriesSlice.actions;
export const catalogCategoriesReducer = catalogCategoriesSlice.reducer;