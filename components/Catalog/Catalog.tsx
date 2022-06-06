import ProductsList from "../ProductsList/ProductsList";
import BlockWithAside from "../BlockWithAside/BlockWithAside";
import React, {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {ProductPreviewModel} from "../../types/product";
import AsideLinks from "../Aside/AsideLinks/AsideLinks";
import {useRouter} from "next/router";
import {CategoryAside} from "../../types/category";
import AsidePopper from "../Aside/AsidePopper/AsidePopper";
import {Api} from "../../utils/api";
import {useObserver} from "../../hooks/useObserver";

interface CatalogProps {
    isAdmin?: boolean;
    categoriesFromServer: CategoryAside[] | null;
    productsFromServer: ProductPreviewModel[] | null;
}

const LIMIT = 12

const Catalog: FC<CatalogProps> = ({ isAdmin, categoriesFromServer, productsFromServer  }) => {
    const [products, setProducts] = useState<ProductPreviewModel[]>([])
    const [categories, setCategories] = useState<CategoryAside[]>([])
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {slug} = router.query;
    const lastProductRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const isCanLoadMore = useRef(true);

    useEffect(() => {
        setLoading(true)
        const fetchCategories = async () => {
            setCategories(await Api().categories.getCategories());
        }
        if (!categoriesFromServer) {
            fetchCategories()
        } else {
            setCategories(categoriesFromServer)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        const changeCategory = async () => {
            setLoading(true);
            if (slug && categories.length) {
                const categoryId = categories.find(el => el.slug === slug)?.id;
                if (categoryId) {
                    setSelectedCategory(categoryId);
                    setProducts(await Api().products.getProducts(categoryId, LIMIT, 0));
                } else {
                    router.push('/404');
                }
            } else if (categories.length) {
                console.log(1)
                setProducts(await Api().products.getProducts(null, LIMIT, 0));
            }
            setLoading(false);
        }
        if (!productsFromServer) {
            changeCategory();
        } else {
            setProducts(productsFromServer);
        }
    }, [slug, categories])

    useObserver(lastProductRef as MutableRefObject<Element>, isCanLoadMore.current, loading, async () => {
        setLoading(true);
        const newProducts = await Api().products.getProducts(selectedCategory, LIMIT, products.length);
        if (newProducts.length) {
            setProducts([...products, ...newProducts]);
        } else {
            isCanLoadMore.current = false;
        }
        setLoading(false);
    })

    return (
        <>
            <BlockWithAside
                aside={
                    <AsidePopper>
                        <AsideLinks
                            isLoading={loading}
                            links={categories}
                            entity='catalog'
                            isNewRoute={true}
                            selectedLinkId={slug as string | undefined}
                            isAdmin={isAdmin}
                        />
                    </AsidePopper>
                }
                content={<ProductsList products={products} isAdmin={isAdmin} />}
            />
            <div ref={lastProductRef} />
        </>
    );
};

export default Catalog;