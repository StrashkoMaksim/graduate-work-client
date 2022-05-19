import React from 'react';
import styles from './MapBlock.module.scss'
import PreviewBlock from "../PreviewBlock/PreviewBlock";

const MapBlock = () => {
    return (
        <PreviewBlock
            title='Где мы находимся'
            additionalClass={styles.block}
            allLink={{
                text: 'Наши контакты',
                link: '/contacts'
            }}
        >
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A47229930db9d3e1cb90e905d0202fa90f3e3abb70dbf97ba57f1c2bae37e9ff9&amp;source=constructor"
                width="100%" frameBorder="0"
            />
        </PreviewBlock>
    );
};

export default MapBlock;