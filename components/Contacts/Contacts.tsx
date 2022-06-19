import Map from "../Map/Map";
import styles from './Contacts.module.scss'
import cn from "classnames";

const Contacts = () => {
    return (
        <div className='section'>
            <div className={cn('container', styles.container)}>
                <div className={styles.info}>
                    <div className={styles.item}>
                        <h2 className={styles.header}>Адрес</h2>
                        <p className={styles.text}>г. Хабаровск, ул. Союзная, д. 3Д, оф. 18 (остановка "Администрация")</p>
                    </div>
                    <div className={styles.item}>
                        <h2 className={styles.header}>Телефон</h2>
                        <a href="tel:+7 (914) 421-10-90" className={styles.link}>+7 (914) 421-10-90</a>
                    </div>
                    <div className={styles.item}>
                        <h2 className={styles.header}>Электронная почта</h2>
                        <a href="mailto:importstanok@gmail.com" className={styles.link}>importstanok@gmail.com</a>
                    </div>
                </div>
                <Map />
            </div>
        </div>
    );
};

export default Contacts;