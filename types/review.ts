export interface Review {
    id: number;
    surname: string;
    name: string;
    text: string;
    accepted: boolean;
    createdAt: string;
}

export type CreateReviewDTO = Pick<Review, 'surname' | 'name' | 'text'>