import Link from "next/link";
import styles from './NotFound.module.scss'
import cn from "classnames";
import {useCallback, useState} from "react";
import {useRouter} from "next/router";

const NotFound = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onClearClickHandler = useCallback(() => {
        setSearch('');
    }, [])

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search) {
            router.push(`/search?category=articles&q=${search}`)
        }
    }

    return (
        <div className='section'>
            <div className={cn('container', styles.container)}>
                <picture>
                    <source srcSet="/img/404_small.svg" media="(max-width: 480px)" />
                    <source srcSet="/img/404_middle.svg" media="(max-width: 960px)" />
                    <img src="/img/404_big.svg" alt="Страница не найдена" />
                </picture>
                <h1>Страница не найдена</h1>
                <p>К сожалению страница была удалена или ее никогда не было.</p>
                <p>Вы можете перейти <Link href='/'><a>на главную</a></Link> или воспользоваться поиском.</p>
                <form className={styles.search} onSubmit={onSubmitHandler}>
                    <div className={styles.input}>
                        <img src="/img/search_1.svg" />
                        <input name="search" placeholder="Поиск по сайту" value={search} onChange={onSearchChange} />
                        {search ? <button className={styles.clear} type="button" onClick={onClearClickHandler} /> : ''}
                    </div>
                    <button className={styles.submit} type="submit" disabled={!search}>Найти</button>
                </form>
            </div>
        </div>
    );
};

export default NotFound;