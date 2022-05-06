import React from 'react';
import {CategoryPreviewModel} from "../../types/category";
import PreviewBlock from "../PreviewBlock/PreviewBlock";
import styles from './CategoriesPreviews.module.scss'
import CategoryPreview from '../CategoryPreview/CategoryPreview';

const categories: CategoryPreviewModel[] = [
    {
        id: 1,
        name: 'Лазерные станки',
        slug: 'lasernie-stanki',
        products: [
            {
                id: 1,
                name: 'Лазерный станок HT-2520',
                slug: 'laserniy-stanok-ht-2520',
                characteristics: {
                    'Рабочее поле': '250x200мм',
                    'Мощность излучателя': '40Вт'
                },
                price: 75000,
                previewImage: 'https://lasercut.ru/assets/images/products/12/preview_webp/0203-1-mini.webp'
            },
            {
                id: 2,
                name: 'Лазерный станок HT-2520 какое-то большое название',
                slug: 'laserniy-stanok-ht-2520',
                characteristics: {
                    'Рабочее поле': '250x200мм',
                    'Мощность излучателя': '40Вт'
                },
                price: 75000,
                previewImage: 'https://lasercut.ru/assets/images/products/12/preview_webp/0203-1-mini.webp'
            },
            {
                id: 3,
                name: 'Лазерный станок HT-2520',
                slug: 'laserniy-stanok-ht-2520',
                characteristics: {
                    'Рабочее поле': '250x200мм',
                    'Мощность излучателя': '40Вт'
                },
                price: 75000,
                previewImage: 'https://lasercut.ru/assets/images/products/12/preview_webp/0203-1-mini.webp'
            },
            {
                id: 4,
                name: 'Лазерный станок HT-2520',
                slug: 'laserniy-stanok-ht-2520',
                characteristics: {
                    'Рабочее поле': '250x200мм',
                    'Мощность излучателя': '40Вт'
                },
                price: 75000,
                previewImage: 'https://lasercut.ru/assets/images/products/12/preview_webp/0203-1-mini.webp'
            }
        ]
    }
]

const CategoriesPreviews = () => {
    return (
        <>
            {categories.map(category =>
                <PreviewBlock title={`Новые ${category.name.slice(0, 1).toLowerCase()}${category.name.slice(1, category.name.length)}`}
                              additionalClass={styles.category}
                              key={category.id}
                              allLink={{
                                  text: `Все ${category.name.slice(0, 1).toLowerCase()}${category.name.slice(1, category.name.length)}`,
                                  link: `/catalog/${category.slug}`
                              }}
                >
                    <CategoryPreview products={category.products} />
                </PreviewBlock>
            )}
        </>
    );
};

export default CategoriesPreviews;