import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {CartEntities} from "../../types/cart";

interface initialStateType {
    products: CartEntities;
    services: CartEntities;
    count: number;
}

const initialState: initialStateType = {
    products: {},
    services: {},
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setProducts: (state: initialStateType, action: PayloadAction<CartEntities>) => {
            state.products = action.payload;
            state.count = getCount(state.products, state.services);
        },
        setServices: (state: initialStateType, action: PayloadAction<CartEntities>) => {
            state.services = action.payload;
            state.count = getCount(state.products, state.services);
        },
        setEmptyCart: (state: initialStateType) => {
            state = initialState;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cart
            }
        },
    }
})

const getCount = (products: CartEntities, services: CartEntities) => {
    const productsCount = Object.values(products).reduce((prev, current) => prev + current, 0);
    const servicesCount = Object.values(services).reduce((prev, current) => prev + current, 0);
    return productsCount + servicesCount;
}

export const { setProducts, setServices } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;