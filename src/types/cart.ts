import {ProductPreviewModel} from "./product";
import {Service} from "./service";

export interface CartDetails {
    products: ProductPreviewModel[],
    services: Service[]
}