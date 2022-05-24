import React, {FC} from 'react';
import {ProductPreviewModel} from "../../types/product";
import ProductPreview from '../ProductPreview/ProductPreview';
import styles from './CategoryPreview.module.scss'

interface CategoryPreviewProps {
    products: ProductPreviewModel[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ products }) => {
    return (
        <div className={styles.wrapper}>
            {products.map(product =>
                <ProductPreview key={product.id} product={product} />
            )}
        </div>
    );
};

export default CategoryPreview;