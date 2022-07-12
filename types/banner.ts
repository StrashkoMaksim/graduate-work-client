export interface Banner {
    id: number,
    name: string,
    link: string,
    smallImage: string,
    mediumImage: string,
    bigImage: string
}

export interface BannerEdit {
    id?: number,
    name: {
        value: string,
        isChanged: boolean,
    },
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

export interface CreateBannerDto {
    name: string;
    link: string;
    smallBanner: number;
    mediumBanner: number;
    bigBanner: number;
}

export type UpdateBannerDto = Partial<CreateBannerDto>