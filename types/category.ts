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

export type CategoryAside = Omit<Category, 'products' | 'services'>
export type CategoriesNavigation = Omit<CategoryAside, 'characteristics'>

export type CategoryPreviewModel = Omit<Category, 'services' | 'products' | 'characteristics'> & {
    products: ProductPreviewModel[]
}

interface CategoryCharacteristics {
    [key: string]: {
        type: CategoryCharacteristicsType,
        isMain: boolean
    };
}

export enum CategoryCharacteristicsType {
    String = 'STRING',
    Integer = 'INTEGER',
    Double = 'DOUBLE',
    Boolean = 'BOOLEAN',
}