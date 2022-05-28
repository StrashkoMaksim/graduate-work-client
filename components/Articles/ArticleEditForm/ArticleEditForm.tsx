import styles from './ArticleEditForm.module.scss'
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {OutputData} from "@editorjs/editorjs";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import cn from "classnames";
import dynamic from "next/dynamic";

const Editor = dynamic(() => {
    return import("../../Editor/Editor")
}, {ssr: false})

const ArticleEditForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState<OutputData['blocks']>([])

    const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const changeContentHandler = (blocks: OutputData['blocks']) => {
        setContent(blocks)
    }

    return (
        <>
            <div className='section'>
                <div className={cn("container", styles.container)}>
                    <CustomTextField
                        className={styles.input}
                        label='Заголовок'
                        variant='standard'
                        name='title'
                        value={title}
                        onChange={changeTitleHandler}
                    />
                    <CustomTextField
                        className={styles.input}
                        label='Краткое описание'
                        variant='standard'
                        name='description'
                        value={description}
                        onChange={changeDescriptionHandler}
                        multiline
                    />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </div>
            </div>
            <Editor blocks={content} onChange={changeContentHandler} />
        </>
    );
};

export default ArticleEditForm;