import {AppThunk} from "../store";
import {setProducts, setServices} from "../slices/cart";
import {CartEntities} from "../../types/cart";

export const dispatchProductsCart = (products: CartEntities): AppThunk => async dispatch => {
    await dispatch(setProducts(products))
}

export const dispatchServicesCart = (services: CartEntities): AppThunk => async dispatch => {
    await dispatch(setServices(services))
}