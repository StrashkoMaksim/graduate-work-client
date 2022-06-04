import {CategoryCharacteristicsType} from "../../types/category";
import {FC} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {IMaskMixin} from "react-imask";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import {MenuItem} from "@mui/material";
import styles from './AdminProductCharacteristic.module.scss'

interface AdminProductCharacteristic {
    name: string
    type: CategoryCharacteristicsType;
    value: string | number | boolean | null;
    disabled: boolean;
    onChange: (value: string | number | boolean, name: string) => void;
}

const MaskedTextField = IMaskMixin(
    ({ inputRef, defaultValue, ...otherProps }) => (
        <CustomTextField {...otherProps} inputRef={inputRef} value={defaultValue} />
    )
)

const AdminProductCharacteristic: FC<AdminProductCharacteristic> = ({ name, type, value, disabled, onChange }) => {
    const changeCharacteristicHandler = (value: string) => {
        if (value === 'Да') {
            onChange(true, name);
        } else {
            onChange(false, name);
        }
    }

    const numberChangeHandler = (value: string) => {
        if (type === CategoryCharacteristicsType.Integer) {
            onChange(Number.parseInt(value), name);
        } else  {
            onChange(value, name);
        }
    }

    const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, name);
    }

    switch (type) {
        case CategoryCharacteristicsType.String:
            return (
                <CustomTextField
                    label={name}
                    value={value === null ? '' : String(value)}
                    disabled={disabled}
                    onChange={textChangeHandler}
                    className={styles.input}
                />
            )
        case CategoryCharacteristicsType.Integer:
            return (
                // @ts-ignore
                <MaskedTextField
                    mask={Number}
                    scale={0}
                    label={name}
                    value={value === null ? '' : String(value)}
                    onAccept={numberChangeHandler}
                    disabled={disabled}
                    className={styles.input}
                />
            )
        case CategoryCharacteristicsType.Double:
            return (
                // @ts-ignore
                <MaskedTextField
                    mask={Number}
                    radix="."
                    label={name}
                    value={value === null ? '' : String(value)}
                    onAccept={numberChangeHandler}
                    disabled={disabled}
                    className={styles.input}
                />
            )
        case CategoryCharacteristicsType.Boolean:
            return (
                <CustomSelect
                    label={name}
                    value={value ? 'Да' : 'Нет'}
                    // @ts-ignore
                    onChange={changeCharacteristicHandler}
                    disabled={disabled}
                    className={styles.input}
                >
                    <MenuItem value='Да'>Да</MenuItem>
                    <MenuItem value='Нет'>Нет</MenuItem>
                </CustomSelect>
            )
    }
};

export default AdminProductCharacteristic;