import React, {FC} from 'react';
import styles from './ProductPreview.module.scss'
import {ProductPreviewModel} from "../../types/product";
import Link from "next/link";

interface ProductPreviewProps {
    product: ProductPreviewModel
    isAdmin?: boolean
}

const ProductPreview: FC<ProductPreviewProps> = ({ product, isAdmin }) => {
    return (
        <div className={styles.product}>
            <div className={styles.image}>
                <img src={product.previewImage} alt={product.name} />
            </div>
            <div className={styles.info}>
                <Link href={`${isAdmin ? '/admin' : ''}/product/${product.slug}`}><a>{product.name}</a></Link>
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
                        ? <button className={styles.cart}></button>
                        : <button className={styles.update}>Редактировать</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;