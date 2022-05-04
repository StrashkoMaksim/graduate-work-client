// import List from "@editorjs/list";
// import LinkTool from "@editorjs/link";
// import Image from "@editorjs/image";
// import Header from "@editorjs/header";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import SimpleImage from "@editorjs/simple-image";
//
export const useEditor = () => {
//     const editorTools = {
//         list: List,
//         linkTool: LinkTool,
//         image: {
//             class: Image,
//             config: {
//                 types: '.jpg',
//                 uploader: {
//                     uploadByFile: async (file: Blob | MediaSource) => { // async because it expects a promise
//                         const url = window.URL.createObjectURL(file) // generate a blob in memory
//
//                         return {
//                             success: 1,
//                             file: {
//                                 url,
//                                 // @ts-ignore
//                                 name: file.name,
//                                 // @ts-ignore
//                                 size: file.size,
//                                 source: file // keep a reference to the original file
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         header: Header,
//         quote: Quote,
//         marker: Marker,
//         simpleImage: SimpleImage,
//     }
//
//     const localization = {
//         messages: {
//             ui: {
//                 "blockTunes": {
//                     "toggler": {
//                         "Click to tune": "Нажмите, чтобы настроить",
//                         "or drag to move": "или перетащите"
//                     },
//                 },
//                 "inlineToolbar": {
//                     "converter": {
//                         "Convert to": "Конвертировать в"
//                     }
//                 },
//                 "toolbar": {
//                     "toolbox": {
//                         "Add": "Добавить"
//                     }
//                 }
//             },
//             toolNames: {
//                 "Text": "Параграф",
//                 "Heading": "Заголовок",
//                 "List": "Список",
//                 "Warning": "Примечание",
//                 "Checklist": "Чеклист",
//                 "Code": "Код",
//                 "Delimiter": "Разделитель",
//                 "Raw HTML": "HTML-фрагмент",
//                 "Table": "Таблица",
//                 "Marker": "Маркер",
//                 "Bold": "Полужирный",
//                 "Italic": "Курсив",
//                 "InlineCode": "Моноширинный",
//                 "Image": "Картинка"
//             },
//             tools: {
//                 "warning": { // <-- 'Warning' tool will accept this dictionary section
//                     "Title": "Название",
//                     "Message": "Сообщение",
//                 },
//                 "link": {
//                     "Add a link": "Вставьте ссылку"
//                 },
//                 "stub": {
//                     'The block can not be displayed correctly.': 'Блок не может быть отображен'
//                 }
//             },
//             blockTunes: {
//                 "delete": {
//                     "Delete": "Удалить"
//                 },
//                 "moveUp": {
//                     "Move up": "Переместить вверх"
//                 },
//                 "moveDown": {
//                     "Move down": "Переместить вниз"
//                 }
//             },
//         }
//     }
//
//     return { editorTools, localization }
}