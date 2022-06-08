import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {CartEntities} from "../../types/cart";

export interface CartState {
    products: CartEntities;
    services: CartEntities;
    count: number;
}

const initialState: CartState = {
    products: {},
    services: {},
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart: (state: CartState, action: PayloadAction<CartState>) => {
            return {...action.payload}
        },
        setProducts: (state: CartState, action: PayloadAction<CartEntities>) => {
            state.products = action.payload;
            state.count = getCount(state.products, state.services);
            saveCart(state);
        },
        setServices: (state: CartState, action: PayloadAction<CartEntities>) => {
            state.services = action.payload;
            state.count = getCount(state.products, state.services);
            saveCart(state);
        },
        setEmptyCart: (state: CartState) => {
            state = initialState;
            saveCart(state);
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (state.count !== action.payload.cart.count && action.payload.cart.count !== 0) {
                return {
                    ...state,
                    ...action.payload.cart
                }
            }
        },
    }
})

const getCount = (products: CartEntities, services: CartEntities) => {
    const productsCount = Object.values(products).reduce((prev, current) => prev + current, 0);
    const servicesCount = Object.values(services).reduce((prev, current) => prev + current, 0);
    return productsCount + servicesCount;
}

const saveCart = (cart: CartState) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const { setProducts, setServices, setCart, setEmptyCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;