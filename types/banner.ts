export interface Banner {
    id: number,
    link: string,
    smallImage: string,
    mediumImage: string,
    bigImage: string
}

export interface BannerEdit {
    link: {
        value: string,
        isChanged: boolean,
    },
    bigImage: {
        filename: string,
        fileId?: number,
    },
    mediumImage: {
        filename: string,
        fileId?: number,
    },
    smallImage: {
        filename: string,
        fileId?: number,
    },
}