import MainLayout from "../../components/MainLayout/MainLayout";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {ProductDetailModel} from "../../types/product";

interface ProductPageProps {
    product: ProductDetailModel
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
    return (
        <MainLayout meta={{
            title: product.name,
            description: product.description,
            type: "website",
        }}>

        </MainLayout>
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

export default ProductPage;