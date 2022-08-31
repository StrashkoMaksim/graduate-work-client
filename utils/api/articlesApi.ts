import {AxiosInstance} from "axios";
import {
    Article,
    ArticlePreview,
    CreateArticleDto,
    GetArticlesCategoriesResponse,
    UpdateArticleDto
} from "../../types/article";

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
    async getArticles(limit: number, offset: number, categoryId: number | null, search?: string): Promise<ArticlePreview[]> {
        const {data} = await instance.get(`articles?${limit ? `limit=${limit}` : ''}${offset ? `&offset=${offset}` : ''}${categoryId ? `&category=${categoryId}` : ''}${search ? `&search=${search}` : ''}`)
        return data
    },
    async getAllSlugs(): Promise<{slug: string}[]> {
        const {data} = await instance.get('articles/slugs')
        return data
    },
    async getArticleBySlug(slug: string): Promise<Article> {
        const {data} = await instance.get(`articles/${slug}`)
        return data
    },
    async createArticle(dto: CreateArticleDto): Promise<string> {
        const {data} = await instance.post<CreateArticleDto, { data: string }>('articles', dto)
        return data
    },
    async updateArticle(id: number, dto: UpdateArticleDto): Promise<string> {
        const {data} = await instance.put<CreateArticleDto, { data: string }>(`articles/${id}`, dto)
        return data
    },
    async deleteArticle(id: number): Promise<string> {
        const {data} = await instance.delete(`articles/${id}`)
        return data
    },
})