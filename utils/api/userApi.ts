import {AxiosInstance} from "axios";
import {LoginResponse, LoginUserDto} from "../../types/user";

export const UserApi = (instance: AxiosInstance) => ({
    async checkAuth(): Promise<string> {
        const {data} = await instance.get('auth/check-auth')
        return data
    },
    async login(dto: LoginUserDto): Promise<LoginResponse> {
        const {data} = await instance.post<LoginUserDto, { data: LoginResponse }>('auth/login', dto);
        return data;
    }
})