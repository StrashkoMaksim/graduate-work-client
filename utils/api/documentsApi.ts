import {AxiosInstance} from "axios";
import {Banner, CreateBannerDto, UpdateBannerDto} from "../../types/banner";
import {
    CreateDocumentWithFileDto,
    CreateDocumentWithLinkDto,
    DocumentCategory,
    DocumentCategoryWithDocuments
} from "../../types/document";

export const DocumentsApi = (instance: AxiosInstance) => ({
    async getDocumentsCategories(): Promise<DocumentCategory[]> {
        const {data} = await instance.get('documents-categories');
        return data;
    },
    async getDocuments(): Promise<DocumentCategoryWithDocuments[]> {
        const {data} = await instance.get('documents-categories/with-documents');
        return data;
    },
    async createDocumentWithLink(dto: CreateDocumentWithLinkDto): Promise<string> {
        const {data} = await instance.post<CreateDocumentWithLinkDto, { data: string }>('documents/link', dto)
        return data
    },
    async createDocumentWithFile(dto: CreateDocumentWithFileDto): Promise<string> {
        const {data} = await instance.post<CreateDocumentWithFileDto, { data: string }>('documents/file', dto)
        return data
    },
    async deleteDocument(id: number): Promise<string> {
        const {data} = await instance.delete(`documents/${id}`)
        return data
    },
})