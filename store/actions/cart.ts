import {AppThunk} from "../store";
import {CartState, setCart, setProducts} from "../slices/cart";
import {CartEntities} from "../../types/cart";

export const dispatchProductsCart = (products: CartEntities): AppThunk => async dispatch => {
    await dispatch(setProducts(products))
}

export const dispatchSetCart = (cart: CartState): AppThunk => async dispatch => {
    await dispatch(setCart(cart));
}