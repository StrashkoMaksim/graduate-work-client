import React, {ReactElement} from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "../_app";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageHeader from "../../components/PageHeader/PageHeader";
import BlockWithAside from "../../components/BlockWithAside/BlockWithAside";
import AsideLinks from "../../components/Aside/AsideLinks/AsideLinks";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ListWithBackground from "../../ui-kit/ListWithBackground/ListWithBackground";
import AsideConsultation from "../../components/AsideConsultation/AsideConsultation";
import AsidePopper from "../../components/Aside/AsidePopper/AsidePopper";
import {useRouter} from "next/router";

const links = [
    {
        id: 1,
        name: 'Лазерные станки',
        slug: 'lasernie-stanki',
    }
]

const services = [
    {
        id: 1,
        name: 'Диагностика',
        value: '1500 руб.'
    },
    {
        id: 2,
        name: 'Дополнительная диагностика (расширенная) электро-компонентов',
        value: '1500 руб.'
    },
    {
        id: 3,
        name: 'Чистка и смазка направляющих',
        value: '1500 руб.'
    },
    {
        id: 4,
        name: 'Чистка и смазка ШВП',
        value: '1500 руб.'
    },
    {
        id: 5,
        name: 'Замена шпинделя',
        value: '1500 руб.'
    },
    {
        id: 6,
        name: 'Замена шагового драйвера на идентичный',
        value: '1500 руб.'
    },
    {
        id: 7,
        name: 'Замена концевого датчика без проводки в кабель-канал',
        value: '1500 руб.'
    },
    {
        id: 8,
        name: 'Чистка и смазка направляющих',
        value: '1500 руб.'
    },
    {
        id: 9,
        name: 'Чистка и смазка ШВП',
        value: '1500 руб.'
    },
    {
        id: 10,
        name: 'Замена шпинделя',
        value: '1500 руб.'
    },
    {
        id: 11,
        name: 'Замена шагового драйвера на идентичный',
        value: '1500 руб.'
    },
    {
        id: 12,
        name: 'Замена концевого датчика без проводки в кабель-канал',
        value: '1500 руб.'
    },
    {
        id: 13,
        name: 'Чистка и смазка направляющих',
        value: '1500 руб.'
    },
    {
        id: 14,
        name: 'Чистка и смазка ШВП',
        value: '1500 руб.'
    },
    {
        id: 15,
        name: 'Замена шпинделя',
        value: '1500 руб.'
    },
    {
        id: 16,
        name: 'Замена шагового драйвера на идентичный',
        value: '1500 руб.'
    },
]

const ServicesPage: NextPageWithLayout = () => {
    const {loading} = useTypedSelector(state => state.loading)
    const router = useRouter()
    const {slug} = router.query;

    return (
        <>
            <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Сервис' />
            <PageHeader h1='Сервис' />
            <BlockWithAside
                aside={<>
                    <AsidePopper>
                        <AsideLinks
                            isLoading={loading}
                            links={links}
                            isNewRoute={true}
                            entity='services'
                            selectedLinkId={slug as string}
                        />
                    </AsidePopper>
                    <AsideConsultation />
                </>}
                content={<>
                    <ListWithBackground list={services} />
                </>}
            />
        </>
    );
};

ServicesPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Сервис',
            description: 'Что-то про сервис',
            type: 'website',
        }}>
            {page}
        </MainLayout>
    )
}

export default ServicesPage;