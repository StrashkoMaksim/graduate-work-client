import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Embed from '@editorjs/embed';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Carousel from '@vietlongn/editorjs-carousel';
import Danger from '../components/Editor/Danger'
import {Api} from "../utils/api";

export const useEditor = () => {
    const editorTools = {
        list: List,
        image: {
            class: Image,
            config: {
                buttonContent: 'Выберите картинку',
                captionPlaceholder: 'Описание (необязательно)',
                types: '.jpg',
                uploader: {
                    uploadByFile: async (file: Blob) => { // async because it expects a promise
                        const formData = new FormData();
                        formData.set('file', file, 'image.jpg');
                        const response = await Api().files.uploadImage(formData);

                        return {
                            success: 1,
                            file: {
                                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${response.filename}`,
                                name: response.fileId,
                                size: file.size,
                                source: file
                            }
                        }
                    }
                }
            }
        },
        carousel: {
            class: Carousel,
            config: {
                buttonContent: 'Выберите картинку',
                captionPlaceholder: 'Описание (необязательно)',
                types: '.jpg',
                uploader: {
                    uploadByFile: async (file: Blob) => { // async because it expects a promise
                        const formData = new FormData();
                        formData.set('file', file, 'image.jpg');
                        const response = await Api().files.uploadImage(formData);

                        return {
                            success: 1,
                            file: {
                                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/tmp/${response.filename}`,
                                name: response.fileId,
                                size: file.size,
                                source: file
                            }
                        }
                    }
                }
            }
        },
        header: {
            class: Header,
            config: {
                placeholder: 'Заголовок',
                levels: [2, 3],
                defaultLevel: 2,
            }
        },
        underline: Underline,
        embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
                services: {
                    youtube: true,
                    // тут можно свои сервисы добавлять
                }
            }
        },
        warning: {
            class: Warning,
            inlineToolbar: true,
            config: {
                titlePlaceholder: 'Заголовок',
                messagePlaceholder: 'Описание',
            },
        },
        danger: {
            class: Danger,
            inlineToolbar: true,
            config: {
                titlePlaceholder: 'Заголовок',
                messagePlaceholder: 'Описание',
            },
            classes: {

            }
        },
        delimiter: Delimiter,
        table: {
            class: Table,
            inlineToolbar: true,
            config: {
                rows: 2,
                cols: 3,
            },
        },
    }

    const localization = {
        messages: {
            ui: {
                "blockTunes": {
                    "toggler": {
                        "Click to tune": "Нажмите, чтобы настроить",
                        "or drag to move": "или перетащите"
                    },
                },
                "inlineToolbar": {
                    "converter": {
                        "Convert to": "Конвертировать в"
                    }
                },
                "toolbar": {
                    "toolbox": {
                        "Add": "Добавить"
                    }
                }
            },
            toolNames: {
                "Text": "Параграф",
                "Heading": "Заголовок",
                "List": "Список",
                "Warning": "Примечание",
                "Danger": "Важно",
                "Delimiter": "Разделитель",
                "Bold": "Полужирный",
                "Italic": "Курсив",
                "InlineCode": "Моноширинный",
                "Image": "Картинка",
                "Carousel": "Галерея",
                "Table": "Таблица"
            },
            tools: {
                "warning": { // <-- 'Warning' tool will accept this dictionary section
                    "Title": "Название",
                    "Message": "Сообщение",
                },
                "stub": {
                    'The block can not be displayed correctly.': 'Блок не может быть отображен'
                },
                "embed": {
                    "Enter a caption": "Описание (необязательно)"
                },
                "carousel": {
                    " Add Image": "Вставьте картинку"
                },
                "table": {
                    "Delete column": "Удалить колонку",
                    "Add column to left": "Добавить колонку слева",
                    "Add column to right": "Добавить колонку справа",
                    "Add row above": "Добавить строку выше",
                    "Add row below": "Добавить строку ниже",
                    "Delete row": "Удалить строку",
                    "With headings": "С заголовками",
                    "Without headings": "Без заголовков"
                }
            },
            blockTunes: {
                "delete": {
                    "Delete": "Удалить"
                },
                "moveUp": {
                    "Move up": "Переместить вверх"
                },
                "moveDown": {
                    "Move down": "Переместить вниз"
                }
            },
        }
    }

    return { editorTools, localization }
}