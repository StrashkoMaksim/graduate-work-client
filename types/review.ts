export interface Review {
    id: number;
    secondName: string;
    firstName: string;
    text: string;
    isAccepted: boolean;
    createdAt: string;
}

export interface ReviewEdit {
    id?: number;
    firstName: {
        value: string,
        isChanged: boolean,
    };
    secondName: {
        value: string,
        isChanged: boolean,
    };
    text: {
        value: string,
        isChanged: boolean,
    };
    isAccepted: {
        value: boolean,
        isChanged: boolean,
    };
}

export type CreateReviewDto = Pick<Review, 'firstName' | 'secondName' | 'text'>
export type UpdateReviewDto = Partial<CreateReviewDto> & Partial<{ isAccepted: boolean | undefined; }>

export const initialReviewEdit = (): ReviewEdit => {
    return {
        firstName: {
            value: '',
            isChanged: false,
        },
        secondName: {
            value: '',
            isChanged: false,
        },
        text: {
            value: '',
            isChanged: false,
        },
        isAccepted: {
            value: false,
            isChanged: false,
        },
    }
}