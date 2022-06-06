import {IMaskMixin} from "react-imask";
import CustomTextField from "../CustomTextField/CustomTextField";

const MaskedTextField = IMaskMixin(
    ({ inputRef, defaultValue, ...otherProps }) => (
        <CustomTextField {...otherProps} inputRef={inputRef} value={defaultValue} />
    )
)

export default MaskedTextField;