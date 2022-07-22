import {AxiosInstance} from "axios";
import {Status} from "../../types/order";

export const StatusesApi = (instance: AxiosInstance) => ({
    async getStatuses(): Promise<Status[]> {
        const {data} = await instance.get<Status[]>('statuses');
        return data;
    },
})