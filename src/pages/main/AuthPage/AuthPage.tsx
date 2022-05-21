import React, {FormEvent, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {FormControl, Input, InputLabel} from "@mui/material";
import {PhoneInput} from "../../../ui-kit/PhoneInput/PhoneInput";
import Button, {ButtonType} from "../../../ui-kit/Button/Button";
import axios from "axios";

const AuthPage = () => {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState("")
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (phone.length !== 18) {
            return
        }

        if (!recaptchaRef.current?.getValue()) return

        // // @ts-ignore
        // const token = await recaptchaRef.current.executeAsync();
        //
        // console.log(recaptchaRef.current)
        //
        // const response = await axios.post('http://localhost:5000/auth/test', {token, phone})
        //
        // console.log(response)
    }

    const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                size="normal"
                sitekey="6Lefcf8fAAAAAJd1MbznOyS2F59lv-0VXAOY9iLB"
            />
            <Button type={ButtonType.blue} text='Войти' additionalClass={"auth"} />
        </form>
    );
};

export default AuthPage;