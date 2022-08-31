import styles from './ServicesList.module.scss'
import {Service} from "../../../types/service";
import React, {FC} from "react";
import {Skeleton} from "@mui/material";
import ServiceItem from "../ServiceItem/ServiceItem";

interface ServicesListProps {
    services: Service[];
    isAdmin?: boolean;
    loading: boolean;
}

const ServicesList: FC<ServicesListProps> = ({ services, isAdmin, loading }) => {
    return (
        <div className={styles.list}>
            {!services.length && !loading
                ? <p>Услуг нет в базе</p>
                : services.map(service =>
                    <ServiceItem service={service} isAdmin={isAdmin} key={service.id} />
                )
            }
            {loading
                ?
                <>
                    <Skeleton className={styles.skeleton} animation='wave' />
                    <Skeleton className={styles.skeleton} animation='wave' />
                    <Skeleton className={styles.skeleton} animation='wave' />
                    <Skeleton className={styles.skeleton} animation='wave' />
                    <Skeleton className={styles.skeleton} animation='wave' />
                </>
                : ''
            }
        </div>
    );
};

export default ServicesList;