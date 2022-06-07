import {Product, ProductPreviewModel} from "./product";
import {Service} from "./service";

export interface Category {
    id: number,
    name: string,
    slug: string,
    characteristics: CategoryCharacteristics,
    isMain: boolean,
    products: Product[],
    services: Service[]
}

export type CategoryAside = Omit<Category, 'products' | 'services'>
export type CategoriesNavigation = Omit<CategoryAside, 'characteristics'>
export type CategoryMain = Omit<Category, 'characteristics' | 'isMain' | 'services'>

export type CategoryPreviewModel = Omit<Category, 'services' | 'products' | 'characteristics'> & {
    products: ProductPreviewModel[]
}

export interface CategoryCharacteristics {
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

export interface CategoryEditing {
    id: number | null;
    name: {
        value: string,
        isChanged: boolean,
    };
    characteristics: {
        [key: number]: CategoryEditingCharacteristics
    };
    isMain: {
        value: boolean;
        isChanged: boolean;
    };
}

export interface CategoryEditingCharacteristics {
    name: string;
    type: CategoryCharacteristicsType;
    isMain: boolean;
    isSaved: boolean
}

export const InitialCategoryEditing = (): CategoryEditing => {
    return {
        id: null,
        name: {
            value: '',
            isChanged: false,
        },
        characteristics: {
            1: {
                name: '',
                type: CategoryCharacteristicsType.String,
                isMain: true,
                isSaved: false,
            },
            2: {
                name: '',
                type: CategoryCharacteristicsType.String,
                isMain: true,
                isSaved: false,
            },
        },
        isMain: {
            value: false,
            isChanged: false,
        },
    }
}

export type CreateCategoryDto = Pick<Category, 'name' | 'isMain' | 'characteristics'>
export type UpdateCategoryDto = Partial<CreateCategoryDto>