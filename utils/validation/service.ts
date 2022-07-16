import {Errors} from "../../types/errors";
import {CreateServiceDto, ServiceEdit, UpdateServiceDto} from "../../types/service";

export const validateNewService = (service: ServiceEdit) => {
    const errors: Errors = {};
    const dto: CreateServiceDto = {
        name: service.name.value,
        price: Number.parseFloat(service.price.value),
        categoryId: service.categoryId.value || 0,
    }

    if (!service.name.value) {
        errors.name = 'Название не может быть пустым';
    }

    if (!service.price.value) {
        errors.price = 'Цена не может быть пустой';
    }

    if (!service.categoryId.value) {
        errors.categoryId = 'Не выбрана категория услуги';
    }

    return {errors, dto};
}

export const validateChangedService = (service: ServiceEdit) => {
    const errors: Errors = {};
    const dto: UpdateServiceDto = {}

    if (service.name.isChanged) {
        if (!service.name.value) {
            errors.name = 'Название не может быть пустым';
        } else {
            dto.name = service.name.value;
        }
    }

    if (service.price.isChanged) {
        if (!service.price.value) {
            errors.price = 'Цена не может быть пустой';
        } else {
            dto.price = Number.parseFloat(service.price.value);
        }
    }

    if (service.categoryId.isChanged) {
        dto.categoryId = service.categoryId.value as number;
    }

    return {errors, dto};
}