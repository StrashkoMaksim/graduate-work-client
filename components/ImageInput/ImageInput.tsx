import {Button} from "@mui/material";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";
import React, {FC, memo} from "react";
import styles from './ImageInput.module.scss';

interface ImageInputProps {
    filename: string;
    fileId?: number;
    error: string | string[];
    loading: boolean;
    changeImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loadText: string;
    replaceText: string;
}

const ImageInput: FC<ImageInputProps> = memo(({ filename, fileId, error, loading, changeImageHandler, loadText, replaceText }) => {
    return (
        <div>
            {filename &&
                <div className={styles.image}>
                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${fileId ? 'tmp' : 'images'}/${filename}`}
                    />
                </div>
            }
            <Button
                variant="contained"
                component="label"
                className={styles.loadPreviewBtn}
                disabled={loading}
            >
                {filename ? replaceText : loadText}
                <input
                    onChange={changeImageHandler}
                    type="file"
                    hidden
                />
            </Button>
            {error &&
                <ErrorParagraph className={styles.error}>{String(error)}</ErrorParagraph>
            }
        </div>
    );
});

export default ImageInput;