import React, {FC} from 'react';
import styles from './ProductsList.module.scss'
import {ProductPreviewModel} from "../../types/product";
import ProductPreview from "../ProductPreview/ProductPreview";

interface ProductsListProps {
    products: ProductPreviewModel[];
    isAdmin?: boolean;
}

const ProductsList: FC<ProductsListProps> = ({ products, isAdmin }) => {
    return (
        <div className={styles.wrapper}>
            {products.map(product =>
                <ProductPreview product={product} isAdmin={isAdmin} />
            )}
        </div>
    );
};

export default ProductsList;