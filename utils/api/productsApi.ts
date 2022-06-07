import {AxiosInstance} from "axios";
import {CreateProductDTO, ProductEditing, ProductPreviewModel, UpdateProductDTO} from "../../types/product";

export const ProductsApi = (instance: AxiosInstance) => ({
    async getAllSlugs(): Promise<{slug: string}[]> {
        const {data} = await instance.get('products/slugs')
        return data
    },
    async getProducts(categoryId: number | null, limit: number, offset: number): Promise<ProductPreviewModel[]> {
        const {data} = await instance.get(`products?limit=${limit}${categoryId ? `&category=${categoryId}` : ''}${offset ? `&offset=${offset}` : ''}`)
        return data;
    },
    async getProductForEditing(slug: string): Promise<ProductEditing> {
        const {data} = await instance.get(`products/admin/${slug}`)
        return data
    },
    async createProduct(dto: CreateProductDTO): Promise<string> {
        const {data} = await instance.post<CreateProductDTO, { data: string }>('products', dto)
        return data
    },
    async updateProduct(id: number, dto: UpdateProductDTO): Promise<string> {
        const {data} = await instance.put<UpdateProductDTO, { data: string }>(`products/${id}`, dto)
        return data
    },
    async deleteProduct(id: number): Promise<string> {
        const {data} = await instance.delete(`products/${id}`)
        return data
    },
})