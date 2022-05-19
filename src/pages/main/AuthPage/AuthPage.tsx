import React, {FormEvent, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {FormControl, Input, InputLabel} from "@mui/material";
import {PhoneInput} from "../../../ui-kit/PhoneInput/PhoneInput";

const AuthPage = () => {
    const [phone, setPhone] = useState('+7 (000) 000-00-00')
    const recaptchaRef = React.useRef(null);

    const submitHandler = async () => {
        // @ts-ignore
        const token = await recaptchaRef.current.executeAsync();
    }

    const phoneChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <FormControl variant="standard">
                <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
                <Input
                    value={phone}
                    onChange={phoneChangeHandler}
                    name="textmask"
                    id="formatted-text-mask-input"
                    inputComponent={PhoneInput as any}
                />
            </FormControl>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="Your client site key"
            />
        </form>
    );
};

export default AuthPage;