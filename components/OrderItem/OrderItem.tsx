import styles from './OrderItem.module.scss';
import Link from "next/link";
import {OrderPreview} from "../../types/order";
import {FC} from "react";

interface OrderItemProps {
    order: OrderPreview;
}

const OrderItem: FC<OrderItemProps> = ({ order }) => {

    return (
        <Link href={`/admin/crm/order/${order.id}`}>
            <a className={styles.item}>
                <span><span className={styles.fieldName}>ID: </span>{order.id}</span>
                <span><span className={styles.fieldName}>ФИО: </span>{order.fio}</span>
                <span><span className={styles.fieldName}>Телефон: </span>{order.phone}</span>
                <span><span className={styles.fieldName}>Источник: </span>{order.source.name}</span>
                <span className={styles.status} style={{background: `#${order.status.color}`}}>
                    <span>{order.status.name}</span>
                </span>
                <span><span className={styles.fieldName}>Сумма заказа: </span>{order.priceSum.toLocaleString()} руб.</span>
                <span><span className={styles.fieldName}>Изменено: </span>{order.updatedAt}</span>
                <span><span className={styles.fieldName}>Создано: </span>{order.createdAt}</span>
            </a>
        </Link>
    );
};

export default OrderItem;