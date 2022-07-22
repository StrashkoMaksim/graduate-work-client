import styles from './OrderCart.module.scss';
import H2 from "../../ui-kit/H2/H2";
import {OrderEditing} from "../../types/order";
import React, {FC} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import {InputAdornment} from "@mui/material";
import _ from "lodash";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import ErrorParagraph from "../../ui-kit/ErrorParagraph/ErrorParagraph";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface OrderCartProps {
    order: OrderEditing;
    setOrder: (value: OrderEditing) => void;
    error: string | string[];
}

const OrderCart: FC<OrderCartProps> = ({ order, setOrder, error }) => {
    const { loading } = useTypedSelector(state => state.loading)

    const addItem = () => {
        const newOrder = _.clone(order);
        newOrder.cart.value.push({
            name: '',
            count: null,
            price: null,
        });
        setOrder(newOrder);
    }

    const deleteItem = (index: number) => () => {
        const newOrder = _.clone(order);
        newOrder.cart.value.splice(index, 1);
        newOrder.cart.isChanged = true;
        setOrder(newOrder);
    }

    const nameChangeHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOrder = _.clone(order);
        newOrder.cart.value[index].name = event.target.value;
        newOrder.cart.isChanged = true;
        setOrder(newOrder);
    }

    const numberChangeHandler = (index: number, name: string) => (value: string) => {
        const newOrder = _.clone(order);
        if (name === 'count') {
            newOrder.cart.value[index][name] = Number.parseInt(value);
        } else if (name === 'price') {
            newOrder.cart.value[index][name] = value;
        }
        newOrder.cart.isChanged = true;
        setOrder(newOrder);
    }

    return (
        <div className={styles.container}>
            <H2 text='Корзина' />
            <div className={styles.items}>
                {order.cart.value.map((item, index) =>
                    <div className={styles.item} key={index}>
                        <CustomTextField
                            label='Название товара'
                            name='name'
                            value={item.name}
                            onChange={nameChangeHandler(index)}
                            disabled={loading}
                        />
                        <MaskedTextField
                            mask={Number}
                            scale={0}
                            label='Количество'
                            name='count'
                            value={item.count === null ? '' : String(item.count)}
                            onAccept={numberChangeHandler(index, 'count')}
                            disabled={loading}
                        />
                        <MaskedTextField
                            mask={Number}
                            radix="."
                            label='Цена'
                            name='price'
                            value={item.price === null ? '' : String(item.price)}
                            // @ts-ignore
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                            }}
                            onAccept={numberChangeHandler(index, 'price')}
                            disabled={loading}
                        />
                        <button
                            className={styles.deleteBtn}
                            onClick={deleteItem(index)}
                            disabled={loading}
                        />
                    </div>
                )}
            </div>
            {error
                ? <ErrorParagraph className={styles.error}>{error as string}</ErrorParagraph>
                : ''
            }
            <CustomButton
                variant={ButtonType.blue}
                text='Добавить товар'
                onClick={addItem}
                additionalClass={styles.addBtn}
                disabled={loading}
            />
        </div>
    );
};

export default OrderCart;