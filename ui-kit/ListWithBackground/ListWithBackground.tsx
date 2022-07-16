import React, {FC} from 'react';
import styles from './ListWithBackground.module.scss';
import cn from "classnames";

interface ListWithBackgroundProps {
    list: {
        id: number;
        name: string;
        value: string | number;
    }[];
}

const ListWithBackground: FC<ListWithBackgroundProps> = ({ list }) => {
    return (
        <div className={styles.list}>
            {list.map(item =>
                <div key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                </div>
            )}
        </div>
    );
};

export default ListWithBackground;