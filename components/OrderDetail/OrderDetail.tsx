import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {Api} from "../../utils/api";
import {Order} from "../../types/order";
import styles from './OrderDetail.module.scss';
import H2 from "../../ui-kit/H2/H2";
import Comments from "../Comments/Comments";
import cn from "classnames";

const OrderDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState<Order | null>(null);

    const fetchOrder = useCallback(async () => {
        const order = await Api().orders.getOrder(Number(id));
        setOrder(order);
    }, [])

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div className='section'>
            <div className={cn('container', styles.container)}>
                {order?.fio && <p><span className={styles.fieldName}>ФИО: </span>{order.fio}</p>}
                {order?.phone &&
                    <p>
                        <span className={styles.fieldName}>Номер телефона: </span>
                        <a href={`tel: ${order.phone}`} className={styles.phone}>{order.phone}</a>
                    </p>
                }
                {order?.source && <p><span className={styles.fieldName}>Источник: </span>{order.source.name}</p>}
                {order?.status && <p><span className={styles.fieldName}>Статус: </span>{order.status.name}</p>}
                {order?.createdAt && <p><span className={styles.fieldName}>Дата создания: </span>{order.createdAt}</p>}
                {order?.updatedAt && <p><span className={styles.fieldName}>Дата обновления: </span>{order.updatedAt}</p>}
                {order?.cart &&
                    <>
                        <H2 text='Корзина' className={styles.h2} />
                        <div className={styles.cart}>
                            {order.cart.length
                                ?
                                <>
                                    {order.cart.map((item, index) =>
                                        <div className={styles.cartItem} key={index}>
                                            <span>{item.name}</span>
                                            <span>{item.count} шт.</span>
                                            <span>{item.price.toLocaleString()} руб.</span>
                                        </div>
                                    )}
                                    <p><span className={styles.fieldName}>Сумма заказа: </span>{order.priceSum.toLocaleString()} руб.</p>
                                </>
                                : 'Корзина пустая'
                            }
                        </div>
                    </>
                }
                <H2 text='Комментарии' className={styles.h2} />
                {order?.comments && <Comments comments={order.comments} onAdd={fetchOrder} />}
            </div>
        </div>
    );
};

export default OrderDetail;