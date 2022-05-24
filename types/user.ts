export interface UserState {
    isAuth: boolean,
    error: null | string
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}