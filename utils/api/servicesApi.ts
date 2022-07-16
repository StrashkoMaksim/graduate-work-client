import {AxiosInstance} from "axios";
import {Banner, CreateBannerDto, UpdateBannerDto} from "../../types/banner";
import {CreateServiceDto, Service, UpdateServiceDto} from "../../types/service";

export const ServicesApi = (instance: AxiosInstance) => ({
    async getServices(categoryId: number | null, limit: number, offset: number): Promise<Service[]> {
        const {data} = await instance.get<Service[]>(`services?limit=${limit}${categoryId ? `&category=${categoryId}` : ''}${offset ? `&offset=${offset}` : ''}`);
        return data;
    },
    async createService(dto: CreateServiceDto): Promise<string> {
        const {data} = await instance.post<CreateServiceDto, { data: string }>('services', dto)
        return data
    },
    async updateService(id: number, dto: UpdateServiceDto): Promise<string> {
        const {data} = await instance.put<UpdateServiceDto, { data: string }>(`services/${id}`, dto)
        return data
    },
    async deleteService(id: number): Promise<string> {
        const {data} = await instance.delete(`services/${id}`)
        return data
    },
})