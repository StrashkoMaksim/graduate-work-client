export interface CallbackDTO {
    name: string;
    phone: string;
    isAgreed: boolean;
}

export const initialCallbackDTO = (): CallbackDTO => {
    return {
        name: '',
        phone: '',
        isAgreed: true,
    }
}