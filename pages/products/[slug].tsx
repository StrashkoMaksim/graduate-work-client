import MainLayout from "../../components/MainLayout/MainLayout";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Api} from "../../utils/api";
import {ProductDetailModel} from "../../types/product";
import {NextPageWithLayout} from "../_app";
import {ReactElement} from "react";

interface ProductPageProps {
    product: ProductDetailModel
}

const ProductPage: NextPageWithLayout<ProductPageProps> = ({ product }) => {
    return (
        <div>

        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params}) => {
    try {
        const product = await Api().products.getProductBySlug(params?.slug as string)
        if (!product) {
            throw new Error();
        }
        return {
            props: { product },
            revalidate: 60,
        }
    } catch (e) {
        return { notFound: true }
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await Api().products.getAllSlugs();
    const paths = products.map((product) => ({
        params: { slug: product.slug },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}

ProductPage.getLayout = function getLayout({ product }: InferGetStaticPropsType<typeof getStaticProps>, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: product.name,
            description: product.description,
            type: "website",
        }}>
            {page}
        </MainLayout>
    )
}

export default ProductPage;