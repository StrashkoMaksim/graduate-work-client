import styles from './OrdersList.module.scss';
import OrderItem from "../OrderItem/OrderItem";

const OrdersList = () => {
    return (
        <div className={'section'}>
            <div className={'container'}>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <span>ID</span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span>Источник</span>
                        <span>Статус</span>
                        <span>Сумма заказа</span>
                        <span>Изменено</span>
                        <span>Создано</span>
                    </div>
                    <div className={styles.grid}>
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersList;