import React, {FC, useState} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './CommentsForm.module.scss';
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {Errors} from "../../types/errors";
import {Api} from "../../utils/api";

interface CommentFormProps {
    onAdd: () => void;
}

const CommentForm: FC<CommentFormProps> = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const {id} = router.query;

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (text) {
                await Api().comments.createComment(Number(id), text);
                setText('');
                onAdd();
            }
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <CustomTextField
                label='Добавить комментарий'
                value={text}
                onChange={changeTextHandler}
                multiline
            />
            <CustomButton variant={ButtonType.blue} text='Добавить' additionalClass={styles.btn} />
        </form>
    );
};

export default CommentForm;