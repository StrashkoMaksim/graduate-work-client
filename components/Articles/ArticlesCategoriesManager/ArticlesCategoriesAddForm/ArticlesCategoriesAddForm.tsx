import styles from './ArticlesCategoriesAddForm.module.scss'
import {TextField} from "@mui/material";
import CustomButton, {ButtonType} from "../../../../ui-kit/CustomButton/CustomButton";
import React, {FormEvent, useState} from "react";
import {useActions} from "../../../../hooks/useActions";

const ArticlesCategoriesAddForm = () => {
    const [inputValue, setInputValue] = useState('')
    const [isInputError, setIsInputError] = useState('')
    const {addArticlesCategories} = useActions()

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (!inputValue) {
            setIsInputError('Обязательное поле')
            return
        }

        addArticlesCategories(inputValue);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <TextField
                label='Новая категория'
                variant={"standard"}
                className={styles.input}
                value={inputValue}
                onChange={inputChangeHandler}
                placeholder='Новая категория'
                error={Boolean(isInputError)}
                helperText={isInputError}
            />
            <CustomButton variant={ButtonType.blue} text='Добавить' additionalClass={styles.btn} />
        </form>
    );
};

export default ArticlesCategoriesAddForm;