import {ProductPreviewModel} from "./product";
import {Service} from "./service";

export interface CartDetails {
    products: CartEntities,
    services: Service[]
}

export interface CartEntities {
    [key: number]: number;
}

export interface CartDTO {
    cart: CartEntities;
    name: string;
    phone: string;
    isAgreed: boolean;
}

export const initialCartDTO = (cart: CartEntities) => {
    return {
        cart,
        name: '',
        phone: '',
        isAgreed: true,
    }
}