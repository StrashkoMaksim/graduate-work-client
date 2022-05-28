import {useEditor} from "../../hooks/useEditor";
import EditorJS, {OutputData} from '@editorjs/editorjs';
import { FC, useEffect} from "react";
import styles from './Editor.module.scss'
import cn from "classnames";

interface EditorProps {
    blocks: OutputData['blocks']
    onChange: (blocks: OutputData['blocks']) => void
}

export const Editor: FC<EditorProps> = ({ blocks, onChange }) => {
    const {editorTools, localization} = useEditor();

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Начните свою историю...',
            i18n: localization,
            tools: editorTools,
            data: {blocks},
            async onChange() {
                const { blocks } = await editor.save();
                onChange(blocks)
            }
        })

        return () => {
            editor.isReady
                .then(() => {
                    editor.destroy();
                })
                .catch((e) => console.error('ERROR editor cleanup', e));
        }
    }, [])

    return (
        <div className={cn('section', styles.section)}>
            <div className={cn('container', styles.container)}>
                <div className={styles.blank}>
                    <div id='editor' className={styles.editor} />
                </div>
            </div>
        </div>
    )
};

export default Editor;