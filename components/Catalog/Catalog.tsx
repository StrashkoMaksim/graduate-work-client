import ProductsList from "../ProductsList/ProductsList";
import BlockWithAside from "../BlockWithAside/BlockWithAside";
import React, {useEffect, useState} from "react";
import {ProductPreviewModel} from "../../types/product";
import AsideLinks from "../Aside/AsideLinks/AsideLinks";
import {useRouter} from "next/router";
import {CategoryAside, CategoryCharacteristicsType} from "../../types/category";
import AsidePopper from "../Aside/AsidePopper/AsidePopper";

const Catalog = () => {
    const [products, setProducts] = useState<ProductPreviewModel[]>([])
    const [categories, setCategories] = useState<CategoryAside[]>([
        {id: 3, name: 'Лазерные станки', slug: 'lasernie-stanki',
            characteristics: {
                zhopa: {
                    type: CategoryCharacteristicsType.String,
                    isMain: false
                }
            }
        }])
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {slug} = router.query;

    useEffect(() => {
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
                    />
                </AsidePopper>
            }
            content={<ProductsList products={products} />}
        />
    );
};

export default Catalog;