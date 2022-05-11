import {UserState} from "./user";

export interface ReviewModel {
    id: number,
    user: UserState,
    text: string,
    accepted: boolean,
    createdAt: string,
}

export type ReviewPreviewModel = Omit<ReviewModel, 'accepted' | 'user'> & {
    surname: string,
    name: string,
}