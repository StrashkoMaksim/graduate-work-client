import styles from './CustomSelect.module.scss';
import {FC, ReactNode} from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {FormHelperText} from "@mui/material";
import cn from "classnames";

interface CustomSelectProps {
    label: string;
    value: string | readonly string[] | number | undefined;
    onChange: (value: string | readonly string[] | number | undefined, name?: string) => void;
    error?: boolean;
    helperText?: string | null;
    disabled: boolean;
    name?: string;
    children: ReactNode;
    className?: string
}

const CustomSelect: FC<CustomSelectProps> = ({ label, value, onChange, error, helperText, disabled, name, className, children }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value, event.target.name);
    }

    return (
        <FormControl className={cn(styles.control, className)} variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
                id={'select-label-' + label}
                className={styles.label}
                error={error}
            >{label}</InputLabel>
            <Select
                // @ts-ignore
                value={value}
                onChange={handleChange}
                className={styles.input}
                label={label}
                labelId={'select-label-' + label}
                error={error}
                disabled={disabled}
                name={name}
            >
                {children}
            </Select>
            <FormHelperText
                className={styles.helperText}
                error={error}
            >{helperText}</FormHelperText>
        </FormControl>
    );
};

export default CustomSelect;