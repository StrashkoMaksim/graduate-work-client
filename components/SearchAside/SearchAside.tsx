import React from 'react';
import AsideLinks from "../Aside/AsideLinks/AsideLinks";
import AsideSearch from "../Aside/AsideSearch/AsideSearch";
import AsidePopper from "../Aside/AsidePopper/AsidePopper";
import {useRouter} from "next/router";

const links: {id: number, name: string, slug: string}[] = [
    { id: 1, name: 'Статьи', slug: 'articles'},
    { id: 2, name: 'Каталог', slug: 'catalog'},
]

const SearchAside = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            <AsideSearch />
            <AsidePopper title={'Категория'}>
                <AsideLinks
                    isLoading={false}
                    links={links}
                    entity={'search'}
                    withoutAll={true}
                    selectedLinkId={router.query.category as string}
                    slugName={'category'}
                />
            </AsidePopper>
        </React.Fragment>
    );
};

export default SearchAside;