import {OutputData} from "@editorjs/editorjs";
import {ArticleEditing} from "./article";
import {CategoryCharacteristicsType} from "./category";

export interface ProductCharacteristics {
    [key: string]: string | number | boolean;
}

interface ProductVideo {
    id: number,
    videoId: string,
    source: string,
    productId: number
}

interface ProductImage {
    id: number,
    smallImage: string,
    mediumImage: string,
    bigImage: string,
    productId: number
}

type ProductExample = Omit<ProductImage, 'mediumImage'>

interface ProductEquipment {
    id: number,
    text: string,
    productId: number
}

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    slug: string,
    characteristics: ProductCharacteristics,
    categoryId: number,
    previewImage: string,
    videos: ProductVideo[],
    images: ProductImage[],
    examples: ProductExample[],
    equipments: ProductEquipment[]
}

export type ProductPreviewModel = Omit<Product, 'description' | 'equipments' | 'examples' | 'images' | 'videos' | 'categoryId'>

export interface ProductEditing {
    id: number | null;
    name: {
        value: string,
        isChanged: boolean,
    };
    description: {
        value: string,
        isChanged: boolean,
    };
    previewImage: {
        filename: string,
        fileId?: number,
    };
    price: {
        value: number | null,
        isChanged: boolean,
    };
    category: {
        id: number | '',
        isChanged: boolean,
    };
    characteristics: { [key: string]: {
        value: string| number | boolean | null;
        type: CategoryCharacteristicsType
    }};
    isCharacteristicsChanged: boolean;
}

export const InitialProductEditing = (): ProductEditing => {
    return {
        id: null,
        name: {
            value: '',
            isChanged: false,
        },
        description: {
            value: '',
            isChanged: false,
        },
        previewImage: {
            filename: '',
        },
        price: {
            value: null,
            isChanged: false,
        },
        category: {
            id: '',
            isChanged: false,
        },
        characteristics: {
            '': {
                value: null,
                type: CategoryCharacteristicsType.String
            },
        },
        isCharacteristicsChanged: false,
    }
}