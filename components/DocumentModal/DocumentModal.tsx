import React, {FC, useEffect, useState} from "react";
import {Button, MenuItem, ToggleButton, ToggleButtonGroup} from "@mui/material";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {Errors} from "../../types/errors";
import {
    CreateDocumentWithFileDto,
    CreateDocumentWithLinkDto, DocumentCategory,
    DocumentEdit,
    initialDocumentEditState
} from "../../types/document";
import styles from './DocumentModal.module.scss';
import {Api} from "../../utils/api";
import _ from "lodash";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {hasErrors} from "../../utils/validation/hasErrors";
import {exceptionsHandler} from "../../utils/api/exceptions/exceptions";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";
import {validateNewDocument} from "../../utils/validation/document";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";

interface DocumentModalProps {
    onClose: (reload?: boolean) => void;
}

const DocumentModal: FC<DocumentModalProps> = ({ onClose }) => {
    const [document, setDocument] = useState<DocumentEdit>(initialDocumentEditState);
    const [categories, setCategories] = useState<DocumentCategory[]>([]);
    const [type, setType] = useState<'link' | 'file'>('link');
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const categories = await Api().documents.getDocumentsCategories();
            setCategories(categories);
            setLoading(false);
        }
        fetchCategories();
    }, [])

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDocument = _.clone(document);
        // @ts-ignore
        newDocument[event.currentTarget.name] = {
            value: event.currentTarget.value,
            isChanged: true
        };
        setDocument(newDocument);
    }

    const changeCategoryHandler = async (categoryId: number) => {
        const newDocument = _.clone(document);
        newDocument.categoryId = {
            value: categoryId,
            isChanged: true,
        };
        setDocument(newDocument);
    }

    const changeTypeHandler = (event: any, value: string) => {
        if (value === 'link' || value === 'file') {
            setType(value);
        }
    }

    const addFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.set('file', event.target.files[0]);
            try {
                const response = await Api().files.uploadFile(formData);
                const newDocument = _.clone(document);
                newDocument.file = response;
                setDocument(newDocument);
            } catch (e) {
                enqueueSnackbar('Ошибка при загрузке файла', {variant: "error"});
            }
        }
        setLoading(false);
    }

    const createDocumentHandler = async () => {
        setLoading(true);
        const {errors, dto} = validateNewDocument(type, document);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            setLoading(false);
            return;
        }

        try {
            if (type === 'link') {
                await Api().documents.createDocumentWithLink(dto as CreateDocumentWithLinkDto);
            } else {
                await Api().documents.createDocumentWithFile(dto as CreateDocumentWithFileDto);
            }
            onClose(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
        setLoading(false);
    }

    return (
        <div className={styles.form}>
            <CustomTextField
                label='Название'
                name='name'
                error={Boolean(errors.name)}
                helperText={errors.name as string}
                value={document.name.value}
                onChange={changeTextHandler}
            />
            <CustomSelect
                label='Категория'
                value={document.categoryId.value}
                // @ts-ignore
                onChange={changeCategoryHandler}
                error={!!errors.categoryId}
                helperText={errors.categoryId as string}
                disabled={loading}
            >
                {categories?.map(category =>
                    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                )}
            </CustomSelect>
            <ToggleButtonGroup
                color="primary"
                value={type}
                exclusive
                onChange={changeTypeHandler}
            >
                <ToggleButton value="link">Ссылка</ToggleButton>
                <ToggleButton value="file">Файл</ToggleButton>
            </ToggleButtonGroup>
            {type === 'link' &&
                <CustomTextField
                    label='Ссылка'
                    name='link'
                    error={Boolean(errors.link)}
                    helperText={errors.link as string}
                    value={document.link.value}
                    onChange={changeTextHandler}
                />
            }
            {type === 'file' &&
                <>
                    {document.file.filename && <p>Файл загружен</p>}
                    {errors.file &&
                        <ErrorParagraph className={styles.error}>{errors.file as string}</ErrorParagraph>
                    }
                    <Button
                        variant="contained"
                        component="label"
                        className={styles.loadPreviewBtn}
                    >
                        Загрузить файл
                        <input
                            onChange={addFileHandler}
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                            hidden
                        />
                    </Button>
                </>
            }
            <CustomButton variant={ButtonType.blue} text='Добавить' onClick={createDocumentHandler} />
        </div>
    );
};

export default DocumentModal;