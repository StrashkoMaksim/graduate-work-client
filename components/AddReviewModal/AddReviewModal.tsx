import CustomModal from "../../ui-kit/CustomModal/CustomModal";
import {FC, useState} from "react";
import CustomTextField from "../../ui-kit/CustomTextField/CustomTextField";
import {CreateReviewDTO} from "../../types/review";
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import styles from './AddReviewModal.module.scss'

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
}

const AddReviewModal: FC<ReviewModalProps> = ({ open, onClose }) => {
    const [dto, setDto] = useState<CreateReviewDTO>({
        name: '',
        surname: '',
        text: ''
    });
    const [isSent, setIsSent] = useState(false);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDto((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        })
    }

    const submitHandler = () => {
        setIsSent(true)
    }

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={isSent ? 'Спасибо за ваш отзыв, скоро он появится на сайте!' : 'Оставить отзыв'}
        >
            {!isSent ? <div className={styles.form}>
                <CustomTextField
                    label='Фамилия'
                    name='surname'
                    value={dto.surname}
                    onChange={changeHandler}
                />
                <CustomTextField
                    label='Имя и отчество'
                    name='name'
                    value={dto.name}
                    onChange={changeHandler}
                />
                <CustomTextField
                    label='Текст отзыва'
                    name='text'
                    value={dto.text}
                    onChange={changeHandler}
                    multiline
                />
                <CustomButton variant={ButtonType.blue} text='Отправить' onClick={submitHandler}/>
            </div> : ''
            }
        </CustomModal>
    );
};

export default AddReviewModal;