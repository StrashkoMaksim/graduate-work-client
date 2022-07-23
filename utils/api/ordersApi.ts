import {AxiosInstance} from "axios";
import {CreateServiceDto, Service, UpdateServiceDto} from "../../types/service";
import {CreateOrderDto, CreateOrderFromCartDto, Order, OrderPreview, Source} from "../../types/order";

export const OrdersApi = (instance: AxiosInstance) => ({
    async getOrders(limit: number, offset: number): Promise<OrderPreview[]> {
        const {data} = await instance.get<OrderPreview[]>(`orders?limit=${limit}&offset=${offset}`);
        return data;
    },
    async getOrder(id: number): Promise<Order> {
        const {data} = await instance.get(`orders/${id}`)
        return data
    },
    async createOrder(dto: CreateOrderDto): Promise<string> {
        const {data} = await instance.post<CreateOrderDto, { data: string }>('orders', dto)
        return data
    },
    async createOrderFromCart(dto: CreateOrderFromCartDto): Promise<string> {
        const {data} = await instance.post<CreateOrderFromCartDto, { data: string }>('orders/cart', dto)
        return data
    },
    async updateOrder(id: number, dto: UpdateServiceDto): Promise<string> {
        const {data} = await instance.put<UpdateServiceDto, { data: string }>(`orders/${id}`, dto)
        return data
    },
    async deleteOrder(id: number): Promise<string> {
        const {data} = await instance.delete(`orders/${id}`)
        return data
    },
})