import React, {FC} from 'react';
import styles from './ProductPreview.module.scss'
import {ProductPreviewModel} from "../../types/product";
import {Link} from "react-router-dom";

interface ProductPreviewProps {
    product: ProductPreviewModel
}

const ProductPreview: FC<ProductPreviewProps> = ({ product }) => {
    return (
        <div className={styles.product}>
            <div className={styles.image}>
                <img src={product.previewImage} alt={product.name} />
            </div>
            <div className={styles.info}>
                <Link to={`/product/${product.slug}`}>{product.name}</Link>
                <div className={styles.bottom}>
                    <div className={styles.characteristics}>
                        {Object.keys(product.characteristics).map(characteristicName =>
                            <div className={styles.characteristic}>
                                <span>{characteristicName}:</span>
                                <span>{product.characteristics[characteristicName]}</span>
                            </div>
                        )}
                    </div>
                    <span className={styles.price}>{product.price.toLocaleString()} руб.</span>
                    <button className={styles.cart}></button>
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;