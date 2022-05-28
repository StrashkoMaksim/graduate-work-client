import {AxiosInstance} from "axios";

export interface UploadResponse {
    filename: string,
    fileId: number
}

export const FilesApi = (instance: AxiosInstance) => ({
    async uploadImage(filesData: FormData): Promise<UploadResponse> {
        const {data} = await instance.post<Blob | MediaSource, {data: UploadResponse}>('files/image', filesData);
        return data;
    },
})