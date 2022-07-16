import AsidePopper from "../../Aside/AsidePopper/AsidePopper";
import AsideLinks from "../../Aside/AsideLinks/AsideLinks";
import AsideConsultation from "../../AsideConsultation/AsideConsultation";
import BlockWithAside from "../../BlockWithAside/BlockWithAside";
import React, {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useRouter} from "next/router";
import {CategoryAside} from "../../../types/category";
import {Service} from "../../../types/service";
import {Api} from "../../../utils/api";
import {useActions} from "../../../hooks/useActions";
import {useObserver} from "../../../hooks/useObserver";
import ServicesList from "../ServicesList/ServicesList";

const LIMIT = 10;

interface ServicesWithAsideProps {
    categoriesFromServer: CategoryAside[] | null;
    servicesFromServer: Service[] | null;
    isAdmin?: boolean;
    update?: boolean;
}

const ServicesWithAside: FC<ServicesWithAsideProps> = ({ servicesFromServer, categoriesFromServer, isAdmin, update }) => {
    const [categories, setCategories] = useState<CategoryAside[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const {loading} = useTypedSelector(state => state.loading)
    const router = useRouter()
    const {slug} = router.query;
    const {setEnableLoading, setDisableLoading} = useActions();
    const lastServiceRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const isCanLoadMore = useRef(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setEnableLoading();
            const categories = await Api().categories.getCategories();
            setCategories(categories);
            setDisableLoading();
        }
        if (categoriesFromServer) {
            setCategories(categoriesFromServer);
        } else {
            fetchCategories();
        }
    }, [])

    useEffect(() => {
        const changeCategory = async () => {
            setEnableLoading();
            if (slug && categories.length) {
                const categoryId = categories.find(el => el.slug === slug)?.id;
                if (categoryId) {
                    setSelectedCategory(categoryId);
                    setServices(await Api().services.getServices(categoryId, LIMIT, 0));
                } else {
                    router.push('/404');
                }
            } else if (categories.length) {
                setServices(await Api().services.getServices(null, LIMIT, 0));
            }
            setDisableLoading();
        }
        if (!servicesFromServer) {
            changeCategory();
        } else {
            setServices(servicesFromServer);
        }
    }, [slug, categories, update])

    useObserver(lastServiceRef as MutableRefObject<Element>, isCanLoadMore.current && Boolean(categories.length), loading, async () => {
        setEnableLoading();
        const newServices = await Api().services.getServices(selectedCategory, LIMIT, services.length);
        if (newServices.length) {
            setServices([...services, ...newServices]);
        } else {
            isCanLoadMore.current = false;
        }
        setDisableLoading();
    })

    return (
        <BlockWithAside
            aside={<>
                <AsidePopper>
                    <AsideLinks
                        isLoading={loading}
                        links={categories}
                        isNewRoute={true}
                        entity='services'
                        selectedLinkId={slug as string}
                        isAdmin={isAdmin}
                    />
                </AsidePopper>
                <AsideConsultation />
            </>}
            content={<>
                <ServicesList services={services} isAdmin={isAdmin} loading={loading} />
                <div ref={lastServiceRef} />
            </>}
        />
    );
};

export default ServicesWithAside;