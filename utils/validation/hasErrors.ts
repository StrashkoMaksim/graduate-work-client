import {Errors} from "../../types/errors";
import {OptionsObject, SnackbarKey, SnackbarMessage} from "notistack";

export const hasErrors = (
    errors: Errors,
    setErrors: React.Dispatch<React.SetStateAction<Errors>>,
    enqueueSnackbar: (message: SnackbarMessage, options?: (OptionsObject | undefined)) => SnackbarKey
): boolean => {
    if (Object.keys(errors).length) {
        setErrors(errors);
        enqueueSnackbar('Проверьте правильность введенных данных', { variant: "error" });
        return true;
    } else {
        setErrors({});
        return false;
    }
}