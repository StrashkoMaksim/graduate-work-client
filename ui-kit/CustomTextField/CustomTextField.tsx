import {TextField, TextFieldProps} from "@mui/material";
import styles from './CustomTextField.module.scss';
import {FC} from "react";

const CustomTextField: FC<any> = (props) => {
    return (
        <TextField
            classes={{
                root: styles.root,
            }}
            variant='standard'
            {...props}
        />
    );
};

export default CustomTextField;