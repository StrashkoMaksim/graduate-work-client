import {AxiosInstance} from "axios";
import {
    Article,
    ArticlePreview,
    CreateArticleDto,
    GetArticlesCategoriesResponse,
    UpdateArticleDto
} from "../../types/article";
import {Banner} from "../../types/banner";

export const BannersApi = (instance: AxiosInstance) => ({
    async getBanners(): Promise<Banner[]> {
        const {data} = await instance.get<Banner[]>('banners');
        return data;
    },
    async createArticle(dto: CreateArticleDto): Promise<string> {
        const {data} = await instance.post<CreateArticleDto, { data: string }>('banners', dto)
        return data
    },
    async updateArticle(id: number, dto: UpdateArticleDto): Promise<string> {
        const {data} = await instance.put<CreateArticleDto, { data: string }>(`banners/${id}`, dto)
        return data
    },
    async deleteArticle(id: number): Promise<string> {
        const {data} = await instance.delete(`banners/${id}`)
        return data
    },
})