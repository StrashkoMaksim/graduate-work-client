import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import ProductsList from "../ProductsList";
import {ProductPreviewModel} from "../../../types/product";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useObserver} from "../../../hooks/useObserver";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface ProductsListContainerProps {
    productsFromServer: ProductPreviewModel[] | null;
    isAdmin?: boolean;
}

const LIMIT = 12;

const ProductsListContainer: FC<ProductsListContainerProps> = ({ productsFromServer, isAdmin }) => {
    const [products, setProducts] = useState<ProductPreviewModel[]>(productsFromServer || []);
    const { categories } = useTypedSelector(state => state.catalogCategories);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const {slug} = router.query;
    const lastProductRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const isCanLoadMore = useRef(true);

    useEffect(() => {
        const changeCategory = async () => {
            if (slug && categories && categories.length) {
                const categoryId = categories.find(el => el.slug === slug)?.id;
                if (categoryId) {
                    setSelectedCategory(categoryId);
                    setProducts(await Api().products.getProducts(categoryId, LIMIT, 0, router.query.q as string | undefined));
                } else {
                    router.replace('/404');
                }
            } else if (categories && categories.length) {
                setProducts(await Api().products.getProducts(null, LIMIT, 0, router.query.q as string | undefined));
            }
            setLoading(false);
        }
        if (!productsFromServer) {
            setLoading(true);
            changeCategory();
        }
    }, [slug, categories, router.query.q])

    useObserver(lastProductRef as MutableRefObject<Element>, isCanLoadMore.current && Boolean(categories && categories.length), loading, async () => {
        setLoading(true);
        const newProducts = await Api().products.getProducts(selectedCategory, LIMIT, products.length, router.query.q as string | undefined);
        if (newProducts.length) {
            setProducts([...products, ...newProducts]);
        } else {
            isCanLoadMore.current = false;
        }
        setLoading(false);
    })

    return (
        <React.Fragment>
            <ProductsList products={products} isAdmin={isAdmin} />
            <div ref={lastProductRef} />
        </React.Fragment>
    );
};

export default ProductsListContainer;