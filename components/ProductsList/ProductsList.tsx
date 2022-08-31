import React, {FC} from 'react';
import styles from './ProductsList.module.scss'
import {ProductPreviewModel} from "../../types/product";
import ProductPreview from "../ProductPreview/ProductPreview";
import cn from "classnames";

interface ProductsListProps {
    products: ProductPreviewModel[];
    isAdmin?: boolean;
}

const ProductsList: FC<ProductsListProps> = ({ products, isAdmin }) => {
    return (
        <div className={cn(styles.wrapper, {[styles.empty]: !products.length})}>
            {products.map(product =>
                <ProductPreview product={product} isAdmin={isAdmin} key={product.id} />
            )}
            {!products.length && <p>Товаров с указанными параметрами не найдено</p>}
        </div>
    );
};

export default ProductsList;