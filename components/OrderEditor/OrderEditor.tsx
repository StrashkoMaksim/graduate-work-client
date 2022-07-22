import styles from './OrderEditor.module.scss';
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import cn from "classnames";
import React, {FC, useEffect, useState} from "react";
import {Errors} from "../../types/errors";
import {OrderEditing, Source, Status} from "../../types/order";
import _ from "lodash";
import {MenuItem} from "@mui/material";
import CustomSelect from "../../ui-kit/CustomSelect/CustomSelect";
import {Api} from "../../utils/api";
import MaskedTextField from "../../ui-kit/MaskedTextField/MaskedTextField";
import OrderCart from "../OrderCart/OrderCart";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface OrderEditorProps {
    order: OrderEditing;
    setOrder: (value: OrderEditing) => void;
    errors: Errors;
}

const OrderEditor: FC<OrderEditorProps> = ({ order, setOrder, errors }) => {
    const [sources, setSources] = useState<Source[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const { loading } = useTypedSelector(state => state.loading)
    const {setEnableLoading, setDisableLoading} = useActions();

    useEffect(() => {
        const fetchInfo = async () => {
            setEnableLoading();
            const sources = await Api().sources.getSources();
            setSources(sources);
            const statuses = await Api().statuses.getStatuses();
            setStatuses(statuses);
            setDisableLoading();
        }
        fetchInfo();
    }, [])

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOrder = _.clone(order);
        if (event.target.name === 'fio') {
            newOrder[event.target.name] = {
                value: event.target.value,
                isChanged: true
            };
        }
        setOrder(newOrder);
    }

    const changePhoneHandler = (value: string) => {
        const newOrder = _.clone(order);
        newOrder.phone = {
            value: value,
            isChanged: true
        };
        setOrder(newOrder);
    }

    const changeSelectHandler = (value: number, name: string) => {
        const newOrder = _.clone(order);
        if (name === 'source' || name === 'status') {
            newOrder[name] = {
                value: value,
                isChanged: true
            };
        }
        setOrder(newOrder);
    }

    return (
        <div className='section'>
            <div className={cn("container", styles.container)}>
                <CustomTextField
                    name='fio'
                    className={styles.input}
                    label='ФИО'
                    value={order.fio.value}
                    onChange={changeTextHandler}
                    error={!!errors.fio}
                    helperText={errors.fio}
                    disabled={loading}
                />
                <MaskedTextField
                    name='phone'
                    mask="+7 (000) 000-00-00"
                    definitions={{
                        '#': /[1-9]/,
                    }}
                    label='Номер телефона'
                    value={order.phone.value}
                    onAccept={changePhoneHandler}
                    // @ts-ignore
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                />
                <CustomSelect
                    label='Источник'
                    name='source'
                    value={order.source.value}
                    // @ts-ignore
                    onChange={changeSelectHandler}
                    error={!!errors.source}
                    helperText={errors.source as string}
                    disabled={loading}
                >
                    {sources?.map(source =>
                        <MenuItem value={source.id} key={source.id}>{source.name}</MenuItem>
                    )}
                </CustomSelect>
                <CustomSelect
                    label='Статус'
                    name='status'
                    value={order.status.value}
                    // @ts-ignore
                    onChange={changeSelectHandler}
                    error={!!errors.status}
                    helperText={errors.status as string}
                    disabled={loading}
                >
                    {statuses?.map(status =>
                        <MenuItem value={status.id} key={status.id}>{status.name}</MenuItem>
                    )}
                </CustomSelect>
                <OrderCart order={order} setOrder={setOrder} error={errors.cart} />
            </div>
        </div>
    );
};

export default OrderEditor;