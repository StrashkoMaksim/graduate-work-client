import React, {FC, useEffect, useState} from 'react';
import {CategoryMain} from "../../types/category";
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import styles from './CategoriesPreviews.module.scss'
import CategoryPreview from '../CategoryPreview/CategoryPreview';
import {Api} from "../../utils/api";

interface CategoriesPreviewsProps {
    categoriesFromServer: CategoryMain[] | null;
}

const CategoriesPreviews: FC<CategoriesPreviewsProps> = ({ categoriesFromServer }) => {
    const [categories, setCategories] = useState<CategoryMain[] | null>(categoriesFromServer);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await Api().categories.getMainCategories();
            setCategories(categories);
        }
        if (!categoriesFromServer) {
            fetchCategories()
        }
    }, [])

    return (
        <>
            {categories && categories.map(category => category.products.length ?
                <PreviewBlock title={`Новые ${category.name.slice(0, 1).toLowerCase()}${category.name.slice(1, category.name.length)}`}
                              additionalClass={styles.category}
                              key={category.id}
                              allLink={{
                                  text: `Все ${category.name.slice(0, 1).toLowerCase()}${category.name.slice(1, category.name.length)}`,
                                  link: `/catalog/${category.slug}`
                              }}
                >
                    <CategoryPreview products={category.products === null ? [] : category.products} />
                </PreviewBlock>
                : ''
            )}
        </>
    );
};

export default CategoriesPreviews;