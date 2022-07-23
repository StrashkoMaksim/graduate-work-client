import {ProductForCart} from "../../types/product";
import {FC, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './Cart.module.scss'
import {useActions} from "../../hooks/useActions";
import {CartEntities} from "../../types/cart";
import Link from "next/link";

interface CartProps {
    products: ProductForCart[]
}

const Cart: FC<CartProps> = ({ products }) => {
    const {products: cart, count} = useTypedSelector(state => state.cart);
    const { dispatchProductsCart } = useActions();

    const plusClickHandler = (id: number) => () => {
        dispatchProductsCart({...cart, [id]: cart[id] + 1})
    }

    const minusClickHandler = (id: number) => () => {
        if (cart[id] === 1) {
            deleteClickHandler(id)();
        } else {
            dispatchProductsCart({...cart, [id]: cart[id] - 1})
        }
    }

    const deleteClickHandler = (id: number) => () => {
        const newCart: CartEntities = {}
        Object.entries(cart).forEach(entry => {
            const numId = Number(entry[0])
            if (numId !== id) {
                newCart[numId] = cart[numId];
            }
        })
        dispatchProductsCart(newCart)
    }

    return (
        <div className='section'>
            <div className="container">
                {count ?
                    <div className={styles.list}>
                        {products.map(product => cart[product.id] ?
                            <div className={styles.product} key={product.id}>
                                <div className={styles.preview}>
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${product.previewImage}`}
                                         alt={product.name}/>
                                </div>
                                <h4 className={styles.name}>{product.name}</h4>
                                <div className={styles.controls}>
                                    <button className={styles.minus} onClick={minusClickHandler(product.id)}/>
                                    <span className={styles.count}>{cart[product.id]}</span>
                                    <button className={styles.plus} onClick={plusClickHandler(product.id)}/>
                                </div>
                                <p className={styles.price}>{(product.price * cart[product.id]).toLocaleString()} руб.</p>
                                <button className={styles.delete} onClick={deleteClickHandler(product.id)}/>
                            </div>
                            : ''
                        )}
                    </div>
                    :
                    <div className={styles.empty}>
                        <picture>
                            <source srcSet="/img/empty_cart_small.svg" media="(max-width: 480px)" />
                            <source srcSet="/img/empty_cart_medium.svg" media="(max-width: 960px)" />
                            <img src="/img/empty_cart_big.svg" alt="Корзина пустая" />
                        </picture>
                        <h1>Корзина пустая</h1>
                        <p>К сожалению, Ваша корзина пустая =(</p>
                        <p>Но Вы можете перейти <Link href='/catalog'><a>в каталог</a></Link>, чтобы исправить это.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;