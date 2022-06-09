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
                title='Карта'
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7b43d20b37b7e529b551f52f39fa8572ad674b9deff7ae14ed99cc6a242083d6&amp;source=constructor"
                width="100%" frameBorder="0"
            />
        </PreviewBlock>
    );
};

export default MapBlock;