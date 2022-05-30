import { OutputData } from '@editorjs/editorjs'

export interface Article {
    id: number;
    name: string;
    slug: string;
    previewImage: string;
    previewText: string;
    content: OutputData['blocks'];
    createdAt: string;
    promotionDate?: string;
    sale?: string;
    updatedAt: string;
    categoryId: number;
}

export type ArticlePreview = Omit<Article, 'content' | 'updatedAt'>

export interface ArticleCategory {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface ArticlesCategoriesState {
    categories: ArticleCategory[] | null;
    loading: boolean;
    error: string | null;
    count: number;
    selectedId: number | null;
}

export interface GetArticlesCategoriesResponse {
    count: number;
    rows: ArticleCategory[];
}

export type CreateArticleDto = Omit<Article, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'previewImage'> & {categoryId: number, previewImage: number}
export type UpdateArticleDto = Partial<CreateArticleDto>

export interface ArticleEditing {
    id: number | null;
    name: {
        text: string,
        isChanged: boolean,
    };
    previewText: {
        text: string,
        isChanged: boolean,
    };
    previewImage: {
        filename: string,
        fileId?: number,
    };
    category: {
        id: number | '',
        isChanged: boolean,
    };
    content: {
        blocks: OutputData['blocks'],
        isChanged: boolean,
    }
}

export const InitialArticleEditing = (): ArticleEditing => {
    return {
        id: null,
        name: {
            text: '',
            isChanged: false,
        },
        previewText: {
            text: '',
            isChanged: false,
        },
        previewImage: {
            filename: '',
        },
        category: {
            id: '',
            isChanged: false,
        },
        content: {
            blocks: [],
            isChanged: false,
        }
    }
}
