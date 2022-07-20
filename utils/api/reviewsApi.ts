import {AxiosInstance} from "axios";
import {CreateReviewDto, Review, UpdateReviewDto} from "../../types/review";

export const ReviewsApi = (instance: AxiosInstance) => ({
    async getReviews(limit: number, offset: number): Promise<Review[]> {
        const {data} = await instance.get<Review[]>(`reviews?limit=${limit}${offset ? `&offset=${offset}` : ''}`);
        return data;
    },
    async getAdminReviews(limit: number, offset: number): Promise<Review[]> {
        const {data} = await instance.get<Review[]>(`reviews/admin?limit=${limit}${offset ? `&offset=${offset}` : ''}`);
        return data;
    },
    async createReview(dto: CreateReviewDto): Promise<string> {
        const {data} = await instance.post<CreateReviewDto, { data: string }>('reviews', dto)
        return data
    },
    async updateReview(id: number, dto: UpdateReviewDto): Promise<string> {
        const {data} = await instance.put<UpdateReviewDto, { data: string }>(`reviews/${id}`, dto)
        return data
    },
    async deleteReview(id: number): Promise<string> {
        const {data} = await instance.delete(`reviews/${id}`)
        return data
    },
})