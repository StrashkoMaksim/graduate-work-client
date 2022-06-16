import styles from './AsideConsultation.module.scss'
import CustomButton, {ButtonType} from "../../ui-kit/CustomButton/CustomButton";
import {useActions} from "../../hooks/useActions";

const AsideConsultation = () => {
    const {setOpenedQuestionModal} = useActions();

    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Задайте вопрос на интересующую вас тему</p>
            <p className={styles.description}>Получите помощь нашего эксперта «CNC Solutions»</p>
            <CustomButton
                variant={ButtonType.blue}
                text='Задать вопрос'
                additionalClass={styles.btn}
                onClick={setOpenedQuestionModal}
            />
        </div>
    );
};

export default AsideConsultation;