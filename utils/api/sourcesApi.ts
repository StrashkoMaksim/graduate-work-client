import {AxiosInstance} from "axios";
import {CreateServiceDto, Service, UpdateServiceDto} from "../../types/service";
import {Source} from "../../types/order";

export const SourcesApi = (instance: AxiosInstance) => ({
    async getSources(): Promise<Source[]> {
        const {data} = await instance.get<Source[]>('sources');
        return data;
    },
    async createSource(dto: CreateServiceDto): Promise<string> {
        const {data} = await instance.post<CreateServiceDto, { data: string }>('sources', dto)
        return data
    },
    async updateSource(id: number, dto: UpdateServiceDto): Promise<string> {
        const {data} = await instance.put<UpdateServiceDto, { data: string }>(`sources/${id}`, dto)
        return data
    },
    async deleteSource(id: number): Promise<string> {
        const {data} = await instance.delete(`sources/${id}`)
        return data
    },
})