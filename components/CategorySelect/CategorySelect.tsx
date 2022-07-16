import {MenuItem} from "@mui/material";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import React, {FC} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface CategorySelectProps {
    value: string | number | readonly string[] | undefined;
    error: string | string[];
    changeCategory: (id: number) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({ value, error, changeCategory }) => {
    const {categories, loading} = useTypedSelector(state => state.catalogCategories)

    return (
        <CustomSelect
            label='Категория'
            value={value}
            // @ts-ignore
            onChange={changeCategory}
            error={!!error}
            helperText={error as string}
            disabled={loading}
        >
            {categories?.map(category =>
                <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
            )}
        </CustomSelect>
    );
};

export default CategorySelect;