export interface Document {
    id: number;
    name: string;
    type: 'link' | 'file';
    link: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface DocumentEdit {
    id?: number,
    name: {
        value: string,
        isChanged: boolean,
    },
    file: {
        filename: string;
        fileId?: number;
    },
    link: {
        value: string,
        isChanged: boolean,
    },
    categoryId: {
        value: number | '',
        isChanged: boolean,
    },
}

export interface CreateDocumentWithLinkDto {
    name: string;
    link: string;
    categoryId: number;
}
export type CreateDocumentWithFileDto = Omit<CreateDocumentWithLinkDto, 'link'> & {
    fileId: number;
}

export const initialDocumentEditState = (): DocumentEdit => {
    return {
        name: {
            value: '',
            isChanged: false,
        },
        file: {
            filename: '',
        },
        link: {
            value: '',
            isChanged: false,
        },
        categoryId: {
            value: '',
            isChanged: false,
        },
    }
}

export interface DocumentCategoryWithDocuments {
    id: number;
    name: string;
    documents: Document[];
}

export type DocumentCategory = Omit<DocumentCategoryWithDocuments, 'documents'>