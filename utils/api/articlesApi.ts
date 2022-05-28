import {AxiosInstance} from "axios";
import {ArticlePreview, CreateArticleDto, GetArticlesCategoriesResponse} from "../../types/article";

export const ArticlesApi = (instance: AxiosInstance) => ({
    async getCategories(): Promise<GetArticlesCategoriesResponse> {
        const {data} = await instance.get('articles-categories')
        return data
    },
    async deleteCategory(id: number): Promise<GetArticlesCategoriesResponse> {
        const {data} = await instance.delete(`articles-categories/${id}`)
        return data
    },
    async addCategory(name: string): Promise<GetArticlesCategoriesResponse> {
        const {data} = await instance.post('articles-categories', {name});
        return data;
    },
    async getArticles(limit: number, offset: number, categoryId: number | null): Promise<ArticlePreview[]> {
        const {data} = await instance.get(`articles?${limit ? `limit=${limit}&` : ''}${offset ? `offset=${offset}&` : ''}${categoryId ? `category=${categoryId}` : ''}`)
        return data
    },
    async createArticle(dto: CreateArticleDto): Promise<string> {
        console.log(dto)
        const {data} = await instance.post<CreateArticleDto, { data: string }>('articles', dto)
        return data
    },
})