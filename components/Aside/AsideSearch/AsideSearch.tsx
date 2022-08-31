import React, {useEffect, useRef, useState} from 'react';
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import {useRouter} from "next/router";
import {debounce} from 'lodash';
import styles from './AsideSearch.module.scss'
import AsidePopper from "../AsidePopper/AsidePopper";

const AsideSearch = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>(router.query.q as string || '');
    const [debouncedValue, setDebouncedValue] = useState(value);

    const debounced = useRef(debounce((newValue) => {
        setDebouncedValue(newValue);

    }, 1000))
    useEffect(() => debounced.current(value), [value])

    useEffect(() => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, q: debouncedValue },
            },
            undefined,
            { shallow: true }
        );
    }, [debouncedValue])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <AsidePopper title={'Поиск'}>
            <CustomTextField
                value={value}
                onChange={changeHandler}
                placeholder={'Введите название'}
                className={styles.input}
            />
        </AsidePopper>
    );
};

export default AsideSearch;