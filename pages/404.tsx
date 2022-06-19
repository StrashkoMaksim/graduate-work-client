import React, {ReactElement} from 'react';
import MainLayout from "../components/MainLayout/MainLayout";
import {NextPageWithLayout} from "./_app";
import NotFound from "../components/NotFound/NotFound";

const NotFoundPage: NextPageWithLayout = () => {
    return (
        <NotFound />
    );
};

NotFoundPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Страница не найдена',
            description: 'К сожалению страница была удалена или ее никогда не было. Вы можете перейти на главную или воспользоваться поиском.',
            type: 'website'
        }}>
            {page}
        </MainLayout>
    )
}

export default NotFoundPage;