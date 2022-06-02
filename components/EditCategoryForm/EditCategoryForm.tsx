import React, {FC} from "react";
import {Errors} from "../../types/errors";
import cn from "classnames";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import styles from './EditCategoryForm.module.scss'
import {CategoryCharacteristicsType, CategoryEditing} from "../../types/category";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import _ from "lodash";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import {Checkbox, FormControlLabel, MenuItem} from "@mui/material";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";

interface EditProductFormProps {
    category: CategoryEditing;
    setCategory: (value: CategoryEditing) => void;
    errors: Errors;
}

const EditCategoryForm: FC<EditProductFormProps> = ({ category, setCategory, errors }) => {
    const { loading } = useTypedSelector(state => state.loading)

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = _.clone(category);
        newCategory.name = {
            value: event.target.value,
            isChanged: true,
        }
        setCategory(newCategory);
    }

    const changeIsMainHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = _.clone(category);
        newCategory.isMain = {
            value: event.target.checked,
            isChanged: true,
        }
        setCategory(newCategory);
    }

    const changeCharacteristicNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = _.clone(category);
        newCategory.characteristics[Number(event.target.name)].name = event.target.value;
        setCategory(newCategory);
    }

    const changeCharacteristicTypeHandler = (type: string, name: string) => {
        if (type === CategoryCharacteristicsType.String || type === CategoryCharacteristicsType.Integer ||
            type === CategoryCharacteristicsType.Double || type === CategoryCharacteristicsType.Double
        ) {
            const newCategory = _.clone(category);
            newCategory.characteristics[Number(name)].type = type;
            setCategory(newCategory);
        }
    }

    const changeCharacteristicIsMainHandler = (value: string, name: string) => {
        const newCategory = _.clone(category);
        if (value === 'Да') {
            newCategory.characteristics[Number(name)].isMain = true;
        } else {
            newCategory.characteristics[Number(name)].isMain = false;
        }
        setCategory(newCategory);
    }

    const deleteCharacteristicHandler = (id: number) => () => {
        if (Object.keys(category.characteristics).length > 2) {
            const newCategory = _.clone(category);
            delete newCategory.characteristics[id];
            setCategory(newCategory);
        }
    }

    const addCharacteristicHandler = () => {
        const newCategory = _.clone(category);
        const lastId = Object.keys(newCategory.characteristics).length
        newCategory.characteristics[lastId + 1] = {
            name: '',
            type: CategoryCharacteristicsType.String,
            isMain: false,
            isSaved: false,
        }
        setCategory(newCategory);
    }

    return (
        <div className='section'>
            <div className={cn("container", styles.container)}>
                <CustomTextField
                    name='name'
                    className={styles.input}
                    label='Название'
                    value={category.name.value}
                    onChange={changeNameHandler}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={loading}
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={category.isMain.value} onChange={changeIsMainHandler} disabled={loading} />
                    }
                    label="Показывать на главной"
                />
                <div className={styles.characteristics}>
                    <h4>Характеристики</h4>
                    {Object.keys(category.characteristics).map((idStr) => {
                        const id = Number(idStr);
                        return (
                            <div className={cn(styles.characteristic, {[styles.withoutDelete]: category.characteristics[Number(id)].isSaved})} key={id}>
                                <CustomTextField
                                    label='Название'
                                    name={String(id)}
                                    value={category.characteristics[id].name}
                                    onChange={changeCharacteristicNameHandler}
                                    disabled={loading || category.characteristics[id].isSaved}
                                />
                                <CustomSelect
                                    label='Тип значения'
                                    value={category.characteristics[id].type}
                                    // @ts-ignore
                                    onChange={changeCharacteristicTypeHandler}
                                    name={String(id)}
                                    disabled={loading || category.characteristics[id].isSaved}
                                >
                                    <MenuItem value={CategoryCharacteristicsType.String}>Текст</MenuItem>
                                    <MenuItem value={CategoryCharacteristicsType.Integer}>Целое число</MenuItem>
                                    <MenuItem value={CategoryCharacteristicsType.Double}>Дробное число</MenuItem>
                                    <MenuItem value={CategoryCharacteristicsType.Boolean}>Да/Нет</MenuItem>
                                </CustomSelect>
                                <CustomSelect
                                    label='Есть в карточке?'
                                    value={category.characteristics[id].isMain ? 'Да' : 'Нет'}
                                    // @ts-ignore
                                    onChange={changeCharacteristicIsMainHandler}
                                    name={String(id)}
                                    disabled={loading || category.characteristics[id].isSaved}
                                >
                                    <MenuItem value='Да'>Да</MenuItem>
                                    <MenuItem value='Нет'>Нет</MenuItem>
                                </CustomSelect>
                                {!category.characteristics[id].isSaved &&
                                    <button
                                        className={styles.deleteCharacteristic}
                                        onClick={deleteCharacteristicHandler(id)}
                                        disabled={loading}
                                    /> }
                            </div>
                        )
                    })}
                    {errors.characteristics && <ErrorParagraph>{errors.characteristics}</ErrorParagraph>}
                    <CustomButton
                        variant={ButtonType.blue}
                        text='Добавить характеристику'
                        additionalClass={styles.addCharacteristic}
                        onClick={addCharacteristicHandler}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditCategoryForm;