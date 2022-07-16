import styles from './ProductDetail.module.scss';
import {ProductDetailModel} from "../../types/product";
import React, {FC, useMemo} from "react";
import cn from "classnames";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import H1 from "../../ui-kit/H1/H1";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ProductMain from "./ProductMain/ProductMain";
import ProductSliders from "./ProductSliders/ProductSliders";
import {useSnackbar} from "notistack";
import {useActions} from "../../hooks/useActions";
import {CartEntities} from "../../types/cart";
import _ from "lodash";

interface ProductDetailProps {
    product: ProductDetailModel
}

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
    const {loading} = useTypedSelector(state => state.loading)
    const {enqueueSnackbar} = useSnackbar();
    const {products} = useTypedSelector(state => state.cart)
    const {dispatchProductsCart} = useActions();
    const { setOpenedQuestionModal } = useActions();

    const addToCartHandler = async () => {
        const newProductsCart: CartEntities = _.clone(products);
        newProductsCart[product.id] ? newProductsCart[product.id]++ : newProductsCart[product.id] = 1;
        await dispatchProductsCart(newProductsCart);
        enqueueSnackbar('Товар добавлен в корзину', {variant: "success"})
    }

    const breadcrumbs = useMemo(() => {
        return [
            {link: '/', text: 'Главная'},
            {link: '/catalog', text: 'Каталог'},
            {link: `/catalog/${product.category.slug}`, text: product.category.name},
        ]
    }, [product])

    return (
        <>
            <Breadcrumbs
                links={breadcrumbs}
                current={product.name}
            />
            <div className={cn('section', styles.section)}>
                <div className={cn('container', styles.container)}>
                    <H1 text={product.name} className={styles.mobileH1} />
                    <ProductSliders images={product.images} videos={product.videos} />
                    <div className={styles.info}>
                        <div className={styles.infoTop}>
                            <H1 text={product.name} className={styles.desktopH1} />
                            <p className={styles.description}>{product.description}</p>
                        </div>
                        <div className={styles.infoBottom}>
                            <a href="#characteristics" className={styles.characteristicsLink}>Характеристики</a>
                            <span className={styles.price}>{product.price.toLocaleString()} руб.</span>
                            <CustomButton
                                variant={ButtonType.blue}
                                text='В корзину'
                                disabled={loading}
                                additionalClass={styles.cart}
                                onClick={addToCartHandler}
                            />
                        </div>
                    </div>
                    <ProductMain product={product} />
                    <div>
                        <div className={styles.help}>
                            <h3>Поможем подобрать оборудование</h3>
                            <p>Получите помощь нашего эксперта «CNC Solutions»</p>
                            <CustomButton
                                variant={ButtonType.blue}
                                text='Оставить заявку'
                                additionalClass={styles.helpBtn}
                                onClick={setOpenedQuestionModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;