import {IMaskMixin} from "react-imask";
import CustomTextField from "../CustomTextField/CustomTextField";
import {TextFieldProps} from "@mui/material";
import {ComponentProps} from "react";

const InternalMaskTextField = IMaskMixin((props) => (
    <CustomTextField {...props as any} />
))

type MaskProps = ComponentProps<typeof InternalMaskTextField>

export const MaskedTextField = (props: TextFieldProps & MaskProps) => {
    return <InternalMaskTextField {...props} />
}

export default MaskedTextField;