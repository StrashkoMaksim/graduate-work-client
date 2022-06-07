import {ProductPreviewModel} from "./product";
import {Service} from "./service";

export interface CartDetails {
    products: CartEntities,
    services: Service[]
}

export interface CartEntities {
    [key: number]: number;
}