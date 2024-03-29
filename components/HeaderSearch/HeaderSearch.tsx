import React, {FormEvent, useState} from 'react';
import cn from "classnames";
import styles from "./HeaderSearch.module.scss";
import {ClickAwayListener} from "@mui/material";
import {useRouter} from "next/router";

const HeaderSearch = () => {
    const [inputText, setInputText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const inputHandler = (event: FormEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value)
    }

    const cancelClickHandler = () => {
        setInputText('')
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const submitClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (window.innerWidth <= 1050 && !isOpen) {
            event.stopPropagation()
            setIsOpen(true)
        } else {
            router.push(`/search?category=articles&q=${inputText}`)
            setInputText('')
            setIsOpen(false)
        }
    }

    const clickAwayHandler = () => {
        setIsOpen(false)
    }

    return (
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <form className={styles.Search} onSubmit={ submitHandler }>
                <button className={styles.SearchSubmit} onClick={submitClickHandler}>
                    <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M10.4906 2.24798C5.93831 2.24798 2.24798 5.93831 2.24798 10.4906C2.24798 15.0428 5.93831 18.7331 10.4906 18.7331C15.0428 18.7331 18.7331 15.0428 18.7331 10.4906C18.7331 5.93831 15.0428 2.24798 10.4906 2.24798ZM0 10.4906C0 4.69678 4.69678 0 10.4906 0C16.2843 0 20.9811 4.69678 20.9811 10.4906C20.9811 16.2843 16.2843 20.9811 10.4906 20.9811C4.69678 20.9811 0 16.2843 0 10.4906Z"
                              fill="#85999F"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M16.5646 16.5646C17.0035 16.1256 17.7152 16.1256 18.1541 16.5646L21.9007 20.3112C22.3397 20.7501 22.3397 21.4618 21.9007 21.9007C21.4618 22.3397 20.7501 22.3397 20.3112 21.9007L16.5646 18.1541C16.1256 17.7152 16.1256 17.0035 16.5646 16.5646Z"
                              fill="#85999F"/>
                    </svg>
                </button>
                <div className={cn(styles.SearchWrapper, {[styles.active]: isOpen})}>
                    <input type="text" placeholder="Поиск..." name='search' value={inputText} onInput={inputHandler} />
                    <button className={cn(styles.SearchCancel, { [styles.active]: inputText.length })} type="button"
                            onClick={ cancelClickHandler }
                    />
                </div>
            </form>
        </ClickAwayListener>
    );
};

export default HeaderSearch;