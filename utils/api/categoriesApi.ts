import {AxiosInstance} from "axios";
import {CategoryAside} from "../../types/category";

export const CategoriesApi = (instance: AxiosInstance) => ({
    async getCategories(): Promise<CategoryAside[]> {
        const {data} = await instance.get('categories')
        return data
    },
    async deleteCategory(id: number): Promise<any> {
        const {data} = await instance.delete(`categories/${id}`)
        return data
    },
    async addCategory(name: string): Promise<any> {
        const {data} = await instance.post('categories', {name});
        return data;
    },
})