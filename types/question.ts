export interface QuestionDTO {
    name: string;
    phone: string;
    text: string;
    isAgreed: boolean;
}

export const initialQuestionDTO = (): QuestionDTO => {
    return {
        name: '',
        phone: '',
        text: '',
        isAgreed: true,
    }
}