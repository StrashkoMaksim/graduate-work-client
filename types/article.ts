export interface Article {
    id: number
    name: string,
    slug: string,
    previewImage: string,
    previewText: string,
    content: Object,
    createdAt: string
    promotionDate?: string
    sale?: string
}

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
}

export interface GetArticlesCategoriesResponse {
    count: number;
    rows: ArticleCategory[];
}

export type ArticlePreview = Omit<Article, 'content'>