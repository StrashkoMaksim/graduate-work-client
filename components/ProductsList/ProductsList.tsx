import React, {FC} from 'react';
import styles from './ProductsList.module.scss'
import {ProductPreviewModel} from "../../types/product";
import ProductPreview from "../ProductPreview/ProductPreview";

interface ProductsListProps {
    products: ProductPreviewModel[]
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
    return (
        <div className={styles.wrapper}>
            {products.map(product =>
                <ProductPreview product={product} />
            )}
        </div>
    );
};

export default ProductsList;