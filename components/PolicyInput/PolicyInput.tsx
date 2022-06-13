import {Checkbox, FormControl, FormControlLabel, FormHelperText} from "@mui/material";
import {FC} from "react";
import Link from "next/link";
import styles from './PolicyInput.module.scss'

interface PolicyInput {
    checked: boolean;
    onChange: (value: boolean) => void;
    error?: string;
}

const PolicyInput: FC<PolicyInput> = ({ checked, onChange, error }) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <FormControl
            className={styles.control}
            error={Boolean(error)}
        >
            <FormControlLabel
                className={styles.controlLabel}
                control={
                    <Checkbox checked={checked} onChange={changeHandler} className={styles.checkbox} />
                }
                label={
                    <span>
                        Я даю свое согласие на обработку моих персональных данных в соответствии с законом №152-ФЗ
                        «О персональных данных» от 27.07.2006 г. и принимаю условия <Link href='/policy'>
                            <a>Политики в отношении обработки персональных данных</a>
                        </Link>.
                    </span>
                }
            />
            <FormHelperText className={styles.error}>{error}</FormHelperText>
        </FormControl>
    );
};

export default PolicyInput;