interface ProductCharacteristics {
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