import React, {FC} from 'react';
import {Alert, AlertColor, Snackbar} from "@mui/material";

interface CustomSnackbarProps {
    isOpen: boolean;
    onClose: () => void;
    text: string | null;
    severity: AlertColor
}

const CustomSnackbar: FC<CustomSnackbarProps> = ({ onClose, isOpen, text, severity }) => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;