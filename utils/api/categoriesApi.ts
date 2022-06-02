import {AxiosInstance} from "axios";
import {CategoryAside, CategoryCharacteristics, CreateCategoryDto, UpdateCategoryDto} from "../../types/category";

export const CategoriesApi = (instance: AxiosInstance) => ({
    async getCategories(): Promise<CategoryAside[]> {
        const {data} = await instance.get('categories')
        return data
    },
    async getCategoryBySlug(slug: string): Promise<CategoryAside> {
        const {data} = await instance.get(`categories/${slug}`)
        return data
    },
    async deleteCategory(id: number): Promise<any> {
        const {data} = await instance.delete(`categories/${id}`)
        return data
    },
    async addCategory(dto: CreateCategoryDto): Promise<string> {
        const {data} = await instance.post('categories', dto);
        return data;
    },
    async updateCategory(id: number, dto: UpdateCategoryDto): Promise<string> {
        const {data} = await instance.put(`categories/${id}`, dto);
        return data;
    },
})