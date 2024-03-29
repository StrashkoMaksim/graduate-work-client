import {CategoryAside, CategoryCharacteristics, CategoryCharacteristicsType} from "./category";

export interface ProductCharacteristics {
    [key: string]: string | number | boolean;
}

export interface ProductVideo {
    id: number;
    videoId: string;
    source: string;
    productId: number;
    url: string;
    title: string;
    smallPreview: string;
    mediumPreview: string;
    rawUrl: string;
}

export interface ProductImage {
    id: number;
    smallImage: string;
    mediumImage: string;
    bigImage: string;
    productId: number;
}

type ProductExample = Omit<ProductImage, 'mediumImage'>

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
    equipments: string[],
    createdAt: string,
    updatedAt: string,
    additionalCharacteristics: [string, string][],
}

export type ProductPreviewModel = Omit<Product, 'description' | 'equipments' | 'examples' | 'images' | 'videos'>
export type ProductDetailModel = Pick<Product, 'id' | 'name' | 'description' | 'price' | 'characteristics' | 'videos' | 'examples' | 'equipments' | 'images' | 'additionalCharacteristics'> & {
    category: CategoryAside
}
export type ProductForCart = Pick<Product, 'id' | 'name' | 'previewImage' | 'price'>

export interface GalleryImage {
    id?: number;
    filename: string;
    fileId?: number;
}

export interface ProductEditing {
    id: number | null;
    name: {
        value: string;
        isChanged: boolean;
    };
    description: {
        value: string;
        isChanged: boolean;
    };
    previewImage: {
        filename: string;
        fileId?: number;
    };
    price: {
        value: string;
        isChanged: boolean;
    };
    category: {
        id: number | '';
        isChanged: boolean;
    };
    characteristics: { [key: string]: {
        value: string| number | boolean | null;
        type: CategoryCharacteristicsType;
    }};
    additionalCharacteristics: {
        value: [string, string][];
        isChanged: boolean;
    };
    isCharacteristicsChanged: boolean;
    images: GalleryImage[];
    deletedImages: number[];
    equipments: {
        values: string[];
        isChanged: boolean;
    };
    examples: GalleryImage[];
    deletedExamples: number[];
    videos: {
        values: string[];
        isChanged: boolean;
    };
}

export type CreateProductDTO = Pick<Product, 'name' | 'description' | 'price' | 'characteristics' | 'categoryId' | 'additionalCharacteristics'> & {
    previewImage: number;
    images: number[];
    examples?: number[];
    equipments: string[];
    videos?: string[];
}

export type UpdateProductDTO = Partial<CreateProductDTO> & {
    deletedImages?: number[];
    deletedExamples?: number[];
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
            value: '',
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
        additionalCharacteristics: {
            value: [],
            isChanged: false,
        },
        isCharacteristicsChanged: false,
        images: [],
        deletedImages: [],
        examples: [],
        deletedExamples: [],
        equipments: {
            values: [''],
            isChanged: false,
        },
        videos: {
            values: [],
            isChanged: false,
        },
    }
}