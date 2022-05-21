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

export type ArticlePreview = Omit<Article, 'content'>