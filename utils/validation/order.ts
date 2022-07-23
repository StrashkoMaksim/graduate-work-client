import {Errors} from "../../types/errors";
import {CreateServiceDto, ServiceEdit, UpdateServiceDto} from "../../types/service";
import {CreateOrderDto, OrderEditing, UpdateOrderDto} from "../../types/order";

export const validateNewOrder = (order: OrderEditing) => {
    const errors: Errors = {};
    const dto: CreateOrderDto = {
        fio: order.fio.value,
        phone: order.phone.value,
        sourceId: order.source.value as number,
        statusId: order.status.value as number,
    }

    if (!order.fio.value) {
        errors.fio = 'ФИО не может быть пустым';
    }

    if (order.phone.value.length !== 18) {
        errors.phone = 'Некорректный телефон';
    }

    if (!order.source.value) {
        errors.source = 'Не выбран источник';
    }

    if (!order.status.value) {
        errors.status = 'Не выбран статус';
    }

    if (order.cart.value.length) {
        dto.cart = [];
        for (const item of order.cart.value) {
            if (!item.name || !item.price || !item.count) {
                errors.cart = 'Один из товаров некорректно заполнен';
                break;
            }
            dto.cart.push({
                name: item.name,
                count: item.count,
                price: Number.parseFloat(item.price),
            })
        }
    }

    return {errors, dto};
}

export const validateChangedOrder = (order: OrderEditing) => {
    const errors: Errors = {};
    const dto: UpdateOrderDto = {}

    if (order.fio.isChanged) {
        if (!order.fio.value) {
            errors.fio = 'ФИО не может быть пустым';
        } else {
            dto.fio = order.fio.value;
        }
    }

    if (order.phone.isChanged) {
        if (order.phone.value.length !== 18) {
            errors.phone = 'Некорректный телефон';
        } else {
            dto.phone = order.phone.value;
        }
    }

    if (order.status.isChanged) {
        dto.statusId = order.status.value as number;
    }

    if (order.source.isChanged) {
        dto.sourceId = order.source.value as number;
    }

    if (order.cart.isChanged) {
        dto.cart = [];
        for (const item of order.cart.value) {
            if (!item.name || !item.price || !item.count) {
                errors.cart = 'Один из товаров некорректно заполнен';
                break;
            }
            dto.cart.push({
                name: item.name,
                count: item.count,
                price: Number.parseFloat(item.price),
            })
        }
    }

    return {errors, dto};
}