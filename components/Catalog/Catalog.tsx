import ProductsList from "../ProductsList/ProductsList";
import BlockWithAside from "../BlockWithAside/BlockWithAside";
import React, {FC, useEffect, useState} from "react";
import {ProductPreviewModel} from "../../types/product";
import AsideLinks from "../Aside/AsideLinks/AsideLinks";
import {useRouter} from "next/router";
import {CategoryAside} from "../../types/category";
import AsidePopper from "../Aside/AsidePopper/AsidePopper";
import {Api} from "../../utils/api";

interface CatalogProps {
    isAdmin?: boolean;
    categoriesFromServer: CategoryAside[] | null
}

const Catalog: FC<CatalogProps> = ({ isAdmin, categoriesFromServer }) => {
    const [products, setProducts] = useState<ProductPreviewModel[]>([])
    const [categories, setCategories] = useState<CategoryAside[]>([])
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {slug} = router.query;

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await Api().categories.getCategories());
        }
        if (!categoriesFromServer) {
            fetchCategories()
        }
    }, [])

    useEffect(() => {
        // Получение товаров
        console.log(slug)
    }, [slug])

    return (
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
    );
};

export default Catalog;