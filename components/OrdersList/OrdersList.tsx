import styles from './OrdersList.module.scss';
import OrderItem from "../OrderItem/OrderItem";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {OrderPreview} from "../../types/order";
import {useObserver} from "../../hooks/useObserver";
import {Api} from "../../utils/api";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const LIMIT = 10;

const OrdersList = () => {
    const [orders, setOrders] = useState<OrderPreview[]>([]);
    const {setEnableLoading, setDisableLoading} = useActions();
    const lastOrderRef = useRef<HTMLDivElement | null>(null);
    const isCanLoadMore = useRef(true);
    const {loading} = useTypedSelector(state => state.loading)

    useObserver(lastOrderRef as MutableRefObject<Element>, isCanLoadMore.current, loading, async () => {
        setEnableLoading();
        const newOrders = await Api().orders.getOrders(LIMIT, orders.length);
        if (newOrders.length) {
            setOrders([...orders, ...newOrders]);
        } else {
            isCanLoadMore.current = false;
        }
        setDisableLoading();
    })

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
                        {orders.map(order =>
                            <OrderItem order={order} />
                        )}
                    </div>
                    <div ref={lastOrderRef} />
                </div>
            </div>
        </div>
    );
};

export default OrdersList;