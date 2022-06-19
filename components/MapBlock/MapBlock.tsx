import React from 'react';
import styles from './MapBlock.module.scss'
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import Map from "../Map/Map";

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
            <Map />
        </PreviewBlock>
    );
};

export default MapBlock;