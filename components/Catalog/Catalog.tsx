import BlockWithAside from "../BlockWithAside/BlockWithAside";
import React, {FC, useEffect, useRef, useState} from "react";
import {ProductPreviewModel} from "../../types/product";
import AsideLinks from "../Aside/AsideLinks/AsideLinks";
import {useRouter} from "next/router";
import {CategoryAside} from "../../types/category";
import AsidePopper from "../Aside/AsidePopper/AsidePopper";
import {Api} from "../../utils/api";
import ProductsListContainer from "../ProductsList/ProductsListContainer/ProductsListContainer";

interface CatalogProps {
    isAdmin?: boolean;
    categoriesFromServer: CategoryAside[] | null;
    productsFromServer: ProductPreviewModel[] | null;
}

const Catalog: FC<CatalogProps> = ({ isAdmin, categoriesFromServer, productsFromServer  }) => {
    const [categories, setCategories] = useState<CategoryAside[]>(categoriesFromServer || [])
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {slug} = router.query;

    useEffect(() => {
        setLoading(true)
        const fetchCategories = async () => {
            setCategories(await Api().categories.getCategories());
        }
        if (!categoriesFromServer) {
            fetchCategories()
        }
        setLoading(false)
    }, [])

    return (
        <BlockWithAside
            aside={
                <AsidePopper title={'Категория'}>
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
            content={<ProductsListContainer productsFromServer={productsFromServer} isAdmin={isAdmin} />}
        />
    );
};

export default Catalog;