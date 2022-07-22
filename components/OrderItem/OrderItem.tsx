import styles from './OrderItem.module.scss';
import Link from "next/link";

const OrderItem = () => {
    return (
        <Link href={'#'}>
            <a className={styles.item}>
                <span><span className={styles.fieldName}>ID: </span>1</span>
                <span><span className={styles.fieldName}>ФИО: </span>Страшко Максим Тарасович</span>
                <span><span className={styles.fieldName}>Телефон: </span>+7 (999) 087-79-40</span>
                <span><span className={styles.fieldName}>Источник: </span>Корзина</span>
                <span className={styles.status}><span>Новый</span></span>
                <span><span className={styles.fieldName}>Сумма заказа: </span>100 000 руб.</span>
                <span><span className={styles.fieldName}>Изменено: </span>22.05.2022</span>
                <span><span className={styles.fieldName}>Создано: </span>20.05.2022</span>
            </a>
        </Link>
    );
};

export default OrderItem;