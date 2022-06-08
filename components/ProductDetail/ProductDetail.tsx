import styles from './ProductDetail.module.scss';
import {ProductDetailModel} from "../../types/product";
import {FC} from "react";
import cn from "classnames";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import H1 from "../../ui-kit/H1/H1";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ProductMain from "./ProductMain/ProductMain";

interface ProductDetailProps {
    product: ProductDetailModel
}

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
    const {loading} = useTypedSelector(state => state.loading)

    return (
        <>
            <Breadcrumbs
                links={[
                    {link: '/', text: 'Главная'},
                    {link: '/catalog', text: 'Каталог'}
                ]}
                current={product.name} />
            <div className={cn('section', styles.section)}>
                <div className={cn('container', styles.container)}>
                    <div className={styles.sliders}>

                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoTop}>
                            <H1 text={product.name} />
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;