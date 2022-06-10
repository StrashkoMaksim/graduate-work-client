import {ReactElement, useCallback, useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MainLayout from "../../components/MainLayout/MainLayout";
import PageHeaderWithBtns from "../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useActions} from "../../hooks/useActions";
import {NextPageWithLayout} from "../_app";
import {Api} from "../../utils/api";
import {ProductForCart} from "../../types/product";
import {useSnackbar} from "notistack";
import {CartEntities} from "../../types/cart";
import Cart from "../../components/Cart/Cart";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const CartPage: NextPageWithLayout = () => {
    const {loading} = useTypedSelector(state => state.loading);
    const {products, count} = useTypedSelector(state => state.cart);
    const {setEnableLoading, setDisableLoading, dispatchProductsCart} = useActions();
    const [productsCart, setProductsCart] = useState<ProductForCart[]>([])
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchCart = async () => {
            const productsIds = Object.keys(products);
            if (productsIds.length && !productsCart.length) {
                setEnableLoading();
                const res = await Api().products.getProductsForCart(productsIds);
                if (res.length !== productsIds.length) {
                    enqueueSnackbar('Некоторые товары более не доступны', {variant: "warning"});
                    const newCart: CartEntities = {}
                    res.forEach(product => {
                        newCart[product.id] = products[product.id];
                    })
                    dispatchProductsCart(newCart);
                }
                setProductsCart(res);
                setDisableLoading();
            }
        }
        fetchCart();
    }, [products])

    const clearCartHandler = useCallback(async () => {
        await dispatchProductsCart({})
    }, [])

    return (
        <>
            {count && !loading ?
                <>
                    <Breadcrumbs links={[{link: '/', text: 'Главная'}]} current='Корзина' />
                    <PageHeaderWithBtns title='Корзина'>
                        <>
                            <CustomButton variant={ButtonType.red} text='Очистить' onClick={clearCartHandler} />
                            <CustomButton variant={ButtonType.blue} text='Заказать' />
                        </>
                    </PageHeaderWithBtns>
                </> : ''
            }
            <Cart products={productsCart}/>
        </>
    );
};

CartPage.getLayout = function getLayout(props, page: ReactElement) {
    return (
        <MainLayout meta={{
            title: 'Корзина',
            description: 'На этой странице находятся товары и услуги, которые вы положили в корзину. Заполните форму и отправьте нам ваш заказ.',
            type: 'website'
        }}>
            {page}
        </MainLayout>
    )
}

export default CartPage;