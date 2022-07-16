import {Service, ServiceEdit} from "../../../types/service";
import React, {FC, useState} from "react";
import CustomTextField from "../../../ui-kit/CustomTextField/CustomTextField";
import {Errors} from "../../../types/errors";
import {InputAdornment} from "@mui/material";
import MaskedTextField from "../../../ui-kit/MaskedTextField/MaskedTextField";
import _ from "lodash";
import CategorySelect from "../../CategorySelect/CategorySelect";
import styles from './ServiceModal.module.scss'
import CustomButton, {ButtonType} from "../../../ui-kit/CustomButton/CustomButton";
import {hasErrors} from "../../../utils/validation/hasErrors";
import {Api} from "../../../utils/api";
import {exceptionsHandler} from "../../../utils/api/exceptions/exceptions";
import {validateChangedService, validateNewService} from "../../../utils/validation/service";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

interface ServiceModalProps {
    selectedService: Service | null;
    hideModal: (reload?: boolean) => void;
}

const ServiceModal: FC<ServiceModalProps> = ({ selectedService, hideModal }) => {
    const [service, setService] = useState<ServiceEdit>({
        id: selectedService?.id,
        name: {
            value: selectedService?.name || '',
            isChanged: false,
        },
        price: {
            value: selectedService?.price ? String(selectedService.price) : '',
            isChanged: false,
        },
        categoryId: {
            value: selectedService?.categoryId || '',
            isChanged: false,
        },
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newService = _.clone(service);
        // @ts-ignore
        newService[event.currentTarget.name] = {
            value: event.currentTarget.value,
            isChanged: true
        };
        setService(newService);
    }

    const changePriceHandler = (value: string) => {
        const newService = _.clone(service);
        if (value) {
            newService.price = {
                value: value,
                isChanged: true
            };
        }
        setService(newService);
    }

    const changeCategoryHandler = async (categoryId: number) => {
        const newService = _.clone(service);
        newService.categoryId = {
            value: categoryId,
            isChanged: true,
        };
        setService(newService);
    }

    const createService = async () => {
        setLoading(true);
        const {errors, dto} = validateNewService(service);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            setLoading(false);
            return;
        }

        try {
            await Api().services.createService(dto);
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
        setLoading(false);
    }

    const updateService = async () => {
        setLoading(true);
        const {errors, dto} = validateChangedService(service);
        if (hasErrors(errors, setErrors, enqueueSnackbar)) {
            setLoading(false);
            return;
        }

        try {
            await Api().services.updateService(service.id as number, dto);
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
        setLoading(false);
    }

    const deleteService = async () => {
        try {
            await Api().services.deleteService(service.id as number);
            hideModal(true);
        } catch (e) {
            exceptionsHandler(e, router, setErrors, enqueueSnackbar);
        }
    }

    return (
        <div className={styles.container}>
            <CustomTextField
                name='name'
                className={styles.input}
                label='Название'
                value={service.name.value}
                onChange={changeTextHandler}
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading}
            />
            <MaskedTextField
                mask={Number}
                radix="."
                label='Цена'
                value={service.price.value === null ? '' : String(service.price.value)}
                onAccept={changePriceHandler}
                disabled={loading}
                // @ts-ignore
                InputProps={{
                    endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                }}
                error={!!errors.price}
                helperText={errors.price}
            />
            <CategorySelect value={service.categoryId.value} changeCategory={changeCategoryHandler} error={errors.categoryId} />
            <div className={styles.btns}>
                {selectedService ?
                    <>
                        <CustomButton variant={ButtonType.blue} text='Сохранить' onClick={updateService} />
                        <CustomButton variant={ButtonType.red} text='Удалить' onClick={deleteService} />
                    </>
                    : <CustomButton variant={ButtonType.blue} text='Добавить услугу' onClick={createService} />
                }
            </div>
        </div>
    );
};

export default ServiceModal;