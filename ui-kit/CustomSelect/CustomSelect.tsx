import styles from './CustomSelect.module.scss';
import {FC, ReactNode} from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {FormHelperText} from "@mui/material";

interface CustomSelectProps {
    label: string;
    value: string | readonly string[] | number | undefined;
    onChange: (value: string | readonly string[] | number | undefined) => void;
    error: boolean | undefined;
    helperText: string | null;
    children: ReactNode;
}

const CustomSelect: FC<CustomSelectProps> = ({ label, value, onChange, error, helperText, children }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value)
    }

    return (
        <FormControl className={styles.control} variant="standard" sx={{ m: 1, minWidth: 120 }}>
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