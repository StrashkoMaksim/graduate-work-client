import {CartEntities} from "./cart";

export interface Order {
    id: number,
    fio: string;
    phone: string;
    priceSum: number;
    createdAt: string;
    updatedAt: string;
    source: Source;
    status: Status;
    cart: OrderCartItem[];
    comments: OrderComment[];
}

export interface Source {
    id: number;
    name: string;
    isDeletable: boolean;
}

export interface Status {
    id: number;
    name: string;
    color: string;
}

export interface OrderCartItem {
    name: string;
    count: number;
    price: number;
}

export interface OrderComment {
    id: number;
    text: string;
    createdAt: string;
}

export type OrderPreview = Omit<Order, 'cart' | 'comments'>
export type CreateOrderDto = Pick<Order, 'fio' | 'phone'> & {
    sourceId: number;
    statusId: number;
    cart?: OrderCartItem[];
    question?: string;
}
export type CreateOrderFromCartDto = Omit<CreateOrderDto, 'cart' | 'question'> & {
    cart: CartEntities;
}

export interface OrderEditing {
    id?: number;
    fio: {
        value: string;
        isChanged: boolean;
    };
    phone: {
        value: string;
        isChanged: boolean;
    };
    source: {
        value: number | '';
        isChanged: boolean;
    };
    status: {
        value: number | '';
        isChanged: boolean;
    };
    cart: {
        value: {
            name: string;
            count: number | null;
            price: string | null;
        }[];
        isChanged: boolean;
    };
}

export const InitialOrderEditingState = (): OrderEditing => {
    return {
        fio: {
            value: '',
            isChanged: false,
        },
        phone: {
            value: '',
            isChanged: false,
        },
        source: {
            value: '',
            isChanged: false,
        },
        status: {
            value: '',
            isChanged: false,
        },
        cart: {
            value: [],
            isChanged: false,
        },
    }
}