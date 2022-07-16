export interface Service {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceEdit {
    id?: number,
    name: {
        value: string,
        isChanged: boolean,
    },
    price: {
        value: string,
        isChanged: boolean,
    },
    categoryId: {
        value: number | '',
        isChanged: boolean,
    },
}

export interface CreateServiceDto {
    name: string;
    price: number;
    categoryId: number;
}

export type UpdateServiceDto = Partial<CreateServiceDto>