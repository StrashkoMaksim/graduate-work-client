import {AxiosInstance} from "axios";
import {Banner, CreateBannerDto, UpdateBannerDto} from "../../types/banner";

export const BannersApi = (instance: AxiosInstance) => ({
    async getBanners(): Promise<Banner[]> {
        const {data} = await instance.get<Banner[]>('banners');
        return data;
    },
    async createBanner(dto: CreateBannerDto): Promise<string> {
        const {data} = await instance.post<CreateBannerDto, { data: string }>('banners', dto)
        return data
    },
    async updateBanner(id: number, dto: UpdateBannerDto): Promise<string> {
        const {data} = await instance.put<UpdateBannerDto, { data: string }>(`banners/${id}`, dto)
        return data
    },
    async deleteBanner(id: number): Promise<string> {
        const {data} = await instance.delete(`banners/${id}`)
        return data
    },
})