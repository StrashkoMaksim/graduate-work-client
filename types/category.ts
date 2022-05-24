import {Product, ProductPreviewModel} from "./product";
import {Service} from "./service";

export interface Category {
    id: number,
    name: string,
    slug: string,
    characteristics: CategoryCharacteristics,
    products: Product[],
    services: Service[]
}

export type CategoryPreviewModel = Omit<Category, 'services' | 'products' | 'characteristics'> & {
    products: ProductPreviewModel[]
}

interface CategoryCharacteristics {
    [key: string]: {
        type: CategoryCharacteristicsType,
        isMain: boolean
    };
}

enum CategoryCharacteristicsType {
    String = 'STRING',
    Integer = 'INTEGER',
    Double = 'DOUBLE',
    Boolean = 'BOOLEAN',
}