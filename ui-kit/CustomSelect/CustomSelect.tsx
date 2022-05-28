import styles from './CustomSelect.module.scss';
import {FC, ReactNode} from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectProps {
    label: string;
    value: string | readonly string[] | number | undefined
    onChange: (value: string | readonly string[] | number | undefined) => void
    children: ReactNode
}

const CustomSelect: FC<CustomSelectProps> = ({ label, value, onChange, children }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value)
    }

    return (
        <FormControl className={styles.control} variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={'select-label-' + label} className={styles.label}>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                className={styles.input}
                label={label}
                labelId={'select-label-' + label}
            >
                {children}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;