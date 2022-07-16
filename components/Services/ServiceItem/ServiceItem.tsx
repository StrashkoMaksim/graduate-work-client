import cn from "classnames";
import styles from "./ServiceItem.module.scss";
import React, {FC, useCallback} from "react";
import {Service} from "../../../types/service";
import {useActions} from "../../../hooks/useActions";

interface ServiceItemProps {
    service: Service;
    isAdmin?: boolean;
}

const ServiceItem: FC<ServiceItemProps> = ({ service, isAdmin }) => {
    const { changeSelectedService } = useActions();

    const onClick = useCallback(() => {
        changeSelectedService(service)
    }, [service])

    return (
        <div className={cn(styles.container, {[styles.admin]: isAdmin})}>
            <span>{service.name}</span>
            <span>{service.price} руб.</span>
            {isAdmin ? <button className={styles.edit} onClick={onClick} /> : ''}
        </div>
    );
};

export default ServiceItem;