import {AxiosInstance} from "axios";
import {Banner, CreateBannerDto, UpdateBannerDto} from "../../types/banner";
import {CreateServiceDto, Service, UpdateServiceDto} from "../../types/service";

export const CommentApi = (instance: AxiosInstance) => ({
    async getComments(orderId: number): Promise<Service[]> {
        const {data} = await instance.get<Service[]>(`comments?orderId=${orderId}`);
        return data;
    },
    async createComment(orderId: number, text: string): Promise<string> {
        const {data} = await instance.post('comments', {
            orderId, text,
        });
        return data;
    },
})