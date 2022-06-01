import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import styles from './CategoriesManager.module.scss'
import {CategoryAside} from "../../types/category";
import {Api} from "../../utils/api";
import Link from "next/link";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";

const CategoriesManager = () => {
    const [categories, setCategories] = useState<CategoryAside[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await Api().categories.getCategories()
            setCategories(res);
        }
        fetchCategories()
    }, [])

    return (
        <>
            {isLoading
                ? <CircularProgress className={styles.loading} />
                :
                <>
                    <div className={styles.table}>
                        {categories && categories.map(category =>
                            <div className={styles.category} key={category.id}>
                                <span className={styles.name}>{category.name}</span>
                                <Link href={`/admin/categories/${category.slug}`}>
                                    <a className={styles.update} />
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link href='/admin/categories/create'>
                        <a className={styles.addLink}>
                            <CustomButton variant={ButtonType.blue} text='Добавить категорию' />
                        </a>
                    </Link>
                </>
            }
        </>
    );
};

export default CategoriesManager;