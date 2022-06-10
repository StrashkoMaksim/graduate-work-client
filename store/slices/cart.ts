import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {CartEntities} from "../../types/cart";

export interface CartState {
    products: CartEntities;
    count: number;
}

const initialState: CartState = {
    products: {},
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
            state.count = getCount(state.products);
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

const getCount = (products: CartEntities) => {
    return Object.values(products).reduce((prev, current) => prev + current, 0);
}

const saveCart = (cart: CartState) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const { setProducts, setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;