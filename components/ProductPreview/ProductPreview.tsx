import React, {FC} from 'react';
import styles from './ProductPreview.module.scss'
import {ProductPreviewModel} from "../../types/product";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import _ from "lodash";
import {CartEntities} from "../../types/cart";

interface ProductPreviewProps {
    product: ProductPreviewModel
    isAdmin?: boolean
}

const ProductPreview: FC<ProductPreviewProps> = ({ product, isAdmin }) => {
    const {enqueueSnackbar} = useSnackbar();
    const {products} = useTypedSelector(state => state.cart)
    const {dispatchProductsCart} = useActions();

    const addToCartHandler = async () => {
        const newProductsCart: CartEntities = _.clone(products);
        newProductsCart[product.id] ? newProductsCart[product.id]++ : newProductsCart[product.id] = 1;
        await dispatchProductsCart(newProductsCart);
        enqueueSnackbar('Товар добавлен в корзину', {variant: "success"})
    }

    return (
        <div className={styles.product}>
            <div className={styles.image}>
                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${product.previewImage}`} alt={product.name} />
            </div>
            <div className={styles.info}>
                <Link href={`/products/${product.slug}`}><a>{product.name}</a></Link>
                <div className={styles.bottom}>
                    <div className={styles.characteristics}>
                        {Object.keys(product.characteristics).map(characteristicName =>
                            <div className={styles.characteristic} key={characteristicName}>
                                <span>{characteristicName}:</span>
                                <span>{product.characteristics[characteristicName]}</span>
                            </div>
                        )}
                    </div>
                    <span className={styles.price}>{product.price.toLocaleString()} руб.</span>
                    {isAdmin
                        ? <Link href={`/admin/products/${product.slug}`}><a className={styles.update}/></Link>
                        : <button className={styles.cart} onClick={addToCartHandler} />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;