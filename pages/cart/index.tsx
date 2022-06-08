import {useEffect} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MainLayout from "../../components/MainLayout/MainLayout";
import PageHeaderWithBtns from "../../components/PageHeader/PageHeaderWithBtns/PageHeaderWithBtns";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useActions} from "../../hooks/useActions";


const CartPage = () => {
    const {loading} = useTypedSelector(state => state.loading);
    const {products, services, count} = useTypedSelector(state => state.cart);
    const {setEnableLoading, setDisableLoading} = useActions();

    useEffect(() => {
        const fetchCart = async () => {
            setEnableLoading();

            setDisableLoading();
        }
        fetchCart();
    }, [])

    return (
        <MainLayout meta={{
            title: 'Корзина',
            description: 'На этой странице находятся товары и услуги, которые вы положили в корзину. Заполните форму и отправьте нам ваш заказ.',
            type: 'website'
        }}>
            <PageHeaderWithBtns title='Корзина'>
                {count ? <>
                    <CustomButton variant={ButtonType.red} text='Очистить' />
                    <CustomButton variant={ButtonType.blue} text='Заказать' />
                </> : ''}
            </PageHeaderWithBtns>
        </MainLayout>
    );
};

export default CartPage;