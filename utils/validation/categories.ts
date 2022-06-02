import {Errors} from "../../types/errors";
import {CategoryCharacteristics, CategoryEditing, CreateCategoryDto, UpdateCategoryDto} from "../../types/category";

export const validateNewCategory = (category: CategoryEditing) => {
    const errors: Errors = {};
    const dto: CreateCategoryDto = {
        name: category.name.value,
        characteristics: {},
        isMain: category.isMain.value
    };

    if (!category.name.value) {
        errors.name = 'Название не может быть пустым';
    }

    if (category.characteristics) {
        const characteristics: CategoryCharacteristics = {}
        let mainCount = 0
        const namesSet = new Set<string>()
        Object.keys(category.characteristics).forEach(id => {
            const idNum = Number(id);
            if (!category.characteristics[idNum].name) {
                errors.characteristics = 'Одна из характеристик не заполнена'
            } else if (namesSet.has(category.characteristics[idNum].name)) {
                errors.characteristics = 'Характеристики не могут иметь одинаковые имена'
            } else {
                namesSet.add(category.characteristics[idNum].name)
            }

            characteristics[category.characteristics[idNum].name] = {
                type: category.characteristics[idNum].type,
                isMain: category.characteristics[idNum].isMain,
            }

            if (category.characteristics[idNum].isMain) {
                mainCount++
            }
        })
        if (mainCount !== 2) {
            errors.characteristics = 'В карточке должно быть 2 характеристики'
        }
        dto.characteristics = characteristics;
    } else {
        errors.characteristics = 'Характеристики не могут быть пустыми';
    }

    return { errors, dto }
}

export const validateChangedCategory = (category: CategoryEditing) => {
    const errors: Errors = {};
    const dto: UpdateCategoryDto = {};

    if (category.name.isChanged) {
        if (!category.name.value) {
            errors.name = 'Название не может быть пустым';
        } else {
            dto.name = category.name.value;
        }
    }

    if (category.isMain.isChanged) {
        dto.isMain = category.isMain.value;
    }

    if (category.characteristics) {
        const characteristics: CategoryCharacteristics = {}
        let mainCount = 0
        let isChanged = false;
        const namesSet = new Set<string>()
        Object.keys(category.characteristics).forEach(id => {
            const idNum = Number(id);
            if (!category.characteristics[idNum].name) {
                errors.characteristics = 'Одна из характеристик не заполнена'
            } else if (namesSet.has(category.characteristics[idNum].name)) {
                errors.characteristics = 'Характеристики не могут иметь одинаковые имена'
            } else {
                namesSet.add(category.characteristics[idNum].name)
            }

            if (!category.characteristics[idNum].isSaved) {
                characteristics[category.characteristics[idNum].name] = {
                    type: category.characteristics[idNum].type,
                    isMain: category.characteristics[idNum].isMain,
                }
                isChanged = true;
            }

            if (category.characteristics[idNum].isMain) {
                mainCount++;
            }
        })
        if (isChanged) {
            dto.characteristics = characteristics;
        }
        if (mainCount !== 2) {
            errors.characteristics = 'В карточке должно быть 2 характеристики'
        }
    } else {
        errors.characteristics = 'Характеристики не могут быть пустыми';
    }

    return {errors, dto}
}